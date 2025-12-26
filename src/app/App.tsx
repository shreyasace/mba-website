import { useState } from "react";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { SpeakersPage } from "./pages/SpeakersPage";
import { CommitteesPage } from "./pages/CommitteesPage";
import { ContactPage } from "./pages/ContactPage";
import { VenuePage } from "./pages/VenuePage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "registration":
        return <RegistrationPage onNavigate={handleNavigate} />;
      case "speakers":
        return <SpeakersPage onNavigate={handleNavigate} />;
      case "committees":
        return <CommitteesPage onNavigate={handleNavigate} />;
      case "contact":
        return <ContactPage onNavigate={handleNavigate} />;
      case "venue":
        return <VenuePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
}
