const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

export const getF1News = async()=>{
    const res = await fetch(`${API_BASE_URL}/api/news/f1`);
    const data = await res.json();
    return data.articles ?? [{ title: "No news available", description: "Check back later for the latest F1 news." }];
};