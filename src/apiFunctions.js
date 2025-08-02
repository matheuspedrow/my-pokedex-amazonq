/**
 * Cria um array com números sequenciais de 1 até o tamanho especificado
 * @param {number} size - Tamanho do array a ser criado
 * @returns {Array<number>} Array com números de 1 até size
 */
const createArrayWithSize = (size) =>
  Array.from({ length: size }, (_, i) => i + 1);

/**
 * Exibe a seção de filtros na interface
 */
const searchOn = () => {
  const search = document.querySelector(".filters-box");
  if (search) {
    search.style.display = "flex";
  }
};

/**
 * Exibe a seção de botão limpar filtros
 */
const filterOn = () => {
  const search = document.querySelector(".clean-filter-section");
  if (search) {
    search.style.display = "flex";
  }
};

/**
 * Oculta a seção de filtros na interface
 */
const searchOff = () => {
  const search = document.querySelector(".filters-box");
  if (search) {
    search.style.display = "none";
  }
};

/**
 * Oculta o indicador de carregamento
 */
const loadingOff = () => {
  const loading = document.querySelector(".loading");
  if (loading) {
    loading.style.display = "none";
  }
};

/**
 * Ativa todas as opções de interface após o carregamento inicial
 */
export const turnOnOptions = () => {
  loadingOff();
  searchOn();
  filterOn();
};

/**
 * Carrega dados de todos os Pokémon da API
 * @param {number} numberOfPokemons - Número total de Pokémon a carregar
 * @returns {Promise<Array>} Promise que resolve com array de dados dos Pokémon
 */
export const loadPokemons = async (numberOfPokemons) => {
  try {
    const pokemonArray = createArrayWithSize(numberOfPokemons);
    searchOff();

    const allPokes = pokemonArray.map(async (pokemon) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        if (!response.ok) {
          throw new Error(
            `Erro ao carregar Pokémon ${pokemon}: ${response.status}`
          );
        }
        return response.json();
      } catch (error) {
        console.error(`Erro ao carregar Pokémon ${pokemon}:`, error);
        // Retorna um objeto de fallback para manter a estrutura
        return {
          id: pokemon,
          name: `pokemon-${pokemon}`,
          types: [{ type: { name: "unknown" } }],
          sprites: { front_default: "./images/error/not-found.gif" },
          stats: [
            { base_stat: 0 },
            { base_stat: 0 },
            { base_stat: 0 },
            { base_stat: 0 },
            { base_stat: 0 },
            { base_stat: 0 },
          ],
        };
      }
    });

    return await Promise.all(allPokes);
  } catch (error) {
    console.error("Erro geral ao carregar Pokémon:", error);
    throw error;
  }
};

/**
 * Extrai os nomes dos tipos de um array de tipos de Pokémon
 * @param {Array} types - Array de tipos do Pokémon
 * @returns {Array<string>} Array com os nomes dos tipos
 */
export const readTypes = (types) =>
  types.map(({ type }) => {
    const { name } = type;
    return name;
  });
