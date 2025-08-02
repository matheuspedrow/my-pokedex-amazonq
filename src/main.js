// Importação de estilos
import '../styles/main.css';
import '../styles/types.css';
import '../styles/loading.css';

// Importação de funções da API
import { loadPokemons, turnOnOptions } from "./apiFunctions";

// Importação de funções do DOM
import {
  showPages,
  createPokemonBox,
  selectPage,
} from "./domFunctions";

// Importação de funções de busca
import { 
	searchText,
	createSearchArea,
	cleanFilterButton,
} from "./searchFunctions";

// Configurações da aplicação
const totalPokemonsToShow = 898;
let totalPages = Math.ceil(totalPokemonsToShow / 20);
const currentPage = 1;

// URL base da API do Pokémon
const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

/**
 * Função principal que inicializa a aplicação
 * Carrega os dados dos Pokémon e configura a interface
 */
const initializeApp = async () => {
	try {
		// Carrega todos os Pokémon da API
		const pokemonList = await loadPokemons(totalPokemonsToShow);
		
		// Ativa as opções de interface
		turnOnOptions();
		
		// Cria a área de busca e filtros
		createSearchArea(pokemonList);
		
		// Cria os cards dos Pokémon
		createPokemonBox(pokemonList);
		
		// Exibe a paginação
		showPages(currentPage, totalPages, pokemonList);
		
		// Configura a busca por texto
		searchText(pokemonList);
		
		// Seleciona a primeira página
		selectPage(currentPage);
		
		// Configura o botão de limpar filtros
		cleanFilterButton(pokemonList);
		
		console.log('Pokédex carregada com sucesso!');
	} catch (error) {
		console.error('Erro ao inicializar a aplicação:', error);
		// Exibe mensagem de erro para o usuário
		document.querySelector('.loading').innerHTML = 
			'<h1>Erro ao carregar os dados. Tente recarregar a página.</h1>';
	}
};

// Inicializa a aplicação quando a página carregar
window.onload = initializeApp;
