function capeOpen(){
    let cape = document.getElementById("cape");
    let button = document.getElementById("open");
    cape.classList.toggle("opened");
    if(cape.classList.contains("opened")){
        button.innerHTML="↓"
    }
    else{
        button.innerHTML="↑"
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
        if(typeLen >= 2){
            let secondType = data["types"]["1"]["type"]["name"];
            document.getElementById("second-type").style.display="block";
            document.getElementById("second-type").innerHTML = secondType;
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
