function sendPrompt() {
    const promptInput = document.getElementById('prompt');
    const messagesContainer = document.getElementById('messages');
    const btnText = document.getElementById('btn-text');
    const loading = document.getElementById('loading');

    const userMessage = promptInput.value.trim();
    if (userMessage === "") return;

    // Mostrar el mensaje del usuario
    const userDiv = document.createElement('div');
    userDiv.classList.add('chat-message', 'user-message');
    userDiv.innerHTML = `<strong>Tú:</strong> ${userMessage}`;
    messagesContainer.appendChild(userDiv);

    // Limpiar textarea y mostrar "Generando..."
    promptInput.value = "";
    btnText.style.display = "none";
    loading.style.display = "inline";

    // Simulación de respuesta del bot (puedes reemplazar con una API real)
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.classList.add('chat-message', 'bot-message');
        botDiv.innerHTML = `<strong>Llama:</strong> Esto es una respuesta simulada para: "${userMessage}"`;
        messagesContainer.appendChild(botDiv);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        btnText.style.display = "inline";
        loading.style.display = "none";
    }, 1500);
}
