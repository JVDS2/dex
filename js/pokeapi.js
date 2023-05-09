function capeOpen(){
    let cape = document.getElementById("cape");
    let button = document.getElementById("open");
    cape.classList.toggle("opened");
}

function getTypeColor(pokeType){
  const pokemonColors = {
    "normal": "#A8A77A",
    "fire": "#EE8130",
    "water": "#6390F0",
    "electric": "#F7D02C",
    "grass": "#7AC74C",
    "ice": "#96D9D6",
    "fighting": "#C22E28",
    "poison": "#A33EA1",
    "ground": "#E2BF65",
    "flying": "#A98FF3",
    "psychic": "#F95587",
    "bug": "#A6B91A",
    "rock": "#B6A136",
    "ghost": "#735797",
    "dragon": "#6F35FC",
    "dark": "#705746",
    "steel": "#B7B7CE",
    "fairy": "#D685AD"
  };
  if(pokeType in pokemonColors){
    const pokeColor = pokemonColors[pokeType];
    return pokeColor;
  }
}


function search(){
    const input = document.getElementById("input").value;
    let url = `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`
    
    fetch(url)
      .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erro ao fazer requisição');
      })
      .then(data => {
        let pokemonName = data.name;
        pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase();
    
        document.getElementById("name").innerHTML = pokemonName;
        
        let typeLen = data["types"].length;
        let firstType = data["types"]["0"]["type"]["name"];
        document.getElementById("first-type").innerHTML = firstType;
        document.getElementById("first-type").style.background=getTypeColor(firstType);

        if(typeLen >= 2){
            let secondType = data["types"]["1"]["type"]["name"];
            document.getElementById("second-type").style.display="block";
            document.getElementById("second-type").innerHTML = secondType;
            document.getElementById("second-type").style.background = getTypeColor(secondType)
        }
        else{
            document.getElementById("second-type").style.display="none";
        }

        let image = data["sprites"]["other"]["home"]["front_default"];
        // document.getElementById("image").src = image;
        let bgImage = `url(${image})`;
        document.getElementById("image").style.backgroundImage=bgImage;

      })
      .catch(error => {
        document.getElementById("name").innerHTML="ERRO";
      });
    document.getElementById("input").value="";
        
}
