const pokemonName = document.querySelector('.name');
const pokemonNumber = document.querySelector('.number');
const pokemonImage = document.querySelector('.pokemon');
const btnPrev= document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const form = document.querySelector('form');
const input = document.querySelector('input');
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const divAuxilo = document.querySelector('.divAuxilo');

let pokemonInTela = 0;
let pokemon01recomendacao = "";
let pokemon02recomendacao = "";
listaPokemon = [];

const listarPokemon = async () => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=649`)
    const data = await APIresponse.json();
    for(let i = 0; i < data.results.length; i++){
        listaPokemon.push(data.results[i].name);
    }
}

const fetchPokemon = async (pokemon) => {
    if (!isNaN(pokemon)) {
        pokemon = parseInt(pokemon, 10).toString();
    }
    input.value = "";
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(APIresponse.ok){
        const data = await APIresponse.json();
        return data;
    } else {
        pokemonName.innerHTML = "not found";
        pokemonNumber.innerHTML = "";
        pokemonInTela = 0;
        pokemonImage.src = "images/pngwing.com.png";
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonInTela = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPokemon(input.value.toLowerCase());
    divAuxilo.style.display = "none";
})

btnPrev.addEventListener('click', () => {
    if(pokemonInTela <= 1){
        btnPrev.disabled = true;
        return
    }
    btnNext.disabled = false;
    btnPrev.disabled = false;
    renderPokemon(pokemonInTela-1);
    input.value = "";
    divAuxilo.style.display = "none";
})

btnNext.addEventListener('click', () => {
    if(pokemonInTela > 648){
        btnNext.disabled = true;
        return
    }
    btnNext.disabled = false;
    btnPrev.disabled = false;
    renderPokemon(pokemonInTela+1);
    input.value = "";
    divAuxilo.style.display = "none";
});

input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') return;
    let dadosFiltrados = listaPokemon.filter(elemento => elemento.includes(input.value));
    if(dadosFiltrados.length == 0){
        divAuxilo.style.display = "none";
    }else{
        divAuxilo.style.display = "block";
        btn2.style.display = "block";
        btn1.innerHTML = dadosFiltrados[0];
        btn2.innerHTML = dadosFiltrados[1];
        pokemon01recomendacao = dadosFiltrados[0];
        pokemon02recomendacao = dadosFiltrados[1];
        if(dadosFiltrados.length == 1){
            btn2.style.display = "none";
        }
    }
});

btn1.addEventListener('click', () => {
    renderPokemon(pokemon01recomendacao);
    divAuxilo.style.display = "none";
});

btn2.addEventListener('click', () => {
    renderPokemon(pokemon02recomendacao);
    divAuxilo.style.display = "none";
});

renderPokemon(Math.floor(Math.random()*649)+1);
listarPokemon();
