// Seleciona a área onde a lista de filmes será exibida no HTML
const areaLista = document.querySelector('#areaFilmes');
const container = document.querySelector('.container');

// Seleciona o elemento de load na página HTML
let load = document.querySelector('.c-loader');

// Função assíncrona para fazer a requisição dos filmes da API
async function requestFilmes() {
    // Faz uma requisição para a API de filmes
    let response = await fetch('https://api.b7web.com.br/cinema/');
    // Converte a resposta para JSON
    let json = await response.json();

    // Itera sobre cada filme retornado pela API
    json.forEach(filme => {
        // Cria elementos HTML para exibir as informações do filme
        const imagem = document.createElement('img');
        const li = document.createElement('li');
        const p = document.createElement('p');
        imagem.classList.add('img-filmes');

        // Define a altura da imagem dos filmes
        imagem.style.height = '270px';

        // Define o título do filme no parágrafo criado
        p.textContent = filme.titulo;
        // Define a URL da imagem do filme
        imagem.src = filme.avatar;

        // Adiciona os elementos criados à área de lista no HTML
        areaLista.append(li);
        li.append(imagem);
        li.append(p);

        // Exibe ou esconde o elemento de load com base na quantidade de filmes carregados
        json.length > 0 ? load.style.display = 'none' : load.style.display = 'block';
        json.length > 0 ? container.style.opacity = '1' : container.style.opacity = '0';
    });

    // Seleciona o elemento de filtro por título de filme
    const filterElement = document.querySelector('#pesquisa');
    // Seleciona todos os cards de filmes (elementos li)
    const cards = document.querySelectorAll('li');
    // Adiciona um evento de input ao campo de filtro
    filterElement.addEventListener('input', filt);

    // Função para filtrar os filmes conforme o texto digitado no campo de filtro
    function filt() {
        if (filterElement.value !== '') {
            for (let card of cards) {
                let title = card.querySelector('p');
                title = title.textContent.toLowerCase();
                let filterText = filterElement.value.toLowerCase();
                if (!title.includes(filterText)) {
                    card.style.display = 'none';
                } else {
                    card.style.display = 'block';
                }
            }
        } else {
            for (let card of cards) {
                card.style.display = 'block';
            }
        }
    }

    // Seleciona o elemento que exibirá a quantidade total de filmes
    let quantFilmes = document.querySelector('.qtFilmesTitulo');
    // Obtém o número total de filmes na lista
    let lengthFilmes = cards.length;
    // Define o conteúdo HTML para exibir a quantidade total de filmes
    quantFilmes.innerHTML = `${'Total de filmes:'} ${lengthFilmes}`;

    // Exibe ou esconde o elemento de carga com base na quantidade de filmes carregados
    // NOTE: Comentado provavelmente por redundância ou não ser a lógica desejada
    // lengthFilmes = 0 ? load.style.display = 'block' : load.style.display = 'none';
}

// Chama a função para buscar os filmes e trata qualquer erro que possa ocorrer
requestFilmes().catch(erro => {
    console.log('Nenhum filme encontrado', erro);
});
