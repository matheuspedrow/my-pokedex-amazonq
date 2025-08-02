# 🎮 Pokédex Interativa

Uma aplicação web moderna e responsiva que permite explorar e buscar Pokémon de todas as gerações disponíveis na API oficial do Pokémon.

## 📋 Descrição do Projeto

Esta Pokédex oferece uma experiência completa de exploração de Pokémon com:

- **Catálogo Completo**: Acesso a todos os 898 Pokémon das 8 gerações
- **Busca Inteligente**: Pesquisa por nome com filtros em tempo real
- **Filtros Avançados**: Filtragem por tipo e geração
- **Detalhes Detalhados**: Visualização completa de estatísticas e informações
- **Interface Responsiva**: Design adaptável para diferentes dispositivos
- **Paginação**: Navegação eficiente através das páginas

## 🏗️ Arquitetura do Projeto

### Estrutura de Arquivos

```
pokedex/
├── index.html              # Página principal
├── src/
│   ├── main.js            # Ponto de entrada da aplicação
│   ├── apiFunctions.js    # Funções de comunicação com a API
│   ├── domFunctions.js    # Manipulação do DOM e criação de elementos
│   ├── searchFunctions.js # Lógica de busca e filtros
│   └── extras.js          # Dados estáticos (tipos, gerações)
├── styles/
│   ├── main.css           # Estilos principais
│   ├── types.css          # Estilos específicos para tipos
│   └── loading.css        # Animações de carregamento
└── images/                # Recursos visuais
    ├── types/             # Ícones dos tipos Pokémon (18 tipos)
    ├── generation/        # Ícones das gerações (8 gerações)
    ├── error/             # Imagens de erro e fallback
    ├── pokeball-icon.png  # Ícone principal da aplicação
    └── pokedex-icon.png   # Ícone da Pokédex
```

### Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização com Bootstrap 5 e CSS customizado
- **JavaScript ES6+**: Lógica da aplicação com módulos
- **PokeAPI**: API oficial do Pokémon para dados
- **Vite**: Build tool para desenvolvimento

### Padrões de Desenvolvimento

- **Modularização**: Código organizado em módulos específicos
- **Separação de Responsabilidades**: Cada arquivo tem uma função específica
- **Programação Funcional**: Uso de funções puras e imutabilidade
- **Event-Driven**: Interface baseada em eventos do usuário

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**

   ```bash
   https://github.com/matheuspedrow/my-pokedex-amazonq.git
   cd pokedex-amazonq
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento**

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - O navegador abrirá automaticamente em `http://localhost:5173`
   - Ou acesse manualmente a URL fornecida no terminal

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a versão de produção

## 🎯 Funcionalidades

### Busca e Filtros

- **Busca por Nome**: Digite o nome do Pokémon para encontrar rapidamente
- **Filtro por Tipo**: Selecione um ou mais tipos para filtrar
- **Filtro por Geração**: Escolha uma geração específica
- **Limpar Filtros**: Botão para resetar todos os filtros

### Visualização

- **Grid de Pokémon**: Visualização em cards com informações básicas
- **Detalhes Completos**: Clique em um Pokémon para ver estatísticas detalhadas
- **Paginação**: Navegue entre as páginas de resultados

### Interface

- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Animações**: Transições suaves e feedback visual
- **Loading States**: Indicadores de carregamento durante requisições

## 🔧 Melhorias Implementadas

### Código

- **Documentação**: Comentários explicativos em funções complexas
- **Tratamento de Erros**: Melhor handling de falhas na API
- **Performance**: Otimizações na renderização e busca
- **Acessibilidade**: Melhorias na navegação por teclado

### Interface

- **UX Aprimorada**: Feedback visual mais claro
- **Responsividade**: Melhor adaptação mobile
- **Performance**: Carregamento mais rápido

## 👨‍💻 Autor

**Matheus Pedrow** - Desenvolvedor Full Stack
- GitHub: [@matheuspedrow](https://github.com/matheuspedrow)
- Projeto desenvolvido individualmente com foco em aprendizado e demonstração de habilidades

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- **PokeAPI**: Por fornecer dados completos dos Pokémon
- **Bootstrap**: Framework CSS para o design responsivo
- **Google Fonts**: Fonte VT323 para o estilo retrô

---

**Desenvolvido com ❤️ usando Amazon Q**

Este projeto foi desenvolvido com o auxílio do Amazon Q Assistant, uma ferramenta de IA que ajudou na estruturação, desenvolvimento e otimização do código.
