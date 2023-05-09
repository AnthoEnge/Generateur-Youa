document.addEventListener("DOMContentLoaded", function () {
    const generateSpeech = async (prompt) => {
      const response = await fetch("http://localhost:8081/https://api.openai.com/v1/engines/text-davinci-002/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ``,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 300,
          n: 1,
          stop: null,
          temperature: 0.8,
        }),
      });
  
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].text.trim();
      } else {
        console.error("Erreur lors de la récupération des choix de réponse :", data);
        return "Désolé, une erreur s'est produite lors de la génération du discours. Veuillez réessayer.";
      }
    };
  
    document.getElementById("generateButton").addEventListener("click", async () => {
      const subject = document.getElementById("speech").value;
      const langue = document.getElementById('langue').value;

      if (!subject) {
        alert("Veuillez entrer un text.");
        return;
      }
  
      // const prompt = `Créez un discours sur le sujet "${subject}" en utilisant les points clés suivants : ${keywords}`;
        let langueText = "";
  switch (langue) {
    case "zh":
      occasionText = "Chinois (mandarin)";
      break;
    case "es":
      occasionText = "Espagnol";
      break;
    case "en":
      occasionText = "Anglais";
      break;
    case "hi":
      occasionText ="Hindi"
      break;
      case "ar":
        occasionText = "Arabe";
        break;
      case "pt":
        occasionText = "Portugais";
        break;
      case "bn":
        occasionText = "Bengali";
        break;
      case "ru":
        occasionText = "Russe";
        break;
      case "ja":
        occasionText ="Japonais"
        break;
      case "de":
        occasionText ="Allemand"
        break;
      case "fr":
        occasionText ="Francais"
        break;
  }

  const prompt = `Tu doit me traduire ce-ci : "${subject}". dans la langue ${langueText}`;
  
      // Générer le discours avec l'aide de ChatGPT-4
      const generatedSpeech = await generateSpeech(prompt);
      // Afficher le discours généré dans la zone de texte
      const generatedSpeechTextarea = document.getElementById("generatedSpeech");
      generatedSpeechTextarea.value = generatedSpeech;
    });
  });
