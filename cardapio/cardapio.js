const containerProdutos = document.querySelector('#produtos');

async function carregarProdutos(){
    try{
        const resposta = await fetch("lanches.json");

        if (!resposta.ok) {
            throw new Error(`Não possivel carregar as infomrações. Erro: ${resposta.status}`);
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
            precoLanche.textContent = `R$ ${lanche.preco.toFixed(2)}`;

            const descricaoLanche = document.createElement('p');
            descricaoLanche.textContent = lanche.descricao;

            cardLanche.appendChild(imagemLanche);
            cardLanche.appendChild(nomeLanche);
            cardLanche.appendChild(precoLanche);
            cardLanche.appendChild(descricaoLanche);

            containerProdutos.appendChild(cardLanche);
        
        });

    }
        catch(erro){
            console.log("Erro:", erro);
            containerProdutos.textContent = "Erro ao carregar os produtos.";
    }
}

carregarProdutos();