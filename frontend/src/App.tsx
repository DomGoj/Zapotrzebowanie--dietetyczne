import { useState } from "react";
import logo from "./assets/LogoNutrition.png";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState<
    "calculator" | "nutrition" | "roadmap" | "howto" | "resources"
  >("calculator");

  const renderContent = () => {
    switch (activeSection) {
      case "calculator":
        return (
          <p>
            Witamy w kalkulatorze! Tutaj pojawi się główna zawartość strony.
          </p>
        );
      case "nutrition":
        return <p>Część strony z informacjami o odżywianiu zwierząt</p>;
      case "roadmap":
        return <p> Część strony z plany rozwoju strony</p>;
      case "howto":
        return <p>Część strony z instrukcją korzystania z kalkulatora</p>;
      case "resources":
        return <p>Część strony z dodatkowymi zasobami</p>;
      default:
        return (
          <p>Witamy w Cuterition! Wybierz sekcję powyżej, aby rozpocząć.</p>
        );
    }
  };

  const buttons = [
    { key: "calculator", label: "Kalkulator", isPrimary: true },
    { key: "nutrition", label: "Informacje o odżywianiu", isPrimary: false },
    { key: "roadmap", label: "Plany rozwoju", isPrimary: false },
    { key: "howto", label: "Jak korzystać", isPrimary: false },
    { key: "resources", label: "Zasoby", isPrimary: false },
  ];

  return (
    <div id="root">
      {/* HEADER */}
      <header className="header">
        {/* Logo + Name */}
        <div className="logo-container">
          <img src={logo} alt="Logo Cuterition" />
          <div className="logo-text">
            <h1>Cuterition</h1>
            <p>Kalkulator żywienia zwierząt</p>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="divider" />

        {/* Header Buttons */}
        <div className="button-container">
          {buttons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setActiveSection(btn.key as any)}
              className={`${btn.isPrimary ? "primary" : ""} ${
                activeSection === btn.key ? "active" : ""
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

export default App;
