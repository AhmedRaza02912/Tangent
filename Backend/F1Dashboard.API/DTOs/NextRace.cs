namespace F1Dashboard.Api.DTOs;

public class NextRaceDto
{
    public string RaceName {get; set;} = string.Empty;
    public string Circuit {get; set;} = string.Empty;
    public string Country {get; set;} = string.Empty;
    public string Date {get; set;} = string.Empty;
    public string Time{get; set;} = string.Empty;
    public int Round {get;set;}


}