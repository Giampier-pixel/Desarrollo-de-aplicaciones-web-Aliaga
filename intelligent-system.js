// Carga el modelo Universal Sentence Encoder
async function loadModel() {
    try {
        const use = await window.universalSentenceEncoder.load();
        return use;
    } catch (error) {
        throw new Error('Error al cargar el modelo: ' + error.message);
    }
}

// Analiza el sentimiento del texto ingresado
async function analyzeSentiment() {
    const input = document.getElementById('sentiment-input').value.trim();
    const resultDisplay = document.getElementById('result-display');
    
    if (!input) {
        resultDisplay.textContent = 'Por favor, ingresa un texto para analizar.';
        return;
    }

    resultDisplay.textContent = 'Analizando...';

    try {
        const model = await loadModel();
        const embeddings = await model.embed([input]);
        const score = embeddings.arraySync()[0].reduce((sum, val) => sum + val, 0) / embeddings.shape[1];
        
        let sentiment = 'Neutral';
        if (score > 0.2) sentiment = 'Positivo';
        else if (score < -0.2) sentiment = 'Negativo';

        resultDisplay.textContent = `Sentimiento: ${sentiment} (Puntuación: ${score.toFixed(2)})`;
    } catch (error) {
        resultDisplay.textContent = `Error: ${error.message}`;
    }
}