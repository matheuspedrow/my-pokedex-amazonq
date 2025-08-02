/**
 * Array com todos os tipos de Pokémon disponíveis
 * @type {Array<string>}
 */
export const types = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

/**
 * Array com todas as gerações de Pokémon
 * @type {Array<string>}
 */
export const generations = [
  "gen1",
  "gen2",
  "gen3",
  "gen4",
  "gen5",
  "gen6",
  "gen7",
  "gen8",
]

/**
 * Mapeamento dos ranges de ID por geração
 * @type {Object}
 */
export const pokesPerGen = {
  gen1: {
    start: 1,
    end: 151,
  },
  gen2: {
    start: 152,
    end: 251,
  },
  gen3: {
    start: 252,
    end: 386,
  },
  gen4: {
    start: 387,
    end: 494,
  },
  gen5: {
    start: 495,
    end: 649,
  },
  gen6: {
    start: 650,
    end: 721,
  },
  gen7: {
    start: 722,
    end: 809,
  }, 
  gen8: {
    start: 810,
    end: 898,
  }, 
};