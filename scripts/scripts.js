let apiKey = "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"
document.addEventListener("DOMContentLoaded", function () {
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

  const button = document.getElementById("generateButton")
  button.addEventListener("click", async () => {
    const subject = document.getElementById("subject").value;
    const keywords = document.getElementById("keywords").value;
    const occasion = document.getElementById('occasion').value;
    const chaleur = document.getElementById('chaleur').value;

    if (!subject || !keywords) {
      alert("Veuillez entrer un sujet et des points clés.");
      return;
    }
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
  </svg>`;
    button.style.opacity = 0.8 ;
    button.disabled = true;
    let occasionText = "";
    switch (occasion) {
      case "anniversaire":
        occasionText = "Rédige un discours d'anniversaire";
        break;
      case "mariage":
        occasionText = "Rédige un discours de mariage";
        break;
      case "discours_professionnel":
        occasionText = "Rédige un discours professionnel";
        break;
      case "demission":
        occasionText = "Rédige une lettre de demission";
        break;
      case "motivation":
        occasionText ="Rédige une lettre de motivation"
        break
      // Ajoute d'autres cas ici
    }
      let chaleurText = "";
    switch (chaleur) {
      case "tfaible":
        chaleurText = "comme un wesh wesh de la banlieu";
        break;
        case "faible":
          chaleurText = "d'un facon humoristique ";
          break;
      case "moyen":
        chaleurText = "comme un francais moyen";
        break;
      case "haut":
        chaleurText ="d'un langage soutenue"
        break;
    }

    const prompt = `Tu me parle ${chaleurText}.Tu me ${occasionText} sur le sujet "${subject}" en utilisant les points clés suivants : ${keywords}.`;
      // Générer le discours avec l'aide de ChatGPT-4
      const generatedSpeech = await generateSpeech(prompt);
      // Afficher le discours généré dans la zone de texte
      const generatedSpeechTextarea = document.getElementById("generatedSpeech");
      generatedSpeechTextarea.value = generatedSpeech;
      setTimeout(function() {
        button.innerHTML = "Valider";
        button.style.opacity = 1 ;
        button.disabled = false;
      }, 1000);

  });
});
