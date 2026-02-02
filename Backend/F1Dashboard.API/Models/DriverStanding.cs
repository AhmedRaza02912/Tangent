namespace F1Dashboard.API.Models
{
    public class DriverStanding
    {
        public int Position { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Wins { get; set; } 
        public int Poles { get; set; }
        public int Dnfs { get; set; }
        public int Points { get; set; }
        public string Image { get; set; } = string.Empty;
    }
}
