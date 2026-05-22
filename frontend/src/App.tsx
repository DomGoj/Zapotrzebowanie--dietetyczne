import { useState } from "react";
import logo from "./assets/LogoNutrition.png";
import catIcon from "./assets/cat-icon.png";
import dogIcon from "./assets/dog-icon.png";
import HowToUseCuterition from "./HowTo.tsx";
import "./App.css";

interface Ingredient {
  food_name: string;
  protein_g: number;
  fat_g: number;
  carbohydrates_g: number;
  calcium_mg: number;
  phosphorus_mg: number;
  zinc_mg: number;
  vitamin_a_ug: number;
  vitamin_d_ug: number;
  thiamin_mg: number;
  taurine_mg: number;
}

interface SelectedIngredient extends Ingredient {
  uniqueId: number;
  weight: number;
}

function App() {
  const [activeSection, setActiveSection] = useState<
    "calculator" | "nutrition" | "roadmap" | "howto" | "resources"
  >("calculator");

  const [selectedAnimal, setSelectedAnimal] = useState<"cat" | "dog" | null>(null);
  const [weight, setWeight] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);

  /* Komunikacja z bazą danych */
  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.length > 0) {
      try {
        const response = await fetch(`http://localhost:3000/api/ingredients?q=${term}`);
        if (!response.ok) throw new Error("Problem z połączeniem");
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  /* Zmiana wagi produktu */
  const handleIngredientWeightChange = (id: number, newWeight: string) => {
    setSelectedIngredients(selectedIngredients.map(item =>
      item.uniqueId === id ? { ...item, weight: Number(newWeight) } : item
    ));
  };

  /* Funkcja obliczeniowa składników */
  const calculateTotal = (nutrientKey: keyof Ingredient) => {
    return selectedIngredients.reduce((total, item) => {
      const value = Number(item[nutrientKey]) || 0;
      return total + (value * item.weight / 100);
    }, 0).toFixed(2);
  };

  /* Funkcja odpowiedzialna za paski postępu */
  const NutrientBar = ({ label, color, value, max }: { label: string, color: string, value: string | number, max: number }) => {
    const numValue = Number(value);
    const percentage = Math.min((numValue / max) * 100, 100) || 0;
    
    return (
      <div className="nutrient-bar-wrapper">
        <div className="nutrient-label">
          <span>{label}</span>
          <strong>{value} / {max.toFixed(2)}</strong> 
        </div>
        <div className="nutrient-track">
          <div className="nutrient-fill" style={{ backgroundColor: color, width: `${percentage}%` }}></div>
        </div>
      </div>
    );
  };

  const MAX_LIMITS = {
    cat: {
      protein_g: 12,
      fat_g: 5,
      carbohydrates_g: 3,
      calcium_mg: 400,
      phosphorus_mg: 350,
      taurine_mg: 500
    },
    dog: {
      protein_g: 10,
      fat_g: 4,
      carbohydrates_g: 10,
      calcium_mg: 450,
      phosphorus_mg: 350,
      taurine_mg: 500
    }
  };

  /* Funkcja pomocnicza do pasków */
  const calculateMaxLimit = (nutrientKey: keyof typeof MAX_LIMITS.cat) => {
    if (!selectedAnimal || !weight) return 100; // Default value if err
    const numericWeight = Number(weight) || 1;
    const baseLimit = MAX_LIMITS[selectedAnimal][nutrientKey];
    return baseLimit * numericWeight;
  };

  const renderContent = () => {
    switch (activeSection) {
      case "calculator":
        return (
          <div className="calculator-container">
            <h2 className="calc-title">Wybierz rodzaj zwierzęcia:</h2>
            
            <div className="animal-selector">
              {/* Cat button */}
              <button
                className={`animal-btn ${selectedAnimal === "cat" ? "active" : ""}`}
                onClick={() => setSelectedAnimal("cat")}
              >
                <img src={catIcon} alt="Kot" className="animal-icon" />
                <span className="animal-label">Kot</span>
              </button>

              {/* Dog button */}
              <button
                className={`animal-btn ${selectedAnimal === "dog" ? "active" : ""}`}
                onClick={() => setSelectedAnimal("dog")}
              >
                <img src={dogIcon} alt="Pies" className="animal-icon" />
                <span className="animal-label">Pies</span>
              </button>
            </div>

            {/* Weight */}
            {selectedAnimal && (
              <div className="weight-input-container">
                <label htmlFor="weight">{selectedAnimal === 'cat' ? 'Waga kota (kg):' : 'Waga psa (kg):'}</label>
                <div className="input-wrapper">
                  <input
                    id="weight"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="np. 5.5"
                    value={weight}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || Number(val) >= 0) {
                        setWeight(val);
                      }
                    }}
                  />
                  <span className="unit">kg</span>
                </div>
                {(!weight || Number(weight) <= 0) && (
                  <p className="calc-hint">
                    Proszę wprowadzić wagę zwierzęcia, aby kontynuować obliczenia.
                  </p>
                )}
              </div>
            )}

            {/* Ingredients search */}
            {selectedAnimal && weight && (
              <div className="search-section">
                <h3 className="section-subtitle">Wyszukaj składnik:</h3>
                <div className="search-bar-container">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Wpisz nazwę..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                {searchResults.length > 0 && (
                  <div className="results-list">
                    {searchResults.map((ing) => (
                      <div key={ing.food_name} className="result-item">
                        <span>{ing.food_name.replace(/_/g, ' ')}</span>
                        <button 
                          className="add-btn"
                          onClick={() => {
                            setSelectedIngredients([...selectedIngredients, { ...ing, uniqueId: Date.now(), weight: 100 }]);
                            setSearchTerm("");
                            setSearchResults([]);
                          }}
                        >
                          Dodaj
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {selectedIngredients.length > 0 && (
                  <>
                    {/* Added ingredients */}
                    <div className="selected-ingredients-table-container">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h4 style={{ margin: 0 }}>Dodane składniki</h4>
                        <button 
                          className="clear-all-btn"
                          onClick={() => {
                            if(window.confirm("Czy na pewno chcesz usunąć wszystkie składniki?")) {
                              setSelectedIngredients([]);
                            }
                          }}
                        >
                          Wyczyść wszystko
                        </button>
                      </div>
                      <table className="ingredients-table">
                        <thead>
                          <tr>
                            <th>Składnik</th>
                            <th>Waga (g)</th>
                            <th>Usuń</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedIngredients.map((item) => (
                            <tr key={item.uniqueId}>
                              <td>{item.food_name.replace(/_/g, ' ')}</td>
                              <td>
                                <input
                                  type="number"
                                  min="0"
                                  className="ingredient-weight-input"
                                  value={item.weight}
                                  onChange={(e) => handleIngredientWeightChange(item.uniqueId, e.target.value)}
                                />
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <button 
                                  className="remove-btn"
                                  onClick={() => setSelectedIngredients(selectedIngredients.filter(i => i.uniqueId !== item.uniqueId))}
                                >
                                  ×
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Nutritional values */}
                    <div className="nutrition-summary-container">
                      <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Wartości odżywcze posiłku /  Masymalne wartości dzienne dla {selectedAnimal === 'cat' ? 'kota' : 'psa'} o wadze {weight} kg
                      </h4>
                      <div className="nutrition-grid">
                        
                        {/* Left Column */}
                        <div className="nutrition-col">
                          <NutrientBar 
                            label="Białko (g)" 
                            color="#e74c3c" 
                            value={calculateTotal('protein_g')} 
                            max={calculateMaxLimit('protein_g')} 
                          />
                          <NutrientBar 
                            label="Tłuszcz (g)" 
                            color="#f39c12" 
                            value={calculateTotal('fat_g')} 
                            max={calculateMaxLimit('fat_g')} 
                          />
                          <NutrientBar 
                            label="Węglowodany (g)" 
                            color="#2ecc71" 
                            value={calculateTotal('carbohydrates_g')} 
                            max={calculateMaxLimit('carbohydrates_g')} 
                          />
                        </div>

                        {/* Right Column */}
                        <div className="nutrition-col">
                          <NutrientBar 
                            label="Wapń (mg)" 
                            color="#3498db" 
                            value={calculateTotal('calcium_mg')} 
                            max={calculateMaxLimit('calcium_mg')} 
                          />
                          <NutrientBar 
                            label="Fosfor (mg)" 
                            color="#9b59b6" 
                            value={calculateTotal('phosphorus_mg')} 
                            max={calculateMaxLimit('phosphorus_mg')} 
                          />
                          <NutrientBar 
                            label="Tauryna (mg)" 
                            color="#e67e22" 
                            value={calculateTotal('taurine_mg')} 
                            max={calculateMaxLimit('taurine_mg')} 
                          />
                        </div>

                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {selectedAnimal === null && (
              <p className="calc-hint">Proszę wybrać zwierzę, aby kontynuować obliczenia.</p>
            )}
            
          </div>
        );
      case "nutrition":
        return <p>Część strony z informacjami o odżywianiu zwierząt</p>;
      case "roadmap":
        return <p> Część strony z plany rozwoju strony</p>;
      case "howto":
        return <HowToUseCuterition />;
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
