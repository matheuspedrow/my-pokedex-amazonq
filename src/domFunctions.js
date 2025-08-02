import { readTypes } from "./apiFunctions";

// Elementos DOM principais
export const mainBox = document.querySelector(".pokes");
export const pokeBox = document.querySelector(".selected-pokemon");

/**
 * Capitaliza a primeira letra de uma string
 * @param {string} string - String a ser capitalizada
 * @returns {string} String com primeira letra maiúscula
 */
export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const paginationDiv = document.querySelector(".pagination-button");

/**
 * Marca uma página como selecionada na paginação
 * @param {number} number - Número da página a ser selecionada
 */
export const selectPage = (number) => {
  const button = document.querySelector(`.button-${number}`);
  if (button) {
    button.classList.add("page-selected");
  }
};

/**
 * Define o range de Pokémon para uma página específica
 * @param {number} currentPage - Página atual
 * @returns {Object} Objeto com min e max do range
 */
const definePokemonRange = (currentPage) => {
  const limitItem = 20;
  if (currentPage === 1) return { min: 0, max: limitItem };
  return {
    min: currentPage * limitItem - limitItem,
    max: currentPage * limitItem,
  };
};

/**
 * Cria HTML para os ícones de tipos do Pokémon
 * @param {Array} types - Array de tipos do Pokémon
 * @returns {string} HTML dos ícones de tipos
 */
const createImages = (types) => {
  const pokeTypes = readTypes(types);

  if (pokeTypes.length === 1)
    return `<img src="./images/types/${pokeTypes}.svg" alt="Tipo ${pokeTypes}" class="icon ${pokeTypes}"></img>`;

  return `<img src="./images/types/${pokeTypes[0]}.svg" alt="Tipo ${pokeTypes[0]}" class="icon ${pokeTypes[0]}"></img>
					<img src="./images/types/${pokeTypes[1]}.svg" alt="Tipo ${pokeTypes[1]}" class="icon ${pokeTypes[1]}"></img>`;
};

/**
 * Cria o HTML de um card de Pokémon
 * @param {string} name - Nome do Pokémon
 * @param {Array} types - Tipos do Pokémon
 * @param {Object} sprites - Sprites do Pokémon
 * @param {number} index - ID do Pokémon
 * @returns {string} HTML do card do Pokémon
 */
export const createElement = (name, types, sprites, index) => {
  const { front_default } = sprites;

  return `<div class="poke-window">
	<h1>#${index} ${capitalizeFirstLetter(name)}</h1>
	<img src="${front_default}" alt="Imagem do ${capitalizeFirstLetter(
    name
  )}" class="poke-image">
	<div class="poke-types">
		${createImages(types)}
	</div>
</div>`;
};

/**
 * Limpa o conteúdo da área de Pokémon
 */
const resetPokemonBox = () => {
  if (mainBox) {
    mainBox.innerHTML = "";
  }
};

/**
 * Exibe informações detalhadas de um Pokémon selecionado
 * @param {Object} pokemon - Objeto com dados do Pokémon
 * @param {number} pokemon.id - ID do Pokémon
 * @param {string} pokemon.name - Nome do Pokémon
 * @param {Array} pokemon.types - Tipos do Pokémon
 * @param {Array} pokemon.stats - Estatísticas do Pokémon
 */
export const showPokeInfos = ({ id, name, types, stats }) => {
  if (!pokeBox) return;

  const pokemonInfoBox = `<h3>#${id} ${capitalizeFirstLetter(name)}</h3>
		<img class="poke-image-selected" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="Imagem detalhada do ${capitalizeFirstLetter(
    name
  )}">
		<div class="type-show">
			${createImages(types)}
		</div>
		<div class ="status">
			<p><span>HP</span> <span>${stats[0].base_stat}</span></p>
			<p><span>Attack</span><span>${stats[1].base_stat}</span></p>
			<p><span>Defense</span><span>${stats[2].base_stat}</span></p>
			<p><span>S.Attack</span><span>${stats[3].base_stat}</span></p>
			<p><span>S.Defense</span><span>${stats[4].base_stat}</span></p>
			<p><span>Speed</span><span>${stats[5].base_stat}</span></p>
		</div>`;

  const newPokemonInfoBox = document.createElement("div");
  newPokemonInfoBox.innerHTML = pokemonInfoBox;
  pokeBox.innerHTML = "";
  pokeBox.style.display = "flex";
  pokeBox.appendChild(newPokemonInfoBox);
};

