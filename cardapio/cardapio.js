const containerProdutos = document.querySelector('#produtos');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuExpand = document.querySelector('#menuExpand');
const menuCard = document.querySelector('#menuCard');
const overlay = document.querySelector('#overlay');
const headerNav = document.querySelector('header nav');
const fecharMenuBtn = document.querySelector('.fechar-menu');

// Guarda os dados carregados da API/JSON para evitar múltiplos fetches
let cardapioDados = null;

// Cria o elemento HTML de um item (reaproveitado para qualquer categoria)
function criarCardProduto(item, tipoClasse) {
    const card = document.createElement('div');
    card.classList.add(tipoClasse);

    const imagem = document.createElement('img');
    imagem.src = item.imagem;
    imagem.alt = item.nome;

    const nome = document.createElement('h2');
    nome.textContent = item.nome;

    const preco = document.createElement('p');
    preco.classList.add('preco');
    preco.textContent = `R$ ${item.preco.toFixed(2).replace('.', ',')}`;

    const descricao = document.createElement('p');
    descricao.classList.add('descricao');
    descricao.textContent = item.descricao;

    card.appendChild(imagem);
    card.appendChild(nome);
    card.appendChild(preco);
    card.appendChild(descricao);

    return card;
}

// Filtra e exibe os itens na tela
function renderizarCategoria(categoria) {
    if (!cardapioDados) return;

    // Limpa a tela antes de renderizar os novos itens
    containerProdutos.innerHTML = '';

    const itensParaExibir = [];

    // Normaliza o nome da categoria
    const cat = categoria.trim().toLowerCase();

    if (cat === 'todos') {
        if (cardapioDados.lanches) {
            cardapioDados.lanches.forEach(l => itensParaExibir.push({ ...l, classe: 'lanche' }));
        }
        if (cardapioDados.bebidas) {
            cardapioDados.bebidas.forEach(b => itensParaExibir.push({ ...b, classe: 'bebida' }));
        }
    } else if (cat === 'lanches') {
        // Exibe os lanches ao clicar em Combos
        if (cardapioDados.lanches) {
            cardapioDados.lanches.forEach(l => itensParaExibir.push({ ...l, classe: 'lanche' }));
        }
    } else if (cat === 'bebidas') {
        if (cardapioDados.bebidas) {
            cardapioDados.bebidas.forEach(b => itensParaExibir.push({ ...b, classe: 'bebida' }));
        }
    }

    // Se houver outras categorias no JSON no futuro (ex: porções, sobremesas):
    else if (cardapioDados[cat]) {
        cardapioDados[cat].forEach(item => itensParaExibir.push({ ...item, classe: cat }));
    }

    // Monta os cards na tela
    if (itensParaExibir.length === 0) {
        containerProdutos.innerHTML = '<p class="sem-produtos">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    itensParaExibir.forEach(item => {
        const card = criarCardProduto(item, item.classe);
        containerProdutos.appendChild(card);
    });
}

// Carrega os dados do JSON inicial
async function carregarDadosIniciais() {
    try {
        const resposta = await fetch("lanches.json");

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        cardapioDados = await resposta.json();
        
        // Exibe todos por padrão ao carregar a página
        renderizarCategoria('todos');
    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        containerProdutos.innerHTML = "<p>Erro ao carregar os produtos.</p>";
    }
}

// ===== MENU SUPERIOR (hambúrguer) =====
menuToggle.addEventListener('click', () => {
    const estaAberto = navLinks.classList.toggle('aberto');
    headerNav.classList.toggle('menu-aberto');
    menuToggle.setAttribute('aria-expanded', estaAberto);
});

// ===== MENU DE CATEGORIAS (drawer lateral) =====
menuExpand.addEventListener('click', () => {
    menuCard.classList.add('aberto');
    overlay.classList.add('visivel');
    document.body.style.overflow = 'hidden';
});

function fecharMenuLateral() {
    menuCard.classList.remove('aberto');
    overlay.classList.remove('visivel');
    document.body.style.overflow = '';
}

fecharMenuBtn.addEventListener('click', fecharMenuLateral);
overlay.addEventListener('click', fecharMenuLateral);

// ===== CLIQUE NAS CATEGORIAS =====
document.querySelectorAll('.selectionMenu:not(.fechar-menu)').forEach(item => {
    item.addEventListener('click', () => {
        // Atualiza a classe ativa
        document.querySelectorAll('.selectionMenu').forEach(i => i.classList.remove('ativo'));
        item.classList.add('ativo');

        // Pega o texto da categoria clicada e renderiza os produtos
        const categoriaNome = item.textContent.trim();
        renderizarCategoria(categoriaNome);

        // Fecha o menu lateral no mobile
        if (window.innerWidth <= 700) {
            fecharMenuLateral();
        }
    });
});

// Inicialização
carregarDadosIniciais();