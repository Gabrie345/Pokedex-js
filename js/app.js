const pokemonName = document.querySelector('.name');
const pokemonNumber = document.querySelector('.number');
const pokemonImage = document.querySelector('.pokemon');
const btnPrev= document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const form = document.querySelector('form');
const input = document.querySelector('input');
let pokemonInTela = 0;

const fetchPokemon = async (pokemon) => {
    if (!isNaN(pokemon)) {
        pokemon = parseInt(pokemon, 10).toString();
    }
    input.value = "";
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(APIresponse.ok){
        const data = await APIresponse.json();
        console.log(data);
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
    console.log(input.value);
    renderPokemon(input.value.toLowerCase());
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
});

renderPokemon(Math.floor(Math.random()*649)+1);
