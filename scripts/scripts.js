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

  document.getElementById("generateButton").addEventListener("click", async () => {
    const subject = document.getElementById("subject").value;
    const keywords = document.getElementById("keywords").value;

      const occasion = document.getElementById('occasion').value;
      const chaleur = document.getElementById('chaleur').value;

      
    if (!subject || !keywords) {
      alert("Veuillez entrer un sujet et des points clés.");
      return;
    }
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
  });
});