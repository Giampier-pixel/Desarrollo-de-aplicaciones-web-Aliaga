// Variables globales
let messageCount = 0;
let isProcessing = false;

// Función para mostrar detalles de temas (ya existente)
function showTopicDetails(topic) {
    const descriptions = {
        'microservicios': 'Python es un lenguaje versátil ideal para desarrollar sistemas distribuidos y microservicios.',
        'django-micro': 'Django proporciona herramientas robustas para crear APIs y servicios web escalables.',
        'comunicacion': 'Flask es perfecto para crear microservicios ligeros y APIs RESTful eficientes.',
        'bases-datos': 'Los sistemas inteligentes aprovechan Python para implementar IA y machine learning.'
    };
    
    const descriptionElement = document.querySelector('.topics-description');
    if (descriptionElement) {
        descriptionElement.textContent = descriptions[topic] || descriptions['microservicios'];
    }
}

// Función principal para enviar mensaje
async function sendMessage() {
    if (isProcessing) return;
    
    const userInput = document.getElementById('userInput');
    const chatContainer = document.getElementById('chatContainer');
    const message = userInput.value.trim();
    
    if (!message) {
        alert('Por favor, escribe un mensaje.');
        return;
    }
    
    // Deshabilitar input mientras se procesa
    isProcessing = true;
    userInput.disabled = true;
    
    // Agregar mensaje del usuario al chat
    addMessageToChat(message, 'user');
    userInput.value = '';
    
    // Mostrar indicador de "escribiendo"
    showTypingIndicator();
    
    try {
        // Enviar mensaje al backend
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Remover indicador de escribiendo
        removeTypingIndicator();
        
        // Agregar respuesta del bot
        addMessageToChat(data.response, 'bot');
        
        // Actualizar análisis en tiempo real
        updateAnalysis(data);
        
        // Incrementar contador de mensajes
        messageCount++;
        updateMessageCount();
        
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addMessageToChat('Lo siento, hubo un error procesando tu mensaje. Por favor, intenta de nuevo.', 'bot', true);
    } finally {
        // Rehabilitar input
        isProcessing = false;
        userInput.disabled = false;
        userInput.focus();
    }
}

// Función para agregar mensajes al chat
function addMessageToChat(message, sender, isError = false) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    
    if (sender === 'user') {
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `<strong>👤 Tú:</strong> ${escapeHtml(message)}`;
    } else {
        messageDiv.className = `chat-message bot-message ${isError ? 'error-message' : ''}`;
        const icon = isError ? '⚠️' : '🤖';
        messageDiv.innerHTML = `<strong>${icon} Asistente IA:</strong> ${escapeHtml(message)}`;
    }
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Función para mostrar indicador de "escribiendo"
function showTypingIndicator() {
    const chatContainer = document.getElementById('chatContainer');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<strong>🤖 Asistente IA:</strong> <span class="typing-dots">Escribiendo<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>';
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Función para remover indicador de "escribiendo"
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Función para actualizar análisis en tiempo real
function updateAnalysis(data) {
    // Actualizar sentimiento
    const sentimentElement = document.getElementById('sentiment');
    if (sentimentElement) {
        sentimentElement.textContent = data.sentiment || 'Neutral';
        sentimentElement.className = `sentiment-${data.sentiment?.toLowerCase() || 'neutral'}`;
    }
    
    // Actualizar confianza
    const confidenceElement = document.getElementById('confidence');
    if (confidenceElement) {
        confidenceElement.textContent = data.confidence || '--';
    }
}

// Función para actualizar contador de mensajes
function updateMessageCount() {
    const messageCountElement = document.getElementById('messageCount');
    if (messageCountElement) {
        messageCountElement.textContent = messageCount;
    }
}

// Función para escapar HTML y prevenir XSS
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Permitir envío con Enter (pero Shift+Enter para nueva línea)
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });
        
        // Auto-resize del textarea
        userInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }
    
    // Cargar estadísticas iniciales
    loadInitialStats();
});

// Función para cargar estadísticas iniciales
async function loadInitialStats() {
    try {
        const response = await fetch('/stats');
        if (response.ok) {
            const data = await response.json();
            messageCount = data.total_messages || 0;
            updateMessageCount();
        }
    } catch (error) {
        console.log('No se pudieron cargar las estadísticas iniciales:', error);
    }
}

// Función para verificar el estado del sistema
async function checkSystemHealth() {
    try {
        const response = await fetch('/health');
        const data = await response.json();
        
        if (data.status === 'healthy') {
            console.log('✅ Sistema funcionando correctamente');
        } else {
            console.warn('⚠️ Sistema con problemas:', data);
        }
    } catch (error) {
        console.error('❌ Error verificando estado del sistema:', error);
    }
}

// Verificar estado del sistema al cargar
checkSystemHealth();