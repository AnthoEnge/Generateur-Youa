
let apiKey = ""
let areaGenerate = document.querySelector('.areaGenerate')
areaGenerate.style.display ='none'
// APPEL API
const generateSpeech = async (prompt) => {
  const response = await fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 300,
      n: 1,
      stop: null,
      temperature: 0.8,
    }),
  })
  const data = await response.json();
  if  (data.choices && data.choices.length > 0) {
    return data.choices[0].text.trim();
  } else {
    console.error("Erreur lors de la récupération des choix de réponse :", data);
    return "Désolé, une erreur s'est produite lors de la génération du discours. Veuillez réessayer.";
  }
};
// CREATE BUTTON LOAD
function loadButton() {
  const button = document.getElementById("generateButton")
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>`;
  button.style.opacity = 0.8 ;
  button.disabled = true;
} // REMOVE BUTTON LOAD
function removeLoadButton(nameButton) {
  const button = document.getElementById("generateButton")
  setTimeout(function() {
    button.innerHTML = nameButton;
    button.style.opacity = 1 ;
    button.disabled = false;
  }, 1000);

}
// CLICK SUR LE BOUTTON VALIDER
function clickOnGenerate(config){
  const generatedSpeechTextarea = document.getElementById("generatedSpeech");
  const button = document.getElementById("generateButton")
  let nameButton = button.textContent;
  button.addEventListener("click", async () => {
    let configMessage = 'Tu doit me généré le message en un seul message uniquement. '
    loadButton()
    if (config === 'anniversaire') {
      const input = document.querySelector(".input").value;
      const input1 = document.querySelector(".input1").value;
      const input2 = document.querySelector(".input2").value;
      const input3 = document.querySelector(".input").value;
      if ( !input || !input1 || !input2) {
        removeLoadButton(nameButton)
        return alert('Remplissez les champs requis')
      } else {
        prompt = configMessage + `Génére un discours d'anniversaire pour ${input}, qui célèbre aujourd'hui son ${input1} anniversaire. Lien avec la personne: ${input2}, et c'est un moment spécial pour célébrer cette journée importante dans sa vie. Composez un discours chaleureux et inspirant pour lui exprimer vos vœux d'anniversaire et partager des souvenirs et des anecdotes qui lui sont chers. Soyez attentionné, sincère et assurez-vous de transmettre toute votre affection et votre joie lors de cette occasion spéciale, m'ont prénom = ${input3}.
        `
        console.log(prompt);
      }
    }
    if (config === 'mariage') {
      const input = document.querySelector(".input").value;
      const input1 = document.querySelector(".input1").value;
      const input2 = document.querySelector(".input2").value;
      const input3 = document.querySelector(".input3").value;
      const input4 = document.querySelector(".input4").value;
      if ( !input || !input1 || !input2 || !input3 || !input4) {
        removeLoadButton(nameButton)
        return alert('Remplissez les champs requis')
      } else {
        prompt = configMessage + `Génére un discours de mariage en ayant ses informations : "Nom du marié" = ${input} , "nom de la mariée" = ${input1} , "ma relation avec le couple" = ${input2} , Détails sur la cérémonie ou la récéption du mariage = ${input3}, "qualitée ou souhait spécifique" = ${input4}
        `
        console.log(prompt);
      }
    }
    if (config === 'discours_professionnel') {
      const input = document.querySelector(".input").value;
      const input1 = document.querySelector(".input1").value;
      const input2 = document.querySelector(".input2").value;
      const input3 = document.querySelector(".input3").value;
      if ( !input || !input1 || !input2 || !input3) {
        removeLoadButton(nameButton)
        return alert('Remplissez les champs requis')
      } else {
        prompt = configMessage +  `Génére un discours de ${input}, pour ${input1} ,publique ciblé :  ${input2}, le thèmes et les sujet que je souhaite abordée ${input3}.
        `
        console.log(prompt);
      }
    }
    if (config === 'demission') {
      const input = document.querySelector(".input").value;
      const input1 = document.querySelector(".input1").value;
      const input2 = document.querySelector(".input2").value;
      const input3 = document.querySelector(".input3").value;
      const input4 = document.querySelector(".input4").value;
      if ( !input || !input1 || !input2 || !input3 || !input4) {
        removeLoadButton(nameButton)
        return alert('Remplissez les champs requis')
      } else {
        prompt = configMessage +  `Génére moi une lettre de démission en sachant ce-ci, mon prenom et nom = ${input} , nom de l'entreprise = ${input1} , mon poste actuel = ${input2} , date de départ souhaité = ${input3}, le raison de ma départ = ${input4}.
        `
        console.log(prompt);
      }
    }
    if (config === 'motivation') {
      const input = document.querySelector(".input").value;
      const input1 = document.querySelector(".input1").value;
      const input2 = document.querySelector(".input2").value;
      const input3 = document.querySelector(".input3").value;
    if ( !input || !input1 || !input2 || !input3) {
      removeLoadButton(nameButton)
        return alert('Remplissez les champs requis')
      } else {
        prompt = configMessage + `Génére une lettre de motivation avec les informations suivante : mon nom prénom = ${input}, poste ou programme souhaité = ${input1} , m'on parcours académique ou profésionnel ${input2}, mes disponibilité pour une rencontre = ${input3}.
        `
        console.log(prompt);
      }
    }
    // Générer le discours avec l'aide de ChatGPT-4
    areaGenerate.style.display = 'block'
    const generatedSpeech = await generateSpeech(prompt);
    // Afficher le discours généré dans la zone de texte
    generatedSpeechTextarea.value = generatedSpeech;
    // Réactiver le boutton
    removeLoadButton(nameButton)
  });
}
// Création options menu
var options = [
  { value: "anniversaire", label: "Anniversaire" },
  { value: "mariage", label: "Mariage" },
  { value: "discours_professionnel", label: "Discours professionnel" },
  { value: "demission", label: "Lettre de démission" },
  { value: "motivation", label: "Lettre de motivation" }
];
// Fonction appelée lorsqu'une option est sélectionnée
function optionSelected(optionValue) {
  var h3 = document.createElement("h3");
  var input = document.createElement("input");
  input.type = "text";
  input.className = "input";
  var input1 = document.createElement("input");
  input1.type = "text";
  input1.className = "input1";
  var input2 = document.createElement("input");
  input2.type = "text";
  input2.className = "input2";
  var input3 = document.createElement("input");
  input3.type = "text";
  input3.className = "input3";
  var input4 = document.createElement("input");
  input4.type = "text";
  input4.className = "input4";
  var button = document.createElement("button");
  button.id ='generateButton'
  // Supprimer les éléments précédents (s'il y en a)
  var container = document.getElementById("options-container");
  container.innerHTML = "";

  // Créer des éléments en fonction de l'option sélectionnée
  if (optionValue === "anniversaire") {
    h3.textContent = "Génére ton discours d'" + optionValue
    input.placeholder = "Nom de la personne";
    input1.placeholder = "Age de la personne";
    input2.placeholder = "Lien avec la personne";
    input2.placeholder = "Ton prénom";
    button.innerText = "Générer le message d'anniversaire";
      container.appendChild(h3);
      container.appendChild(input);
      container.appendChild(input1);
      container.appendChild(input2);
      container.appendChild(button);
  } else if (optionValue === "mariage") {
    h3.textContent = 'Génére ton discours de ' + optionValue
    container.appendChild(h3);
    input.placeholder = "Nom du marié";
    input1.placeholder = "Nom de la mariée";
    input2.placeholder = "Votre relation avec le couple";
    input3.placeholder = "Des détails sur la cérémonie ou la réception de mariage";
    input4.placeholder = "Des qualités ou des souhaits spécifiques pour le couple";
    button.innerText = "Générer les vœux de mariage";
      container.appendChild(input);
      container.appendChild(input1);
      container.appendChild(input2);
      container.appendChild(input3);
      container.appendChild(input4);
      container.appendChild(button);
  } else if (optionValue === "discours_professionnel") {
    h3.textContent = 'Génére ton discours professionnel '
    container.appendChild(h3);
    input.placeholder = "Contexte du discours (remerciment, d'ouverture, motivation..)";
    input1.placeholder = "L'occasion ou l'événement spécifique";
    input2.placeholder = "Le public cible (collègues, employès,clients..)";
    input3.placeholder = "Les thèmes ou les sujets que vous souhaitez aborder";
    button.innerText = "Générer le discours professionnel";
      container.appendChild(input);
      container.appendChild(input1);
      container.appendChild(input2);
      container.appendChild(input3);
      container.appendChild(button);
  } else if (optionValue === "demission") {
    h3.textContent = 'Génére ta lettre de  ' + optionValue
    container.appendChild(h3);
    input.placeholder = "Votre prenom et nom";
    input3.type = "date";
    input1.placeholder = "Le nom de l'entreprise";
    input2.placeholder = "Votre poste actuel";
    input3.placeholder = "Date de départ souhaitée";
    input4.placeholder = "Raison de la démission";
    button.innerText = "Générer la lettre de démission";
      container.appendChild(input);
      container.appendChild(input1);
      container.appendChild(input2);
      container.appendChild(input3);
      container.appendChild(input4);
      container.appendChild(button);
  } else if (optionValue === "motivation") {
    h3.textContent = 'Génére ta lettre de ' + optionValue
    container.appendChild(h3);
    input.placeholder = "Votre prénom et nom";
    input1.placeholder = "Poste ou programme souhaité";
    input2.placeholder = "Votre parcours académique et professionnel";
    input3.placeholder = "Vos disponibilité pour une rencontre";
    button.innerText = "Générer la lettre de motivation";
      container.appendChild(input);
      container.appendChild(input1);
      container.appendChild(input2);
      container.appendChild(input3);
      container.appendChild(button);
  }
}
// Créer les boutons correspondant à chaque option
options.forEach(function(option) {
  var buttonContainer = document.getElementById("button-container");
  let instruction = document.querySelector('.instruction');
  var button = document.createElement("button");
  button.innerText = option.label;
  button.addEventListener("click", function() {
    instruction.style.display = 'none'
    optionSelected(option.value);
    let config = option.value
    clickOnGenerate(config)
  });
  buttonContainer.appendChild(button);
});
