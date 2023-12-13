//import { Link } from "react-router-dom";

const RelicRates = () => {
  return (
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
        Chests: 20% HP/ATK/DEF, 10% CR/CD/Healing/EHR
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
  );
};

export default RelicRates;
