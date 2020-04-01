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

      // Types
      const pokemonTypes = entry.Types.split("!");
      personalEntry.Type1 = type[pokemonTypes[0].toLowerCase()];
      personalEntry.Type2 = type[pokemonTypes[1].toLowerCase()];

      // CatchRate
      personalEntry.CatchRate = parseInt(entry.CatchRate);

      // EvoStage
      personalEntry.EvoStage = parseInt(entry.EvoStage);

      // EVs
      const pokemonEVs = entry.Evs.split("~");
      personalEntry.EVs.EV_HP = parseInt(pokemonEVs[0]);
      personalEntry.EVs.EV_ATK = parseInt(pokemonEVs[1]);
      personalEntry.EVs.EV_DEF = parseInt(pokemonEVs[2]);
      personalEntry.EVs.EV_SPE = parseInt(pokemonEVs[3]);
      personalEntry.EVs.EV_SPA = parseInt(pokemonEVs[4]);
      personalEntry.EVs.EV_SPD = parseInt(pokemonEVs[5]);
      personalEntry.EVs.EV_UNK = parseInt(pokemonEVs[6]);

      // Item1
      personalEntry.Item1 = entry.WildHeldItem1
        ? eval(entry.WildHeldItem1)
        : entry.WildHeldItem1;

      // Item2
      personalEntry.Item2 = entry.WildHeldItem2
        ? eval(entry.WildHeldItem2)
        : entry.WildHeldItem2;

      // Item3
      personalEntry.Item3 = entry.WildHeldItem3
        ? eval(entry.WildHeldItem3)
        : entry.WildHeldItem3;

      // Gender
      personalEntry.Gender = !isNaN(entry["Gender(N=-1)"])
        ? entry["Gender(N=-1)"]
        : genderRatio[entry["Gender(N=-1)"].toLowerCase()]
        ? genderRatio[entry["Gender(N=-1)"].toLowerCase()]
        : 0;

      // HatchCycles
      personalEntry.HatchCycles = !isNaN(entry.HatchCycles)
        ? entry.HatchCycles
        : hatchCycles[entry.HatchCycles]
        ? hatchCycles[entry.HatchCycles]
        : 0;

      // BaseFriendship
      personalEntry.BaseFriendship = !isNaN(entry.BaseFriendship)
        ? entry.BaseFriendship
        : baseFriendship[entry.BaseFriendship]
        ? baseFriendship[entry.BaseFriendship]
        : 0;

      // EXPGrowth
      personalEntry.EXPGrowth = !isNaN(entry.EXPGrowth)
        ? entry.EXPGrowth
        : expGrowthRate[entry.EXPGrowth]
        ? expGrowthRate[entry.EXPGrowth]
        : 0;

      // EggGroup1

      personalEntry.EggGroup1 = !isNaN(entry.EggGroup1)
        ? entry.EggGroup1
        : eggGroup[entry.EggGroup1.substr(9)]
        ? eggGroup[entry.EggGroup1.substr(9)]
        : 0;

      // EggGroup2
      personalEntry.EggGroup2 = !isNaN(entry.EggGroup2)
        ? entry.EggGroup2
        : eggGroup[entry.EggGroup2.substr(9)]
        ? eggGroup[entry.EggGroup2.substr(9)]
        : 0;

      // Ability1
      personalEntry.Ability1 = !isNaN(entry.Ability1)
        ? entry.Ability1
        : ability[entry.Ability1]
        ? ability[entry.Ability1]
        : 0;

      // Ability2
      personalEntry.Ability2 = !isNaN(entry.Ability2)
        ? entry.Ability2
        : ability[entry.Ability2]
        ? ability[entry.Ability2]
        : 0;

      // AbilityH
      personalEntry.AbilityH = !isNaN(entry.AbilityH)
        ? entry.AbilityH
        : ability[entry.AbilityH]
        ? ability[entry.AbilityH]
        : 0;

      // FormeSprite
      personalEntry.FormeSprite = entry.FormSprite;

      // FormeCount
      personalEntry.FormeCount = parseInt(entry.FormCount);

      // Color
      personalEntry.Color = parseInt(entry.Color);

      // IsPresentInGame
      personalEntry.IsPresentInGame = !!entry.IsPresentInGame;

      // BaseEXP
      personalEntry.BaseEXP = parseInt(entry.BaseEXP);

      // Height/Weight
      const pokemonHeightWEight = entry.DexHeight_Weight.split("!");
      personalEntry.Height = parseInt(pokemonHeightWEight[0]);
      personalEntry.Weight = parseInt(pokemonHeightWEight[1]);

      //Icon
      personalEntry.Icon = parseInt(entry.Icon);

      // EvoBaseID
      personalEntry.EvoBaseID = parseInt(entry.EvoBaseID);

      // FormIndex
      personalEntry.FormIndex = parseInt(entry.FormIndex);

      // IsGalarianForm
      personalEntry.IsGalarianForm = !!entry.IsGalarianForm;

      // IsBoxLegend
      personalEntry.IsBoxLegend = !!entry.IsBoxLegend;

      // DexNumber
      personalEntry.DexNumber = parseInt(entry.DexNumber);
    });
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
