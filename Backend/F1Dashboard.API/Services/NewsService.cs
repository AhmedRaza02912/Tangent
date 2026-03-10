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

        var url = $"everything?q=F1+racing+OR+Formula+1+driver+OR+F1+regulation&language=en&sortBy=publishedAt&pageSize=20&apiKey=6e2e751fe1a649e69dec0c7becee7cc6";

        var response = await client.GetAsync(url);
        var content = await response.Content.ReadAsStringAsync();

        var cacheOptions = new MemoryCacheEntryOptions().
        SetAbsoluteExpiration(TimeSpan.FromMinutes(30));

        _cache.Set(CacheKey, content, cacheOptions);
        return content;
    }


}