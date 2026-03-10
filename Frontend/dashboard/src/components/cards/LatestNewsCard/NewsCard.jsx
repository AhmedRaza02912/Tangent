import { useEffect, useState } from "react";
import { getF1News } from "./newsService";

export default function F1NewsSection() {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getF1News()
      .then(setArticles)
      .catch(() => setError("Failed to load news"))
      .finally(() => setLoading(false));
  }, []);

  const renderStatusCard = (message) => (
    <div className="news-section-card">
      <h3 className="news-section-title">Latest News</h3>
      <div className="news-scroll-wrapper">
        <p className="news-status">{message}</p>
      </div>
    </div>
  );

  if (loading) return renderStatusCard("Loading news...");
  if (error) return renderStatusCard("News unavailable right now.");

  return (
    <div className="news-section-card">
      <h3 className="news-section-title">Latest News</h3>
      <div className="news-scroll-wrapper">
        {articles.map((article, i) => (
          <div className="news-card" key={i}>

            <img
              src={article.urlToImage}
              className="news-image"
              alt={article.title}
              onError={(e) => e.target.style.display = "none"}
            />

            <div className="news-main">
              <h3 className="news-title">{article.title}</h3>
              <p className="news-description">{article.description}</p>
            </div>

            <div className="news-meta">
              <a
                href={article.url}
                className="news-read-more"
                target="_blank"
                rel="noreferrer"
              >
                Read more
              </a>
              <span className="news-date">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}