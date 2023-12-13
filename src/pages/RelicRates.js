//import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const RelicRates = () => {
  const [selectedInputA, setSelectedInputA] = useState("Head");
  const [selectedInputB, setSelectedInputB] = useState("Hp");

  const piece = ["Head", "Hands", "Body", "Feet", "Sphere", "Rope"];
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
  };

  const handleCheckboxChange = (option) => {
    const isChecked = selectedInputB.includes(option);

    if (isChecked) {
      // Remove the option if it is already selected
      setSelectedInputB((prevSelectedInputB) =>
        prevSelectedInputB.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      // Add the option if it is not selected
      setSelectedInputB((prevSelectedInputB) => [
        ...prevSelectedInputB,
        option,
      ]);
    }
  };

  useEffect(() => {
    // Update optionsInputB based on the default value of inputA
    setSelectedInputB([optionsInputB[selectedInputA][0]]);
  }, [selectedInputA, optionsInputB]);

  return (
    <div>
      <div
        class="text"
        style={{
          margin: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <label>
            piece:
            <select
              value={selectedInputA}
              onChange={(e) => handleInputAChange(e.target.value)}
            >
              {piece.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginRight: "20px" }}>
          <label>main stat:</label>
          {optionsInputB[selectedInputA].map((option) => (
            <div key={option}>
              <input
                type="checkbox"
                value={option}
                checked={selectedInputB.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </div>
          ))}
        </div>

        {selectedInputA && selectedInputB && (
          <div>
            <p>Selected Input A: {selectedInputA}</p>
            <p>Selected Input B: {selectedInputB}</p>
          </div>
        )}
      </div>
      <div class="text">
        <h4>relic stats</h4>
        <h5>droprates</h5>
        <p>
          ar 6: 2.43 relics/run
          <br /> ar 5: 2 relics/run
          <br /> these numbers are halved due to 2 sets
        </p>
        <h5>mainstats</h5>
        <p>
          Body: 20% HP/ATK/DEF, 10% CR/CD/Healing/EHR
          <br /> Boots: 30% HP/ATK/DEF, 10% SPD
          <br /> Sphere: 12% HP/ATK/DEF, 64% Element(/7 = 9.14% each)
          <br /> Rope: 26% HP/ATK/DEF, 16% Break, 6% ER
        </p>
        <h5>substats</h5>
        <p>
          10% HP/ATK/DEF/HP%/ATK%/DEF%
          <br /> 8% EHR/RES/Break
          <br /> 6% CR/CD
          <br /> 4% SPD
        </p>
      </div>
    </div>
  );
};

export default RelicRates;
