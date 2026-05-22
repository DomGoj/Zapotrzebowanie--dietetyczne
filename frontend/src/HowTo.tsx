import React from "react";
import "./HowTo.css";

const HowToUseCuterition: React.FC = () => {
  return (
    <div className="cu-wrap">
      <div className="cu-header-bar">
        <div className="cu-logo-dot" />
        <span>Jak korzystać z Cuterition?</span>
      </div>

      <div className="cu-card">
        <p className="cu-intro">Kalkulator żywienia zwierząt w 5 prostych krokach</p>

        <div className="cu-steps">

          <div className="cu-step s1">
            <div className="cu-step-num">1</div>
            <div className="cu-step-body">
              <p className="cu-step-title">Wybierz zwierzę</p>
              <p className="cu-step-desc">
                Kliknij kafelek z ikoną swojego pupila, aby dobrać odpowiednie normy żywieniowe.
              </p>

              <div className="cu-animal-row">
                <span className="cu-animal-pill">🐱 Kot</span>
                <span className="cu-animal-pill">🐶 Pies</span>
              </div>

              <span className="cu-step-tag">Kalkulator</span>
            </div>
          </div>

          <div className="cu-step s2">
            <div className="cu-step-num">2</div>
            <div className="cu-step-body">
              <p className="cu-step-title">Podaj wagę zwierzęcia</p>
              <p className="cu-step-desc">
                Wpisz aktualną wagę (w kg) — kalkulator automatycznie dostosuje dzienne limity składników.
              </p>
              <span className="cu-step-tag">np. 4,5 kg</span>
            </div>
          </div>

          <div className="cu-step s3">
            <div className="cu-step-num">3</div>
            <div className="cu-step-body">
              <p className="cu-step-title">Wyszukaj składniki posiłku</p>
              <p className="cu-step-desc">
                Wpisz nazwę produktu w wyszukiwarkę. Wybieraj składniki z listy wyników i klikaj{" "}
                <strong>Dodaj</strong>.
              </p>
              <span className="cu-step-tag">Baza składników</span>
            </div>
          </div>

          <div className="cu-step s4">
            <div className="cu-step-num">4</div>
            <div className="cu-step-body">
              <p className="cu-step-title">Ustaw gramatury</p>
              <p className="cu-step-desc">
                W tabeli dodanych składników zmień wagę każdego produktu (w gramach). Kliknij{" "}
                <strong>×</strong>, aby usunąć składnik.
              </p>
              <span className="cu-step-tag">Tabela składników</span>
            </div>
          </div>

          <div className="cu-step s5">
            <div className="cu-step-num">5</div>
            <div className="cu-step-body">
              <p className="cu-step-title">Odczytaj wartości odżywcze</p>
              <p className="cu-step-desc">
                Paski postępu pokazują białko, tłuszcz, węglowodany, wapń, fosfor i taurynę względem dziennego
                zapotrzebowania.
              </p>
              <span className="cu-step-tag">Podsumowanie</span>
            </div>
          </div>

        </div>

        <div className="cu-tip">
          <strong>Wskazówka:</strong> Paski wypełnione w 100% oznaczają osiągnięcie maksymalnej dziennej normy —
          dostosuj gramatury, żeby utrzymać balans.
        </div>
      </div>
    </div>
  );
};

export default HowToUseCuterition;