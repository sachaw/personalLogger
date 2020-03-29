import { type } from "./typeLoader";
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
      personalEntry["Base stats"].HP = pokemonStats[0];
      personalEntry["Base stats"].ATK = pokemonStats[1];
      personalEntry["Base stats"].DEF = pokemonStats[2];
      personalEntry["Base stats"].SPE = pokemonStats[3];
      personalEntry["Base stats"].SPA = pokemonStats[4];
      personalEntry["Base stats"].SPD = pokemonStats[5];

      // Types
      const pokemonTypes = entry.Types.split("!");
      personalEntry["Type1"] = type[pokemonTypes[0].toLowerCase()];
      console.log(entry.Types);
      personalEntry["Type2"] = type[pokemonTypes[1].toLowerCase()];
    });
    // DexNum: '#003',
    // Name: 'Venusaur',
    // BaseStats: '80~82~83~80~100~100',
    // Types: 'GRASS!POISON',
    // CatchRate: '45',
    // EvoStage: '3',
    // Evs: '0~0~0~0~2~1~0',
    // WildHeldItem1: 'item.none',
    // WildHeldItem2: 'item.none',
    // WildHeldItem3: 'item.none',
    // 'Gender(N=-1)': 'GENDER_RATIO_M88_14F11_86',
    // HatchCycles: 'HATCH_CYCLES_5120',
    // BaseFriendship: 'BF_70',
    // EXPGrowth: 'EGR_MEDIUM_SLOW',
    // EggGroup1: 'egggroup.egg_group_monster',
    // EggGroup2: 'egggroup.egg_group_grass',
    // Ability1: 'ability.overgrow',
    // Ability2: 'ability.overgrow',
    // AbilityH: 'ability.chlorophyll',
    // FormSprite: '0',
    // FormCount: '1',
    // Color: '3',
    // IsPresentInGame: '1',
    // BaseEXP: '236',
    // DexHeight_Weight: '200!1000',
    // fields_sec1: '0!15!42!179!132!66!4!0!0!20!2!65!4!0!0!0!9!0!3!4!82!13!0!0!0!8!138!33!32!0!0!0',
    // Icon: '3',
    // 'unused(4E,50)': '0!0',
    // fields_sec2: '0!0',
    // EvoBaseID: '1',
    // FormIndex: '0',
    // IsGalarianForm: '0',
    // IsBoxLegend: '0',
    // DexNumber: '3',
    // field_sec3: '0!14!0!16!0!19!0!25!0!30!0!0!0!0!60!0!60!0!100!60!0!0!0!0!2!0!3!0!2!3!3!3!3!2!2',
    // Unknown: '1~1~1~1~1~5~5~4~5~5~2~2~4~5~5',
    // field_sec4: '0!0!0!0!74!0!202!0!74!202',
    // 'Unused(A6)': '0'

    writeFileSync("output.json", JSON.stringify(personal));
  });
