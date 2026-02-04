namespace F1Dashboard.API.DTOs
{
    public class DriverStandingDto
    {
        public int Position { get; set; }
        public required string Name { get; set; }

        public int Wins { get; set; }

        public int Poles { get; set; }

        public int Dnfs { get; set; }

        public int Points { get; set; }

        public string ImageKey { get; set; } = string.Empty;
    }
}
