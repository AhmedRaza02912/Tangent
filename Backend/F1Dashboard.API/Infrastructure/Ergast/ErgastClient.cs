namespace F1Dashboard.Api.Infrastructure.Ergast
{
    public class ErgastClient
    {
        private readonly HttpClient _http;
        private const int year = 2026;
        public ErgastClient(HttpClient http)
        {
            _http = http;
        }

        public async Task<string> GetDriverStandingsRawAsync()
        {
            return await _http.GetStringAsync(
                $"https://api.jolpi.ca/ergast/api/f1/{year}/driverStandings.json?limit=1000"
            );
        }
        public async Task<string> GetQualifyingResultsRawAsync()
        {
            return await _http.GetStringAsync(
                $"https://api.jolpi.ca/ergast/f1/{year}/qualifying/1.json"
            );
        }

        public async Task<string> GetRaceResultsRawAsync()
        {
            return await _http.GetStringAsync(
                $"https://api.jolpi.ca/ergast/api/f1/{year}/results.json?limit=1000"
            );
        }

        public async Task<string> GetConstructorStandingRawAsync()
        {
            var response =  await _http.GetAsync(
                $"https://api.jolpi.ca/ergast//api/f1/{year}/constructorstandings.json?"
            );

            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> GetNextRaceRawAsync()
        {
            var response = await _http.GetAsync($"https://api.jolpi.ca/ergast/f1/{year}/next.json?");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> GetLastRaceResultsRawAsync()
        {
            var response = await _http.GetAsync($"https://api.jolpi.ca/ergast/f1/{year}/last/results");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
        
        
    }
}
