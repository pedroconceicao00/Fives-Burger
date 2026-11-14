const containerProdutos = document.querySelector('#produtos');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuExpand = document.querySelector('#menuExpand');
const menuCard = document.querySelector('#menuCard');
const overlay = document.querySelector('#overlay');
const headerNav = document.querySelector('header nav');
const fecharMenuBtn = document.querySelector('.fechar-menu');
let cardapioDados = null;
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
function renderizarCategoria(categoria) {
    if (!cardapioDados) return;
    containerProdutos.innerHTML = '';

    const itensParaExibir = [];
    const cat = categoria.trim().toLowerCase();

    if (cat === 'todos') {
        if (cardapioDados.lanches) {
            cardapioDados.lanches.forEach(l => itensParaExibir.push({ ...l, classe: 'lanche' }));
        }
        if (cardapioDados.bebidas) {
            cardapioDados.bebidas.forEach(b => itensParaExibir.push({ ...b, classe: 'lanche' }));
        }
        if (cardapioDados.combos) {
            cardapioDados.combos.forEach(c => itensParaExibir.push({ ...c, classe: 'lanche' }));
        }
        if (cardapioDados.sobremesa) {
            cardapioDados.sobremesa.forEach(s => itensParaExibir.push({ ...s, classe: 'lanche' }));
        }
    } else if (cat === 'lanches') {
        if (cardapioDados.lanches) {
            cardapioDados.lanches.forEach(l => itensParaExibir.push({ ...l, classe: 'lanche' }));
        }
    } else if (cat === 'bebidas') {
        if (cardapioDados.bebidas) {
            cardapioDados.bebidas.forEach(b => itensParaExibir.push({ ...b, classe: 'lanche' }));
        }
    }
    else if(cat === 'combos'){
        if (cardapioDados.combos) {
            cardapioDados.combos.forEach(c => itensParaExibir.push({ ...c, classe: 'lanche' }));
        }
    }
    else if(cat === 'sobremesa'){
        if (cardapioDados.sobremesa) {
            cardapioDados.sobremesa.forEach(s => itensParaExibir.push({ ...s, classe: 'lanche' }));
        }
    }
    else if (cardapioDados[cat]) {
        cardapioDados[cat].forEach(item => itensParaExibir.push({ ...item, classe: cat }));
    }
    if (itensParaExibir.length === 0) {
        containerProdutos.innerHTML = '<p class="sem-produtos">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    itensParaExibir.forEach(item => {
        const card = criarCardProduto(item, item.classe);
        containerProdutos.appendChild(card);
    });
}
async function carregarDadosIniciais() {
    try {
        const resposta = await fetch("lanches.json");

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        cardapioDados = await resposta.json();
        renderizarCategoria('todos');
    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        containerProdutos.innerHTML = "<p>Erro ao carregar os produtos.</p>";
    }
}
menuToggle.addEventListener('click', () => {
    const estaAberto = navLinks.classList.toggle('aberto');
    headerNav.classList.toggle('menu-aberto');
    menuToggle.setAttribute('aria-expanded', estaAberto);
});
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
document.querySelectorAll('.selectionMenu:not(.fechar-menu)').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.selectionMenu').forEach(i => i.classList.remove('ativo'));
        item.classList.add('ativo');
        const categoriaNome = item.textContent.trim();
        renderizarCategoria(categoriaNome);
        if (window.innerWidth <= 700) {
            fecharMenuLateral();
        }
    });
});
carregarDadosIniciais();