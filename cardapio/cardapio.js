const containerProdutos = document.querySelector('#produtos');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuExpand = document.querySelector('#menuExpand');
const menuCard = document.querySelector('#menuCard');
const overlay = document.querySelector('#overlay');
const headerNav = document.querySelector('header nav');
const fecharMenuBtn = document.querySelector('.fechar-menu');

// ===== CARREGAR PRODUTOS =====
async function carregarProdutos(){
    try{
        const resposta = await fetch("lanches.json");

        if (!resposta.ok) {
            throw new Error(`Não possível carregar as informações. Erro: ${resposta.status}`);
        }

        const dados = await resposta.json();

        dados.lanches.forEach(lanche => {
            const cardLanche = document.createElement('div');
            cardLanche.classList.add('lanche');

            const nomeLanche = document.createElement('h2');
            nomeLanche.textContent = lanche.nome;

            const imagemLanche = document.createElement('img');
            imagemLanche.src = lanche.imagem;
            imagemLanche.alt = lanche.nome;

            const precoLanche = document.createElement('p');
            precoLanche.classList.add('preco');
            precoLanche.textContent = `R$ ${lanche.preco.toFixed(2).replace('.', ',')}`;

            const descricaoLanche = document.createElement('p');
            descricaoLanche.classList.add('descricao');
            descricaoLanche.textContent = lanche.descricao;

            cardLanche.appendChild(imagemLanche);
            cardLanche.appendChild(nomeLanche);
            cardLanche.appendChild(precoLanche);
            cardLanche.appendChild(descricaoLanche);

            containerProdutos.appendChild(cardLanche);
        });
    } catch(erro){
        console.log("Erro:", erro);
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
    
    // Impede rolagem da página quando o menu está aberto
    document.body.style.overflow = 'hidden';
});

// Fecha o drawer ao clicar no X ou no overlay
function fecharMenuLateral() {
    menuCard.classList.remove('aberto');
    overlay.classList.remove('visivel');
    document.body.style.overflow = '';
}

fecharMenuBtn.addEventListener('click', fecharMenuLateral);
overlay.addEventListener('click', fecharMenuLateral);

// Fecha ao clicar em uma categoria também (opcional, melhora UX)
document.querySelectorAll('.selectionMenu:not(.fechar-menu)').forEach(item => {
    item.addEventListener('click', () => {
        // Remove ativo de todos
        document.querySelectorAll('.selectionMenu').forEach(i => i.classList.remove('ativo'));
        // Adiciona no clicado
        item.classList.add('ativo');
        
        // Fecha o menu no mobile
        if (window.innerWidth <= 700) {
            fecharMenuLateral();
        }
    });
});

// Inicializa
carregarProdutos();