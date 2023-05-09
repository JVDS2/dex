function capeOpen(){
  let cape = document.getElementById("cape");
  let extra = document.getElementById("extra-info");
  if(cape.classList.contains("opened")){
    playSound("closeAudio")
  }
  else{
    playSound("openAudio");
  }
  cape.classList.toggle("opened");
  extra.classList.toggle("opened");
}

function playSound(audioID){
  var sound = document.getElementById(audioID);
  sound.play();
}

function getTypeColor(pokeType){
  const pokemonColors = {
    "normal": {
      primary: "#A8A77A",
      highlight: "#f7f7e9"
    },
    "fire": {
      primary: "#EE8130",
      highlight: "#5e2d08"
    },
    "water": {
      primary: "#6390F0",
      highlight: "#ecf1fe"
    },
    "electric": {
      primary: "#F7D02C",
      highlight: "#5c5300"
    },
    "grass": {
      primary: "#7AC74C",
      highlight: "#edf6e4"
    },
    "ice": {
      primary: "#96D9D6",
      highlight: "#29706d"
    },
    "fighting": {
      primary: "#C22E28",
      highlight: "#ff9999"
    },
    "poison": {
      primary: "#A33EA1",
      highlight: "#e3c4e3"
    },
    "ground": {
      primary: "#E2BF65",
      highlight: "#705015"
    },
    "flying": {
      primary: "#A98FF3",
      highlight: "#433852"
    },
    "psychic": {
      primary: "#F95587",
      highlight: "#ffbdce"
    },
    "bug": {
      primary: "#A6B91A",
      highlight: "#3b3d0f"
    },
    "rock": {
      primary: "#B6A136",
      highlight: "#494213"
    },
    "ghost": {
      primary: "#735797",
      highlight: "#d4c9d4"
    },
    "dragon": {
      primary: "#6F35FC",
      highlight: "#c6b1fb"
    },
    "dark": {
      primary: "#705746",
      highlight: "#382b24"
    },
    "steel": {
      primary: "#B7B7CE",
      highlight: "#515161"
    },
    "fairy": {
      primary: "#D685AD",
      highlight: "#ff1a66"
    }
  };
  
  if(pokeType in pokemonColors){
    const primaryColor = pokemonColors[pokeType].primary;
    const highlightColor = pokemonColors[pokeType].highlight;
    return [primaryColor, highlightColor];
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
      let firstTypeID = document.getElementById("first-type");
      let secondTypeID = document.getElementById("second-type");
      let typeLen = data["types"].length;

      let firstType = data["types"]["0"]["type"]["name"];
      
      firstTypeID.innerHTML = firstType;
      firstTypeID.style.background=getTypeColor(firstType)[0];
      firstTypeID.style.color=getTypeColor(firstType)[1];
    

      if(typeLen >= 2){
          let secondType = data["types"]["1"]["type"]["name"];
          secondTypeID.style.display="block";
          secondTypeID.innerHTML = secondType;
          secondTypeID.style.background = getTypeColor(secondType)[0];
          secondTypeID.style.color = getTypeColor(secondType)[1];
      }
      else{
          document.getElementById("second-type").style.display="none";
      }

      let image = data["sprites"]["other"]["home"]["front_default"];
      // document.getElementById("image").src = image;
      let bgImage = `url(${image})`;
      document.getElementById("image").style.backgroundImage=bgImage;

      document.getElementById("hp").innerHTML=data["stats"]["0"]["base_stat"];
      document.getElementById("atk").innerHTML=data["stats"]["1"]["base_stat"];
      document.getElementById("defense").innerHTML=data["stats"]["2"]["base_stat"];
      document.getElementById("spatk").innerHTML=data["stats"]["3"]["base_stat"];
      document.getElementById("spdef").innerHTML=data["stats"]["4"]["base_stat"];
      document.getElementById("speed").innerHTML=data["stats"]["5"]["base_stat"];

    })
    .catch(error => {
      console.error(error);
      document.getElementById("name").innerHTML="ERRO";
    });
  document.getElementById("input").value="";
  playSound("foundedAudio");
      
}
