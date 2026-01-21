import Top from "../components/TopBar/top";

export default function AppLayout({children}){
return(
    <>
    <Top />
    <main style={{padding: "20px"}}>
        {children}
    </main>
    </>
);
}
