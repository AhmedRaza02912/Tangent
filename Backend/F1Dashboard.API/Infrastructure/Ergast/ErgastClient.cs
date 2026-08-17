using System.Net;
using System.Text.Json;
using F1Dashboard.Api.Infrastructure.Ergast.Models;
using Microsoft.Extensions.Caching.Memory;

namespace F1Dashboard.Api.Infrastructure.Ergast
{
    public class ErgastClient
    {
        private readonly HttpClient _http;
        private readonly IMemoryCache _cache;
        private const int year = 2026;

        // Cache keys — plain string literals (interpolated strings are not compile-time constants)
        private const string RacesCacheKey        = "AllRaces_2026";
        private const string StandingsCacheKey     = "DriverStandings_2026";
        private const string ConstructorsCacheKey  = "ConstructorStandings_2026";
        private const string QualifyingCacheKey    = "Qualifying_2026";
        private const string NextRaceCacheKey      = "NextRace_2026";
        private const string LastResultsCacheKey   = "LastResults_2026";
        private const string SprintCacheKey        = "Sprint_2026";
        private const string ScheduleCacheKey      = "Schedule_2026";

        // Short TTL for live data, longer for historical data
        private static readonly TimeSpan ShortTtl = TimeSpan.FromMinutes(5);
        private static readonly TimeSpan LongTtl  = TimeSpan.FromMinutes(15);

        public ErgastClient(HttpClient http, IMemoryCache cache)
        {
            _http  = http;
            _cache = cache;
        }

        // ── Simple cached string fetches ─────────────────────────────────────

        public Task<string> GetDriverStandingsRawAsync() =>
            CachedFetchAsync(StandingsCacheKey, ShortTtl,
                $"https://api.jolpi.ca/ergast/api/f1/{year}/driverStandings.json?limit=1000");

        public Task<string> GetQualifyingResultsRawAsync() =>
            CachedFetchAsync(QualifyingCacheKey, LongTtl,
                $"https://api.jolpi.ca/ergast/f1/{year}/qualifying.json?limit=1000");

        public Task<string> GetRaceResultsRawAsync() =>
            CachedFetchAsync($"RaceResultsRaw_{year}", LongTtl,
                $"https://api.jolpi.ca/ergast/api/f1/{year}/results.json?limit=1000");

        public Task<string> GetConstructorStandingRawAsync() =>
            CachedFetchAsync(ConstructorsCacheKey, ShortTtl,
                $"https://api.jolpi.ca/ergast/api/f1/{year}/constructorstandings.json");

        public Task<string> GetNextRaceRawAsync() =>
            CachedFetchAsync(NextRaceCacheKey, ShortTtl,
                $"https://api.jolpi.ca/ergast/f1/{year}/next.json");

        public Task<string> GetLastRaceResultsRawAsync() =>
            CachedFetchAsync(LastResultsCacheKey, ShortTtl,
                $"https://api.jolpi.ca/ergast/f1/{year}/last/results");

        public Task<string> GetSprintResultsRawAsync() =>
            CachedFetchAsync(SprintCacheKey, LongTtl,
                $"https://api.jolpi.ca/ergast/f1/{year}/sprint/?limit=100");

        public Task<string> GetSeasonScheduleAsync() =>
            CachedFetchAsync(ScheduleCacheKey, LongTtl,
                $"https://api.jolpi.ca/ergast/f1/{year}.json");

        // ── Cached wrapper ────────────────────────────────────────────────────

        /// <summary>
        /// Fetches a URL once, caches the raw JSON string for <paramref name="ttl"/>,
        /// and returns the cached value on subsequent calls.
        /// Returns an empty JSON object string on failure so callers don't need null checks.
        /// </summary>
        private async Task<string> CachedFetchAsync(string cacheKey, TimeSpan ttl, string url)
        {
            if (_cache.TryGetValue(cacheKey, out string? cached) && cached != null)
                return cached;

            var json = await FetchWithRetryAsync(url);
            if (json == null) return "{}";

            _cache.Set(cacheKey, json, new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = ttl
            });
            return json;
        }

