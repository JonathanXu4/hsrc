import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [charData, setcharData] = useState(null);

  useEffect(() => {
    fetch("https://hsrtest.onrender.com/api/stats")
      .then((response) => response.json())
      .then((data) => {
        setcharData(data.charList);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Character Data</h1>
      {charData && (
        <table>
          <thead>
            <tr>
              <th>Character Name</th>
              <th>Level</th>
              <th>HP</th>
              <th>ATK</th>
              <th>DEF</th>
              <th>SPD</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(charData).map((charName) => (
              <React.Fragment key={charName}>
                <tr>
                  <td rowSpan={Object.entries(charData[charName]).length}>
                    {charName}
                  </td>
                </tr>
                {Object.entries(charData[charName]).map(([level, stats]) => (
                  <tr key={`${charName}-${level}`}>
                    <td>{level}</td>
                    <td>{stats.hp}</td>
                    <td>{stats.atk}</td>
                    <td>{stats.def}</td>
                    <td>{stats.spd}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Calculator;
