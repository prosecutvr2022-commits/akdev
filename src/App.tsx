import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F5] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow">
        <LandingPage />
      </main>
    </div>
  );
}


