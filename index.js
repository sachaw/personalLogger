import {
  type,
  item,
  genderRatio,
  hatchCycles,
  baseFriendship,
  expGrowthRate,
  eggGroup,
  ability
} from "./typeLoader";
import csv from "csv-parser";
import { createReadStream, writeFileSync, readFileSync } from "fs";

const personal = JSON.parse(readFileSync("personal.json"));
let entries = [];

createReadStream("PersonalSheet.csv")
  .pipe(csv())
  .on("data", data => entries.push(data))
  .on("end", () => {
    entries.shift();
    personal.Entries.forEach((personalEntry, index) => {
      if (typeof entries[index] === "undefined") {
        return;
      }
      const entry = entries[index];

      // Base stats
      const pokemonStats = entry.BaseStats.split("~");
      // TODO: Rename "Base stats" to "BaseStats" in schema
      personalEntry["Base stats"].HP = parseInt(pokemonStats[0]);
      personalEntry["Base stats"].ATK = parseInt(pokemonStats[1]);
      personalEntry["Base stats"].DEF = parseInt(pokemonStats[2]);
      personalEntry["Base stats"].SPE = parseInt(pokemonStats[3]);
      personalEntry["Base stats"].SPA = parseInt(pokemonStats[4]);
      personalEntry["Base stats"].SPD = parseInt(pokemonStats[5]);
      if (
        typeof personalEntry["Base stats"] === "undefined" ||
        typeof personalEntry["Base stats"].HP === "undefined" ||
        typeof personalEntry["Base stats"].ATK === "undefined" ||
        typeof personalEntry["Base stats"].DEF === "undefined" ||
        typeof personalEntry["Base stats"].SPE === "undefined" ||
        typeof personalEntry["Base stats"].SPA === "undefined" ||
        typeof personalEntry["Base stats"].SPD === "undefined"
      ) {
        console.log("Base stat is undefined for pokemon: " + entry.Name);
      }

      // Types
      const pokemonTypes = entry.Types.split("!");
      personalEntry.Type1 = type[pokemonTypes[0].toLowerCase()];
      personalEntry.Type2 = type[pokemonTypes[1].toLowerCase()];
      if (
        typeof personalEntry.Type1 === "undefined" ||
        typeof personalEntry.Type2 === "undefined"
      ) {
        console.log("Type is undefined for pokemon: " + entry.Name);
      }

      // CatchRate
      personalEntry.CatchRate = parseInt(entry.CatchRate);
      if (typeof personalEntry.CatchRate === "undefined") {
        console.log("Catch Rate is undefined for pokemon: " + entry.Name);
      }

      // EvoStage
      personalEntry.EvoStage = parseInt(entry.EvoStage);
      if (typeof personalEntry.EvoStage === "undefined") {
        console.log("Evo Stage is undefined for pokemon: " + entry.Name);
      }

      // EVs
      const pokemonEVs = entry.Evs.split("~");
      personalEntry.EVs.EV_HP = parseInt(pokemonEVs[0]);
      personalEntry.EVs.EV_ATK = parseInt(pokemonEVs[1]);
      personalEntry.EVs.EV_DEF = parseInt(pokemonEVs[2]);
      personalEntry.EVs.EV_SPE = parseInt(pokemonEVs[3]);
      personalEntry.EVs.EV_SPA = parseInt(pokemonEVs[4]);
      personalEntry.EVs.EV_SPD = parseInt(pokemonEVs[5]);
      personalEntry.EVs.EV_UNK = parseInt(pokemonEVs[6]);
      if (
        typeof personalEntry.EVs === "undefined" ||
        typeof personalEntry.EVs.EV_HP === "undefined" ||
        typeof personalEntry.EVs.EV_ATK === "undefined" ||
        typeof personalEntry.EVs.EV_DEF === "undefined" ||
        typeof personalEntry.EVs.EV_SPE === "undefined" ||
        typeof personalEntry.EVs.EV_SPA === "undefined" ||
        typeof personalEntry.EVs.EV_SPD === "undefined" ||
        typeof personalEntry.EVs.EV_UNK === "undefined"
      ) {
        console.log("An EV is undefined for pokemon: " + entry.Name);
      }

      // Item1
      personalEntry.Item1 = entry.WildHeldItem1
        ? eval(entry.WildHeldItem1)
        : entry.WildHeldItem1;
      if (typeof personalEntry.Item1 === "undefined") {
        console.log("Item1 is undefined for pokemon: " + entry.Name);
      }

      // Item2
      personalEntry.Item2 = entry.WildHeldItem2
        ? eval(entry.WildHeldItem2)
        : entry.WildHeldItem2;
      if (typeof personalEntry.Item2 === "undefined") {
        console.log("Item2 is undefined for pokemon: " + entry.Name);
      }

      // Item3
      personalEntry.Item3 = entry.WildHeldItem3
        ? eval(entry.WildHeldItem3)
        : entry.WildHeldItem3;
      if (typeof personalEntry.Item3 === "undefined") {
        console.log("Item3 is undefined for pokemon: " + entry.Name);
      }

      // Gender
      personalEntry.Gender = !isNaN(entry["Gender(N=-1)"])
        ? entry["Gender(N=-1)"]
        : genderRatio[entry["Gender(N=-1)"].toLowerCase()]
        ? genderRatio[entry["Gender(N=-1)"].toLowerCase()]
        : 0;
      if (typeof personalEntry.Gender === "undefined") {
        console.log("Gender is undefined for pokemon: " + entry.Name);
      }

      // HatchCycles
      personalEntry.HatchCycles = !isNaN(entry.HatchCycles)
        ? entry.HatchCycles
        : hatchCycles[entry.HatchCycles]
        ? hatchCycles[entry.HatchCycles]
        : 0;
      if (typeof personalEntry.HatchCycles === "undefined") {
        console.log("Hatch Cycles is undefined for pokemon: " + entry.Name);
      }

      // BaseFriendship
      personalEntry.BaseFriendship = !isNaN(entry.BaseFriendship)
        ? entry.BaseFriendship
        : baseFriendship[entry.BaseFriendship]
        ? baseFriendship[entry.BaseFriendship]
        : 0;
      if (typeof personalEntry.BaseFriendship === "undefined") {
        console.log("Base Friendship is undefined for pokemon: " + entry.Name);
      }

      // EXPGrowth
      personalEntry.EXPGrowth = !isNaN(entry.EXPGrowth)
        ? entry.EXPGrowth
        : expGrowthRate[entry.EXPGrowth]
        ? expGrowthRate[entry.EXPGrowth]
        : 0;
      if (typeof personalEntry.EXPGrowth === "undefined") {
        console.log("EXP Growth is undefined for pokemon: " + entry.Name);
      }

      // EggGroup1
      personalEntry.EggGroup1 = !isNaN(entry.EggGroup1)
        ? entry.EggGroup1
        : eggGroup[entry.EggGroup1.substr(9)]
        ? eggGroup[entry.EggGroup1.substr(9)]
        : 0;
      if (typeof personalEntry.EggGroup1 === "undefined") {
        console.log("Egg Group 1 is undefined for pokemon: " + entry.Name);
      }

      // EggGroup2
      personalEntry.EggGroup2 = !isNaN(entry.EggGroup2)
        ? entry.EggGroup2
        : eggGroup[entry.EggGroup2.substr(9)]
        ? eggGroup[entry.EggGroup2.substr(9)]
        : 0;
      if (typeof personalEntry.EggGroup2 === "undefined") {
        console.log("Egg Group 2 is undefined for pokemon: " + entry.Name);
      }

      // Ability1
      personalEntry.Ability1 = !isNaN(entry.Ability1)
        ? entry.Ability1
        : ability[entry.Ability1]
        ? ability[entry.Ability1]
        : 0;
      if (typeof personalEntry.Ability1 === "undefined") {
        console.log("Ability 1 is undefined for pokemon: " + entry.Name);
      }

      // Ability2
      personalEntry.Ability2 = !isNaN(entry.Ability2)
        ? entry.Ability2
        : ability[entry.Ability2]
        ? ability[entry.Ability2]
        : 0;
      if (typeof personalEntry.Ability2 === "undefined") {
        console.log("Ability 2 is undefined for pokemon: " + entry.Name);
      }

      // AbilityH
      personalEntry.AbilityH = !isNaN(entry.AbilityH)
        ? entry.AbilityH
        : ability[entry.AbilityH]
        ? ability[entry.AbilityH]
        : 0;
      if (typeof personalEntry.AbilityH === "undefined") {
        console.log("Ability H is undefined for pokemon: " + entry.Name);
      }

      // FormeSprite
      personalEntry.FormeSprite = entry.FormSprite;
      if (typeof personalEntry.FormeSprite === "undefined") {
        console.log("Forme Sprite is undefined for pokemon: " + entry.Name);
      }

      // FormeCount
      personalEntry.FormeCount = parseInt(entry.FormCount);
      if (typeof personalEntry.FormeCount === "undefined") {
        console.log("Forme Count is undefined for pokemon: " + entry.Name);
      }

      // Color
      personalEntry.Color = parseInt(entry.Color);
      if (typeof personalEntry.Color === "undefined") {
        console.log("Color is undefined for pokemon: " + entry.Name);
      }

      // IsPresentInGame
      personalEntry.IsPresentInGame = !!entry.IsPresentInGame;
      if (typeof personalEntry.IsPresentInGame === "undefined") {
        console.log(
          "Is Present In Game is undefined for pokemon: " + entry.Name
        );
      }

      // BaseEXP
      personalEntry.BaseEXP = parseInt(entry.BaseEXP);
      if (typeof personalEntry.BaseEXP === "undefined") {
        console.log("Base EXP is undefined for pokemon: " + entry.Name);
      }

      // Height/Weight
      const pokemonHeightWEight = entry.DexHeight_Weight.split("!");
      personalEntry.Height = parseInt(pokemonHeightWEight[0]);
      personalEntry.Weight = parseInt(pokemonHeightWEight[1]);
      if (
        typeof personalEntry.Height === "undefined" ||
        typeof personalEntry.Weight === "undefined"
      ) {
        console.log("Height or Weight is undefined for pokemon: " + entry.Name);
      }

      //Icon
      personalEntry.Icon = parseInt(entry.Icon);
      if (typeof personalEntry.Icon === "undefined") {
        console.log("Icon is undefined for pokemon: " + entry.Name);
      }

      // EvoBaseID
      personalEntry.EvoBaseID = parseInt(entry.EvoBaseID);
      if (typeof personalEntry.EvoBaseID === "undefined") {
        console.log("Evo Base ID is undefined for pokemon: " + entry.Name);
      }

      // FormIndex
      personalEntry.FormIndex = parseInt(entry.FormIndex);
      if (typeof personalEntry.FormIndex === "undefined") {
        console.log("Form Index is undefined for pokemon: " + entry.Name);
      }

      // IsGalarianForm
      personalEntry.IsGalarianForm = !!entry.IsGalarianForm;
      if (typeof personalEntry.IsGalarianForm === "undefined") {
        console.log("Is Galarian Form is undefined for pokemon: " + entry.Name);
      }

      // IsBoxLegend
      personalEntry.IsBoxLegend = !!entry.IsBoxLegend;
      if (typeof personalEntry.IsBoxLegend === "undefined") {
        console.log("Is Box Legend is undefined for pokemon: " + entry.Name);
      }

      // DexNumber
      personalEntry.DexNumber = parseInt(entry.DexNumber);
      if (typeof personalEntry.DexNumber === "undefined") {
        console.log("Dex Number is undefined for pokemon: " + entry.Name);
      }
    });

    // UNUSED FIELDS:
    //
    // DexNum: '#003',
    // Name: 'Venusaur',
    // fields_sec1: '0!15!42!179!132!66!4!0!0!20!2!65!4!0!0!0!9!0!3!4!82!13!0!0!0!8!138!33!32!0!0!0',
    // 'unused(4E,50)': '0!0',
    // fields_sec2: '0!0',
    // field_sec3: '0!14!0!16!0!19!0!25!0!30!0!0!0!0!60!0!60!0!100!60!0!0!0!0!2!0!3!0!2!3!3!3!3!2!2',
    // Unknown: '1~1~1~1~1~5~5~4~5~5~2~2~4~5~5',
    // field_sec4: '0!0!0!0!74!0!202!0!74!202',
    // 'Unused(A6)': '0'
    writeFileSync("output.json", JSON.stringify(personal));
  });
