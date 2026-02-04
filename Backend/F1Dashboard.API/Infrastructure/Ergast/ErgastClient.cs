namespace F1Dashboard.Api.Infrastructure.Ergast
{
    public class ErgastClient
    {
        private readonly HttpClient _http;

        public ErgastClient(HttpClient http)
        {
            _http = http;
        }

      public async Task<string> GetDriverStandingsRawAsync(int year = 2024)
{
    var response = await _http.GetAsync(
        $"https://api.jolpi.ca/ergast/api/f1/{year}/driverStandings.json"
    );

    var contentType = response.Content.Headers.ContentType?.ToString();
    var body = await response.Content.ReadAsStringAsync();

    Console.WriteLine("CONTENT-TYPE: " + contentType);
    Console.WriteLine("BODY PREVIEW: " + body.Substring(0, Math.Min(200, body.Length)));

    response.EnsureSuccessStatusCode();

    return body;
}

    }
}
