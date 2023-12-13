//import { Link } from "react-router-dom";
import React, { useState } from "react";

const RelicRates = () => {
  const [selectedInputA, setSelectedInputA] = useState("");
  const [selectedInputB, setSelectedInputB] = useState("");

  const piece = ["Hands", "Body", "Feet", "Sphere", "Rope"];
  const optionsInputB = {
    Head: ["Hp"],
    Hands: ["Atk"],
    Body: ["Hp%", "Atk%", "Def%", "CR", "CD", "Heal", "EHR"],
    Feet: ["Hp%", "Atk%", "Def%", "Spd"],
    Sphere: ["Hp%", "Atk%", "Def%", "Dmg"],
    Rope: ["Hp%", "Atk%", "Def%", "Break", "EHR"],
  };

  const handleInputAChange = (value) => {
    setSelectedInputA(value);
    setSelectedInputB("Hp");
  };

  const handleInputBChange = (value) => {
    setSelectedInputB(value);
  };

  return (
    <div>
      <div class="text">
        <h1>relic stats</h1>
        <h2>droprates</h2>
        <p>
          ar 6: 2.43 relics/run
          <br /> ar 5: 2 relics/run
          <br /> these numbers are halved due to 2 sets
        </p>
        <h2>mainstats</h2>
        <p>
          Body: 20% HP/ATK/DEF, 10% CR/CD/Healing/EHR
          <br /> Boots: 30% HP/ATK/DEF, 10% SPD
          <br /> Sphere: 12% HP/ATK/DEF, 64% Element(/7 = 9.14% each)
          <br /> Rope: 26% HP/ATK/DEF, 16% Break, 6% ER
        </p>
        <h2>substats</h2>
        <p>
          10% HP/ATK/DEF/HP%/ATK%/DEF%
          <br /> 8% EHR/RES/Break
          <br /> 6% CR/CD
          <br /> 4% SPD
        </p>
      </div>
      <div class="text">
        <label>
          piece:
          <select
            value={selectedInputA}
            onChange={(e) => handleInputAChange(e.target.value)}
          >
            <option value="Head">Head</option>
            {piece.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        {selectedInputA && (
          <label>
            main stat
            <select
              value={selectedInputB}
              onChange={(e) => handleInputBChange(e.target.value)}
            >
              {optionsInputB[selectedInputA].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        )}

        {selectedInputA && selectedInputB && (
          <div>
            <p>Selected Input A: {selectedInputA}</p>
            <p>Selected Input B: {selectedInputB}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelicRates;
