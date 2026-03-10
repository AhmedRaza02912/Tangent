export const getF1News = async()=>{
    const res = await fetch("/api/news/f1");
    const data = await res.json();
    return data.articles ?? [{ title: "No news available", description: "Check back later for the latest F1 news." }];
};