//import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const RelicRates = () => {
  const [selectedInputA, setSelectedInputA] = useState("Head");
  const [selectedInputB, setSelectedInputB] = useState([]);

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
    setSelectedInputB([]);
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

  useEffect(() => {}, [selectedInputA, optionsInputB]);

  // select all
  const selectAllInputB = () => {
    setSelectedInputB(optionsInputB[selectedInputA]);
  };

  // deselect all
  const resetInputB = () => {
    setSelectedInputB([]);
  };

  return (
    <div>
      <div
        class="text"
        style={{
          margin: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          display: "flex", // Use flex container
          flexDirection: "column", // Stack children vertically
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ marginRight: "40px" }}>
            <label>
              Piece:
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ marginRight: "40px" }}>
                <label>Main stat:</label>
                {optionsInputB[selectedInputA].map((option) => (
                  <div key={option}>
                    <input
                      type="checkbox"
                      style={{ marginRight: "10px" }}
                      value={option}
                      checked={selectedInputB.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                    {option}
                  </div>
                ))}
              </div>

              {selectedInputA && selectedInputB.length > 0 && (
                <div>
                  <p>Selected Input A: {selectedInputA}</p>
                  <p>
                    Selected Input B:
                    {selectedInputB.map((option, index) => (
                      <span key={option}>
                        {index > 0 && ", "} {option}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
            <div style={{ marginTop: "5px" }}>
              <button
                style={{ width: "100px", marginBottom: "2px" }}
                onClick={selectAllInputB}
              >
                Select all
              </button>
              <br />
              <button style={{ width: "100px" }} onClick={resetInputB}>
                Deselect all
              </button>
            </div>
          </div>
        </div>
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