/**
 * Cria e exibe os cards de Pokémon na interface
 * @param {Array} arrayOfPokemons - Array com dados dos Pokémon
 * @param {number} min - Índice mínimo (padrão: 0)
 * @param {number} max - Índice máximo (padrão: 20)
 */
export const createPokemonBox = (arrayOfPokemons, min = 0, max = 20) => {
  if (!mainBox) return;

  resetPokemonBox();
  for (let index = min; index < max; index++) {
    if (!arrayOfPokemons[index]) break;

    const { name, types, sprites, id } = arrayOfPokemons[index];
    const newBox = document.createElement("div");
    const pokemonBox = createElement(name, types, sprites, id);
    newBox.classList.add("poke-window");
    newBox.innerHTML = pokemonBox;
    newBox.addEventListener("click", () =>
      showPokeInfos(arrayOfPokemons[index])
    );
    mainBox.appendChild(newBox);
  }
};

/**
 * Define o range de páginas a serem exibidas na paginação
 * @param {number} currentPage - Página atual
 * @param {number} totalPages - Total de páginas
 * @returns {Object} Objeto com min e max do range de páginas
 */
const definePageRange = (currentPage, totalPages) => {
  if (totalPages > 8) {
    if (currentPage > 4 && currentPage < totalPages - 4)
      return { min: currentPage - 4, max: currentPage + 4 };
    else if (currentPage >= totalPages - 4)
      return { min: totalPages - 9, max: totalPages };
    if (totalPages < 9) return { min: 1, max: totalPages };
    return { min: 1, max: 9 };
  }
  if (totalPages === 0) return { min: 1, max: 1 };
  return { min: 1, max: totalPages };
};

/**
 * Atualiza a interface quando uma página é selecionada
 * @param {Array} pokeList - Lista de Pokémon
 * @param {number} min - Índice mínimo
 * @param {number} max - Índice máximo
 * @param {number} buttonValue - Valor do botão clicado
 * @param {number} totalPages - Total de páginas
 */
const buttonUpdate = (pokeList, min, max, buttonValue, totalPages) => {
  createPokemonBox(pokeList, min, max);
  showPages(buttonValue, totalPages, pokeList);
  selectPage(buttonValue);
};

/**
 * Cria eventos de clique para os botões de paginação
 * @param {Array} pokeList - Lista de Pokémon
 * @param {number} totalPages - Total de páginas
 */
const createShowPageEvent = (pokeList, totalPages) => {
  const totalButtons = document.querySelectorAll(".page-button");
  totalButtons.forEach((button) => {
    const buttonValue = parseInt(button.innerText);
    const { min, max } = definePokemonRange(buttonValue);
    button.addEventListener("click", () =>
      buttonUpdate(pokeList, min, max, buttonValue, totalPages)
    );
  });
};

/**
 * Cria e exibe os botões de paginação
 * @param {number} currentPage - Página atual
 * @param {number} totalPages - Total de páginas
 * @param {Array} pokeList - Lista de Pokémon
 */
export const showPages = (currentPage, totalPages, pokeList) => {
  if (!paginationDiv) return;

  const { min, max } = definePageRange(currentPage, totalPages);
  paginationDiv.innerHTML = "";
  for (let pageIndex = min; pageIndex <= max; pageIndex++) {
    const divButton = document.createElement("div");
    divButton.innerHTML = `<button type="button" class="btn btn-primary page-button button-${pageIndex}">
				<i class="fas fa-search"><span>${pageIndex}</span></i>
			</button>`;
    paginationDiv.appendChild(divButton);
  }
  createShowPageEvent(pokeList, totalPages);
};
