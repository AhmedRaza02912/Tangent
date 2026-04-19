using Microsoft.Extensions.Caching.Memory;

public class NewsService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IMemoryCache _cache;
    private readonly IConfiguration _config;
    private const string CacheKey = "f1_news";

    public NewsService(IHttpClientFactory httpClientFactory, IMemoryCache cache, IConfiguration config)
    {
        _httpClientFactory = httpClientFactory;
        _cache = cache;
        _config = config;
    }

    public async Task<string> GetF1NewsAsync()
    {
        if(_cache.TryGetValue(CacheKey, out string cachedNews ))
        {
            return cachedNews;
        }
        var client = _httpClientFactory.CreateClient("NewsApi");
        var apiKey = _config["NewsApi:ApiKey"];

        var url = "everything?q=(Formula+1+OR+F1+OR+%22Grand+Prix%22+OR+%22Formula+One%22)"+
        "AND+(race+OR+driver+OR+championship+OR+qualifying+OR+regulation+OR+team)" +
        "&language=en&sortBy=publishedAt&pageSize=12"+ 
        "&domains=skysports.com,espn.com,formula1.com,autosport.com,motorsport.com,bbc.com,theguardian.com,racer.com" +
        $"&apiKey={apiKey}";

        var response = await client.GetAsync(url);
        var content = await response.Content.ReadAsStringAsync();

        var cacheOptions = new MemoryCacheEntryOptions().
        SetAbsoluteExpiration(TimeSpan.FromMinutes(30));

        _cache.Set(CacheKey, content, cacheOptions);
        return content;
    }


}
