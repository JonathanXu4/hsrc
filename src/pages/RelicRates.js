//import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const RelicRates = () => {
  const [selectedInputA, setSelectedInputA] = useState("Head");
  const [selectedInputB, setSelectedInputB] = useState([]);

  const [selectedSubstats, setSelectedSubstats] = useState([]);
  const [substatCounts, setSubstatCounts] = useState({});
  //let subs = 0;

  const piece = ["Head", "Hands", "Body", "Feet", "Sphere", "Rope"];
  const optionsInputB = {
    Head: ["Hp"],
    Hands: ["Atk"],
    Body: ["Hp%", "Atk%", "Def%", "CR", "CD", "Heal", "EHR"],
    Feet: ["Hp%", "Atk%", "Def%", "Spd"],
    Sphere: ["Hp%", "Atk%", "Def%", "Dmg"],
    Rope: ["Hp%", "Atk%", "Def%", "Break", "ERR"],
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

  const handleSubstatCheckboxChange = (substat) => {
    const isChecked = selectedSubstats.includes(substat);

    if (isChecked) {
      // Remove the substat if it is already selected
      setSelectedSubstats((prevSelectedSubstats) =>
        prevSelectedSubstats.filter(
          (selectedSubstat) => selectedSubstat !== substat
        )
      );
    } else {
      // Add the substat if it is not selected
      setSelectedSubstats((prevSelectedSubstats) => [
        ...prevSelectedSubstats,
        substat,
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

  const weightMaps = {
    Head: {
      Hp: 100,
    },
    Hands: {
      Atk: 100,
    },
    Body: {
      "Hp%": 20,
      "Atk%": 20,
      "Def%": 20,
      CR: 10,
      CD: 10,
      Heal: 10,
      EHR: 10,
    },
    Feet: {
      "Hp%": 30,
      "Atk%": 30,
      "Def%": 30,
      Spd: 10,
    },
    Sphere: {
      "Hp%": 12,
      "Atk%": 12,
      "Def%": 12,
      Dmg: 64 / 7,
    },
    Rope: {
      "Hp%": 26,
      "Atk%": 26,
      "Def%": 26,
      Break: 16,
      ERR: 6,
    },
  };

  const weightMapSubstats = {
    Hp: 10,
    Atk: 10,
    Def: 10,
    "Hp%": 10,
    "Atk%": 10,
    "Def%": 10,
    EHR: 8,
    Res: 8,
    Break: 8,
    CR: 6,
    CD: 6,
    Spd: 4,
  };

  const allSubstats = [
    "Hp",
    "Atk",
    "Def",
    "Hp%",
    "Atk%",
    "Def%",
    "EHR",
    "Res",
    "Break",
    "CR",
    "CD",
    "Spd",
  ];

  const getWeight = (inputA, optionB) => {
    const weightMap = weightMaps[inputA];
    return weightMap ? weightMap[optionB] || 0 : 0;
  };

  const calculateTotalWeight = () => {
    let totalWeight = 0;

    for (const option of selectedInputB) {
      totalWeight += getWeight(selectedInputA, option);
    }

    return totalWeight;
  };

  const getRandomOption = () => {
    const totalWeight = calculateTotalWeight();

    if (totalWeight === 0) {
      // No options selected or all weights are 0
      return null;
    }

    const randomValue = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (const option of selectedInputB) {
      cumulativeWeight += getWeight(selectedInputA, option);

      if (randomValue <= cumulativeWeight) {
        // This option is selected
        return option;
      }
    }

    // Fallback in case of rounding errors
    return selectedInputB[selectedInputB.length - 1];
  };

  const generateSubstats = (mainstat) => {
    const rolls = Math.random() < 0.5 ? 4 : 5;
    const chosenSubstats = [];
    let subs = 0;

    for (let i = 0; i < 4; i++) {
      let selectedSubstat;

      // Randomly select a substat based on weights
      do {
        selectedSubstat = getRandomSubstat();
      } while (
        selectedSubstat === mainstat ||
        chosenSubstats.includes(selectedSubstat)
      );

      chosenSubstats.push(selectedSubstat);
    }
    const subRolls = [1, 1, 1, 1];

    for (let roll = 0; roll < rolls; roll++) {
      const randomIndex = Math.floor(Math.random() * 4);
      subRolls[randomIndex] += 1;
    }
    for (let i = 0; i < 4; i++) {
      if (selectedSubstats.includes(chosenSubstats[i])) {
        // Do something if the substat is selected
        subs += subRolls[i];
      }
      //chosenSubstats[i] += " " + subRolls[i];
    }
    return subs;
    //return { mainstat, substats: chosenSubstats };
  };

  const getRandomSubstat = () => {
    const substatEntries = Object.entries(weightMapSubstats);
    const totalSubstatsWeight = substatEntries.reduce(
      (sum, [, weight]) => sum + weight,
      0
    );
    const randomValue = Math.random() * totalSubstatsWeight;
    let cumulativeWeight = 0;

    for (const [substat, weight] of substatEntries) {
      cumulativeWeight += weight;

      if (randomValue <= cumulativeWeight) {
        return substat;
      }
    }

    // Fallback in case of rounding errors
    return substatEntries[substatEntries.length - 1][0];
  };

  const simulateProbability = () => {
    const numSimulations = 10000; // You can adjust this based on your needs
    let results = "subs chance  runs  power\n";
    let substats = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < numSimulations; i++) {
      const selectedOption = getRandomOption();
      //const generatedSubstats = generateSubstats(selectedOption);
      const subs = generateSubstats(selectedOption);
      for (let j = 0; j < subs; j++) {
        substats[j]++;
      }
      /*const result = {
        mainstat: selectedOption,
        substats: generatedSubstats.substats,
      };*/
      //results.push(result);
    }

    for (let i = 0; i < substats.length; i++) {
      substats[i] *= calculateTotalWeight() / 4 / numSimulations;
      if (selectedInputA === "Sphere" || selectedInputA === "Rope") {
        substats[i] *= 2; // Multiply by 2 for Sphere or Rope
      }
      results += i + 1 + ":   " + substats[i].toFixed(2) + "%  ";
      substats[i] = 100 / substats[i];
      results += substats[i].toFixed(3) + "  ";
      results += (substats[i] * 30).toFixed(3) + "\n";
    }

    return results;
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
            <h5>Piece:</h5>
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
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ marginRight: "40px" }}>
                <h5>Main stat:</h5>
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
              <div style={{ marginRight: "40px" }}>
                <h5>Substats:</h5>
                {allSubstats.map((substat) => (
                  <div key={substat}>
                    <input
                      type="checkbox"
                      style={{ marginRight: "10px" }}
                      value={substat}
                      checked={selectedSubstats.includes(substat)}
                      onChange={() => handleSubstatCheckboxChange(substat)}
                    />
                    {substat}
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
        <h5>Total Weight</h5>
        <p>{`Total Weight: ${calculateTotalWeight()}`}</p>
        <h5>Simulated Probability</h5>
        <pre>{simulateProbability()}</pre>
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
          <br /> Feet: 30% HP/ATK/DEF, 10% SPD
          <br /> Sphere: 12% HP/ATK/DEF, 64% Element(/7 = 9.14% each)
          <br /> Rope: 26% HP/ATK/DEF, 16% Break, 6% ERR
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
