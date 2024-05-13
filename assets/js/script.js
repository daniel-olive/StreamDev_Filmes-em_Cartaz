const baseURL = "https://www.omdbapi.com/?i=";
const chaveKey = "&apikey=f8dbfaa";
let container = document.querySelector('.corpo');
let ul = document.querySelector('#areaFilmes');
let li = document.querySelector('li');
let load = document.querySelector('.c-loader');
let qtFilmes = document.getElementById('qtFilmes');

const requestFilmes = async () => {
    await dataFilms.map((films) => {
        return fetch(`${baseURL}${films.id}${chaveKey}`)
            .then((response) => response.json())
            .then(json => {
                dataFilms.length > 0 ? qtFilmes.innerHTML = `Total de filmes: ${dataFilms.length}` : 'Total de filmes: 0'

                const imagem = document.createElement('img'); //Cria a tag imagem.
                const filmElement = document.createElement('li'); //Cria a tag li.
                const p = document.createElement('p'); //Cria a tag p.

                imagem.src = json.Poster; //Define a URL em src da tag imagem.
                p.textContent = json.Title; //Define o texto dentro da teag p.

                filmElement.appendChild(p) //Adiciona a tap p com Titulo Dentro do li.
                ul.appendChild(filmElement); //Joguei o li dentro do ul.
                filmElement.appendChild(imagem); //adiciona a img dentro do li.

                imagem.classList.add('img-filmes');
                imagem.style.height = '270px'

                dataFilms.length > 0 ? load.style.display = 'none' : load.style.display = 'block';

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
                                card.style.display = 'flex';
                            }
                        }
                    } else {
                        for (let card of cards) {
                            card.style.display = 'flex';
                        }
                    }
                }

            })
    })
}

requestFilmes(); 