        // ── Paginated race results (special case — multi-request) ─────────────

        /// <summary>
        /// Fetches ALL race results for the season by paginating 30 rows at a time.
        /// Cached for 15 minutes. A 500ms delay between pages prevents quota bursts
        /// that would starve other endpoints.
        /// </summary>
        public async Task<List<ErgastRace>> GetAllRacesPaginatedAsync()
        {
            if (_cache.TryGetValue(RacesCacheKey, out List<ErgastRace>? cached) && cached != null)
                return cached;

            const int pageSize = 30;
            const int maxPages = 30;
            var allRaces = new Dictionary<string, ErgastRace>();
            int offset   = 0;
            int total    = int.MaxValue;
            int pages    = 0;

            try
            {
                while (offset < total && pages < maxPages)
                {
                    // Small delay after the first page — keeps Jolpica rate-limiter happy
                    // and preserves quota for other endpoints called on the same request.
                    if (pages > 0)
                        await Task.Delay(400);

                    var url  = $"https://api.jolpi.ca/ergast/f1/{year}/results/?limit={pageSize}&offset={offset}";
                    var json = await FetchWithRetryAsync(url);
                    if (json == null) break;

                    var root   = JsonSerializer.Deserialize<ErgastRoot>(json);
                    var mrData = root?.MRData;
                    if (mrData == null) break;

                    if (int.TryParse(mrData.Total, out var t)) total = t;

                    var races = mrData.RaceTable?.Races;
                    if (races == null || races.Count == 0) break;

                    int rowsThisPage = races.Sum(r => r.Results?.Count ?? 0);
                    if (rowsThisPage == 0) break;

                    foreach (var race in races)
                    {
                        if (!allRaces.TryGetValue(race.Round, out var existing))
                            allRaces[race.Round] = race;
                        else if (race.Results != null)
                            (existing.Results ??= []).AddRange(race.Results);
                    }

                    offset += rowsThisPage;
                    pages++;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ErgastClient] Pagination error: {ex.Message}");
            }

            var result = allRaces.Values.OrderBy(r => int.Parse(r.Round)).ToList();

            if (result.Count > 0)
                _cache.Set(RacesCacheKey, result, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = LongTtl
                });

            return result;
        }

        // ── HTTP helper ───────────────────────────────────────────────────────

        /// <summary>
        /// GETs a URL, retrying up to 3 times with back-off on HTTP 429.
        /// Returns null if all retries are exhausted or a non-retryable error occurs.
        /// </summary>
        private async Task<string?> FetchWithRetryAsync(string url, int maxRetries = 3)
        {
            for (int attempt = 0; attempt <= maxRetries; attempt++)
            {
                try
                {
                    var response = await _http.GetAsync(url);

                    if (response.IsSuccessStatusCode)
                        return await response.Content.ReadAsStringAsync();

                    if (response.StatusCode == HttpStatusCode.TooManyRequests)
                    {
                        if (attempt == maxRetries) break;

                        int waitSec = 3;
                        if (response.Headers.RetryAfter?.Delta is { } delta)
                            waitSec = Math.Max((int)Math.Ceiling(delta.TotalSeconds) + 1, waitSec);

                        Console.WriteLine($"[ErgastClient] 429 on {url} — waiting {waitSec}s (attempt {attempt + 1}/{maxRetries})");
                        await Task.Delay(TimeSpan.FromSeconds(waitSec));
                        continue;
                    }

                    Console.WriteLine($"[ErgastClient] HTTP {(int)response.StatusCode} for {url}");
                    break;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[ErgastClient] Request error: {ex.Message}");
                    if (attempt < maxRetries) await Task.Delay(1000);
                }
            }
            return null;
        }
    }
}
