// Elementos DOM para busca
const searchField = document.querySelector("#search-text");
const searchType = document.querySelector(".search-type");
const searchBox = document.querySelector(".gen-search");

import {
  capitalizeFirstLetter,
  createElement,
  mainBox,
  showPages,
  selectPage,
  showPokeInfos,
  pokeBox,
} from "./domFunctions";

import { types, generations, pokesPerGen } from "./extras";
import { readTypes } from "./apiFunctions";

/**
 * Manipula a seleção de tipos na interface
 * @param {Event} event - Evento de clique
 */
const selectType = (event) => {
  if (!event.target.classList.contains("icon")) return;
  if (event.target.classList.contains("select-type"))
    return event.target.classList.remove("select-type");
  event.target.classList.add("select-type");
};

/**
 * Manipula a seleção de gerações na interface
 * @param {Event} event - Evento de clique
 */
const selectGen = (event) => {
  if (!event.target.classList.contains("gen-icon")) return;
  if (event.target.classList.contains("select-gen"))
    return event.target.classList.remove("select-gen");
  event.target.classList.add("select-gen");
};

/**
 * Cria os botões de filtro por tipo
 * @param {Array} arrayOfPokemons - Array com dados dos Pokémon
 */
export const createTypesSearch = (arrayOfPokemons) => {
  if (!searchType) return;

  types.forEach((type) => {
    const newType = document.createElement("div");
    newType.classList.add("tooltips");
    newType.innerHTML = `<img src="./images/types/${type}.svg" alt="Filtrar por tipo ${capitalizeFirstLetter(
      type
    )}" class="icon ${type}"></img>
		<span class="tooltiptext">${capitalizeFirstLetter(type)}</span>`;
    newType.addEventListener("click", selectType);
    newType.addEventListener("click", () => filterPokemon(arrayOfPokemons));
    searchType.appendChild(newType);
  });
};

/**
 * Cria os botões de filtro por geração
 * @param {Array} arrayOfPokemons - Array com dados dos Pokémon
 */
const createGenerationSearch = (arrayOfPokemons) => {
  if (!searchBox) return;

  generations.forEach((type) => {
    const newType = document.createElement("div");
    newType.classList.add("tooltips");
    newType.innerHTML = `<img src="./images/generation/${type}.png" alt="Filtrar por geração ${capitalizeFirstLetter(
      type
    )}" class="gen-icon ${type}"></img>
		<span class="tooltiptext">${capitalizeFirstLetter(type)}</span>`;
    newType.addEventListener("click", selectGen);
    newType.addEventListener("click", () => filterPokemon(arrayOfPokemons));
    searchBox.appendChild(newType);
  });
};

/**
 * Cria toda a área de busca e filtros
 * @param {Array} arrayOfPokemons - Array com dados dos Pokémon
 */
export const createSearchArea = (arrayOfPokemons) => {
  createTypesSearch(arrayOfPokemons);
  createGenerationSearch(arrayOfPokemons);
};

/**
 * Exibe mensagem de "não encontrado" e oculta paginação
 */
const filterNotFound = () => {
  const pokesElement = document.querySelector(".pokes");
  const notFoundElement = document.querySelector(".not-found");
  const paginationElement = document.querySelector(".pagination-button");

  if (pokesElement) pokesElement.innerHTML = "";
  if (notFoundElement) notFoundElement.style.display = "contents";
  if (paginationElement) paginationElement.style.display = "none";
};

/**
 * Oculta mensagem de "não encontrado" e exibe paginação
 */
const hideNotFound = () => {
  const notFoundElement = document.querySelector(".not-found");
  const paginationElement = document.querySelector(".pagination-button");

  if (notFoundElement) notFoundElement.style.display = "none";
  if (paginationElement) paginationElement.style.display = "flex";
};

/**
 * Obtém os filtros selecionados por classe CSS
 * @param {string} filterOption - Classe CSS dos filtros (padrão: '.select-type')
 * @returns {Array<string>} Array com os valores dos filtros selecionados
 */
const filterBy = (filterOption = ".select-type") => {
  const selectedFilter = document.querySelectorAll(filterOption);
  let filteredArray = [];
  selectedFilter.forEach(
    (filter) => (filteredArray = [...filteredArray, filter.classList[1]])
  );
  return filteredArray;
};

