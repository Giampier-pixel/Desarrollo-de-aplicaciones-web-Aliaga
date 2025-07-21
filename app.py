from flask import Flask, render_template, request, jsonify
import mysql.connector
from mysql.connector import Error
import os
import random
import re
from datetime import datetime
import requests
import json

app = Flask(__name__)

# Configuración de la base de datos
DB_CONFIG = {
    'host': 'estudiantes-db-1-flask21e12ed.e.aivencloud.com',
    'port': 24967,
    'database': 'defaultdb',
    'user': 'avnadmin',
    'password': 'AVNS_jNTjSKAKXF6vAkvb9Qg',
    'ssl_disabled': False,
    'use_unicode': True,
    'charset': 'utf8'
}

class SimpleChatBot:
    def __init__(self):
        # Respuestas predefinidas por categorías
        self.responses = {
            'saludo': [
                "¡Hola! ¿En qué puedo ayudarte hoy?",
                "¡Saludos! Estoy aquí para asistirte.",
                "¡Hola! Soy tu asistente virtual, ¿cómo puedo ayudarte?"
            ],
            'despedida': [
                "¡Hasta luego! Que tengas un excelente día.",
                "¡Adiós! Vuelve cuando necesites ayuda.",
                "¡Nos vemos! Ha sido un placer ayudarte."
            ],
            'programacion': [
                "Python es un excelente lenguaje para desarrollo web y IA. ¿Te gustaría saber algo específico?",
                "Flask y Django son frameworks fantásticos para desarrollo backend. ¿En cuál te gustaría profundizar?",
                "El desarrollo backend es fascinante. Puedo ayudarte con conceptos de APIs, bases de datos y más."
            ],
            'ia': [
                "La inteligencia artificial está transformando el mundo. ¿Te interesa algún área específica como ML o NLP?",
                "Los sistemas inteligentes combinan algoritmos y datos para crear soluciones innovadoras.",
                "Machine Learning es una rama poderosa de la IA. ¿Quieres explorar algún algoritmo específico?"
            ],
            'universidad': [
                "Los estudios universitarios son una excelente base para el crecimiento profesional.",
                "¿Estás estudiando alguna carrera relacionada con tecnología? Puedo ayudarte con conceptos técnicos.",
                "La educación superior abre muchas puertas en el mundo tecnológico."
            ],
            'default': [
                "Esa es una pregunta interesante. ¿Podrías ser más específico?",
                "Me gustaría ayudarte mejor. ¿Puedes darme más contexto?",
                "Entiendo tu consulta. ¿Hay algo más específico que te gustaría saber?",
                "Basándome en tu mensaje, puedo sugerir que explores más sobre este tema."
            ]
        }
        
        # Patrones para clasificar mensajes
        self.patterns = {
            'saludo': ['hola', 'saludos', 'buenos días', 'buenas tardes', 'hey', 'hi'],
            'despedida': ['adiós', 'hasta luego', 'bye', 'nos vemos', 'chau'],
            'programacion': ['python', 'flask', 'django', 'código', 'programming', 'backend', 'frontend'],
            'ia': ['inteligencia artificial', 'machine learning', 'ml', 'ia', 'algoritmo', 'modelo'],
            'universidad': ['universidad', 'carrera', 'estudios', 'profesor', 'curso', 'semestre']
        }

    def analyze_sentiment(self, text):
        """Análisis básico de sentimientos"""
        positive_words = ['bueno', 'excelente', 'genial', 'fantástico', 'perfecto', 'increíble', 'amor', 'feliz']
        negative_words = ['malo', 'terrible', 'horrible', 'odio', 'triste', 'problema', 'error', 'difícil']
        
        text_lower = text.lower()
        positive_score = sum(1 for word in positive_words if word in text_lower)
        negative_score = sum(1 for word in negative_words if word in text_lower)
        
        if positive_score > negative_score:
            return 'Positivo', round((positive_score / (positive_score + negative_score + 1)) * 100, 1)
        elif negative_score > positive_score:
            return 'Negativo', round((negative_score / (positive_score + negative_score + 1)) * 100, 1)
        else:
            return 'Neutral', 75.0

    def classify_message(self, message):
        """Clasificar el mensaje según patrones"""
        message_lower = message.lower()
        
        for category, words in self.patterns.items():
            if any(word in message_lower for word in words):
                return category
        
        return 'default'

    def generate_response(self, message):
        """Generar respuesta basada en el mensaje"""
        category = self.classify_message(message)
        responses = self.responses.get(category, self.responses['default'])
        return random.choice(responses)

# Instancia del chatbot
chatbot = SimpleChatBot()

def get_db_connection():
    """Establecer conexión con la base de datos"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Error conectando a MySQL: {e}")
        return None

def init_database():
    """Inicializar tablas necesarias"""
    try:
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor()
            
            # Crear tabla para mensajes del chat
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS chat_messages (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_message TEXT NOT NULL,
                    bot_response TEXT NOT NULL,
                    sentiment VARCHAR(20),
                    confidence DECIMAL(5,2),
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            conn.commit()
            cursor.close()
            conn.close()
            print("Base de datos inicializada correctamente")
    except Error as e:
        print(f"Error inicializando base de datos: {e}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Mensaje vacío'}), 400
        
        # Generar respuesta del bot
        bot_response = chatbot.generate_response(user_message)
        
        # Análizar sentimiento
        sentiment, confidence = chatbot.analyze_sentiment(user_message)
        
        # Guardar en base de datos
        conn = get_db_connection()
        if conn:
            try:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO chat_messages (user_message, bot_response, sentiment, confidence)
                    VALUES (%s, %s, %s, %s)
                """, (user_message, bot_response, sentiment, confidence))
                conn.commit()
                cursor.close()
            except Error as e:
                print(f"Error guardando mensaje: {e}")
            finally:
                conn.close()
        
        return jsonify({
            'response': bot_response,
            'sentiment': sentiment,
            'confidence': f"{confidence}%",
            'timestamp': datetime.now().strftime('%H:%M:%S')
        })
        
    except Exception as e:
        return jsonify({'error': f'Error procesando mensaje: {str(e)}'}), 500

@app.route('/stats', methods=['GET'])
def get_stats():
    """Obtener estadísticas de mensajes"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Error de conexión a BD'}), 500
        
        cursor = conn.cursor()
        
        # Contar total de mensajes
        cursor.execute("SELECT COUNT(*) FROM chat_messages")
        total_messages = cursor.fetchone()[0]
        
        # Obtener distribución de sentimientos
        cursor.execute("""
            SELECT sentiment, COUNT(*) as count 
            FROM chat_messages 
            GROUP BY sentiment
        """)
        sentiment_data = dict(cursor.fetchall())
        
        cursor.close()
        conn.close()
        
        return jsonify({
            'total_messages': total_messages,
            'sentiment_distribution': sentiment_data
        })
        
    except Error as e:
        return jsonify({'error': f'Error obteniendo estadísticas: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint de verificación de salud"""
    try:
        conn = get_db_connection()
        if conn:
            conn.close()
            return jsonify({'status': 'healthy', 'database': 'connected'})
        else:
            return jsonify({'status': 'unhealthy', 'database': 'disconnected'}), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# Inicializar base de datos al arrancar la aplicación
init_database()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)