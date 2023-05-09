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
      const subject = document.getElementById("subject").value;
      if (!subject) {
        alert("Veuillez entrer un text.");
        return;
      }
  const prompt = `Tu est proffeseur de français, tu doit me corriger toutes les fautes d'orthographes de se text :"${subject}"`;
  
      // Générer le discours avec l'aide de ChatGPT-4
      const generatedSpeech = await generateSpeech(prompt);
      // Afficher le discours généré dans la zone de texte
      const generatedSpeechTextarea = document.getElementById("generatedSpeech");
      generatedSpeechTextarea.value = generatedSpeech;
    });
  });