/**
 * Filtra Pokémon por geração
 * @param {Array} arrayOfPokemons - Array com dados dos Pokémon
 * @param {Array} filteredGen - Array com gerações selecionadas
 * @returns {Array} Array filtrado por geração
 */
const genFilter = (arrayOfPokemons, filteredGen) => {
  if (filteredGen.length === 0) return arrayOfPokemons;
  return arrayOfPokemons.filter(({ id }) => {
    let fromGen = false;
    filteredGen.forEach((gen) => {
      const { start, end } = pokesPerGen[gen];
      if (id >= start && id <= end) fromGen = true;
    });
    return fromGen;
  });
};

/**
 * Aplica todos os filtros na lista de Pokémon
 * @param {Array} arrayOfPokemons - Array com dados dos Pokémon
 * @returns {Array} Array filtrado
 */
const initialFilter = (arrayOfPokemons) => {
  if (!searchField) return arrayOfPokemons;

  const searchName = searchField.value.toLowerCase();
  const filteredTypes = filterBy(".select-type").toString();
  const filteredGen = filterBy(".select-gen");

  let pokesToShow = arrayOfPokemons.filter(({ name }) =>
    name.includes(searchName)
  );
  pokesToShow = genFilter(pokesToShow, filteredGen);

  if (filteredTypes.length !== 0) {
    pokesToShow = pokesToShow.filter(({ types }) => {
      const pokeTypes = readTypes(types);
      return (
        filteredTypes.includes(pokeTypes[0]) ||
        filteredTypes.includes(pokeTypes[1])
      );
    });
  }
  return pokesToShow;
};

/**
 * Filtra e exibe os Pokémon baseado nos critérios selecionados
 * @param {Array} arrayOfPokemons - Array com dados dos Pokémon
 */
const filterPokemon = (arrayOfPokemons) => {
  const filteredPokemonList = initialFilter(arrayOfPokemons);

  if (pokeBox) {
    pokeBox.style.display = "none";
  }

  if (filteredPokemonList.length === 0) return filterNotFound();

  hideNotFound();

  const maxPokeToShow =
    filteredPokemonList.length > 20 ? 20 : filteredPokemonList.length;
  const pokesElement = document.querySelector(".pokes");
  if (pokesElement) {
    pokesElement.innerHTML = "";
  }

  for (let index = 0; index < maxPokeToShow; index++) {
    const newBox = document.createElement("div");
    const { name, types, sprites, id } = filteredPokemonList[index];
    const pokemonBox = createElement(name, types, sprites, id);
    newBox.classList.add("poke-window");
    newBox.innerHTML = pokemonBox;
    newBox.addEventListener("click", () =>
      showPokeInfos(arrayOfPokemons[id - 1])
    );
    if (mainBox) {
      mainBox.appendChild(newBox);
    }
  }

  const totalPages = Math.ceil(filteredPokemonList.length / 20);
  showPages(1, totalPages, filteredPokemonList);
  selectPage(1);
};

/**
 * Limpa todos os filtros aplicados
 * @param {Array} arrayOfPokemons - Array com dados dos Pokémon
 */
const cleanFilter = (arrayOfPokemons) => {
  const types = document.querySelectorAll(".select-type");
  const gens = document.querySelectorAll(".select-gen");

  if (searchField) {
    searchField.value = "";
  }

  types.forEach((type) => type.classList.remove("select-type"));
  gens.forEach((type) => type.classList.remove("select-gen"));
  filterPokemon(arrayOfPokemons);
};

/**
 * Adiciona evento de clique ao botão limpar filtros
 * @param {Array} arrayOfPokemons - Array com dados dos Pokémon
 */
export const cleanFilterButton = (arrayOfPokemons) => {
  const button = document.querySelector(".clean-filter-button");
  if (button) {
    button.addEventListener("click", () => cleanFilter(arrayOfPokemons));
  }
};

/**
 * Adiciona evento de input ao campo de busca
 * @param {Array} arrayOfPokemons - Array com dados dos Pokémon
 */
export const searchText = (arrayOfPokemons) => {
  if (searchField) {
    searchField.addEventListener("input", () => filterPokemon(arrayOfPokemons));
  }
};
