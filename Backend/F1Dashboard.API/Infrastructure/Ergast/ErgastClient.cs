namespace F1Dashboard.Api.Infrastructure.Ergast
{
    public class ErgastClient
    {
        private readonly HttpClient _http;

        public ErgastClient(HttpClient http)
        {
            _http = http;
        }

        public async Task<string> GetDriverStandingsRawAsync(int year = 2023)
        {
            return await _http.GetStringAsync(
                $"https://api.jolpi.ca/ergast/api/f1/{year}/driverStandings.json?limit=1000"
            );
        }
        public async Task<string> GetQualifyingResultsRawAsync(int year = 2023)
        {
            return await _http.GetStringAsync(
                $"https://api.jolpi.ca/ergast/f1/{year}/qualifying/1.json"
            );
        }

        public async Task<string> GetRaceResultsRawAsync(int year = 2023)
        {
            return await _http.GetStringAsync(
                $"https://api.jolpi.ca/ergast/api/f1/{year}/results.json?limit=1000"
            );
        }

        public async Task<string> GetConstructorStandingRawAsync(int year = 2024)
        {
            var response =  await _http.GetAsync(
                $"https://api.jolpi.ca/ergast/f1/{year}/constructorstandings.json?"
            );

            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> GetNextRaceRawAsync(int year = 2026)
        {
            var response = await _http.GetAsync($"https://api.jolpi.ca/ergast/f1/{year}/next.json?");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
        
        
    }
}
