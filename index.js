const input = document.getElementById("inputSearch");
const button = document.getElementById("buttonSearch");
const nameAgent = document.getElementById("nameAgent");
const descriptionAgent = document.getElementById("descriptionAgent");
const imgAbilities = document.getElementById("imgAbilities");
const abilityImages = [document.getElementById("imgAbility1"), 
                       document.getElementById("imgAbility2"), 
                       document.getElementById("imgAbility3"), 
                       document.getElementById("imgAbility4")];
const info = document.getElementById("info");
const agentImage = document.getElementById("agentImage");


function API(displayName) {
    const XML = new XMLHttpRequest();

    XML.open("GET", `https://valorant-api.com/v1/agents?language=pt-BR&isPlayableCharacter=true`);

    XML.send();

    XML.onload = function() {
        language = "pt-br"
        const responseAPI = JSON.parse(XML.response);
        const agent = responseAPI.data.find(agent => agent.displayName.toLowerCase() === displayName.toLowerCase());

        if(agent) {
            nameAgent.innerText = `Agente: ${agent.displayName}`;
            descriptionAgent.innerText = `${agent.description}`;

            agent.abilities.forEach((ability, index) => {
                if (abilityImages[index] && ability.displayIcon) {
                    abilityImages[index].src = ability.displayIcon;
                    abilityImages[index].alt = ability.displayName;
                }
            });

            if(agent.fullPortrait !== null) {
                agentImage.src = agent.fullPortrait;
                agentImage.alt = agent.displayName;
            }

            
        } else {
            console.log("Agente não encontrado.");
        }
    }
}

button.addEventListener("click", () => {
    API(input.value)
    info.style.display = "block";
})
