from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pymysql
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuración de base de datos Aiven
def get_db_connection():
    try:
        connection = pymysql.connect(
            host='estudiantes-db-1-flask21e12ed.e.aivencloud.com',
            user='avnadmin',
            password=os.environ.get('DB_PASSWORD', 'your_password'),
            database='defaultdb',
            port=24967,
            ssl={'ssl_mode': 'REQUIRED'},
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection
    except Exception as e:
        print(f"Error de conexión: {e}")
        return None

@app.route('/')
def home():
    return jsonify({
        'message': 'API Flask Estudiantes funcionando',
        'version': '1.0.0',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/estudiantes', methods=['GET'])
def get_estudiantes():
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Error de conexión a base de datos'}), 500
    
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM estudiantes ORDER BY IdEstudiante DESC")
            estudiantes = cursor.fetchall()
        connection.close()
        
        return jsonify({
            'success': True,
            'data': estudiantes,
            'count': len(estudiantes)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/estudiantes', methods=['POST'])
def create_estudiante():
    data = request.get_json()
    
    if not data or not all(k in data for k in ('nombre', 'direccion', 'ciudad')):
        return jsonify({'error': 'Datos incompletos'}), 400
    
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Error de conexión a base de datos'}), 500
    
    try:
        with connection.cursor() as cursor:
            query = """INSERT INTO estudiantes 
                      (nomEstudiante, dirEstudiante, ciuEstudiante) 
                      VALUES (%s, %s, %s)"""
            cursor.execute(query, (data['nombre'], data['direccion'], data['ciudad']))
            connection.commit()
            estudiante_id = cursor.lastrowid
        
        connection.close()
        
        return jsonify({
            'success': True,
            'message': 'Estudiante registrado exitosamente',
            'id': estudiante_id,
            'data': {
                'id': estudiante_id,
                'nombre': data['nombre'],
                'direccion': data['direccion'],
                'ciudad': data['ciudad']
            }
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/estudiantes/<int:id>', methods=['DELETE'])
def delete_estudiante(id):
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Error de conexión a base de datos'}), 500
    
    try:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM estudiantes WHERE IdEstudiante = %s", (id,))
            connection.commit()
            affected_rows = cursor.rowcount
        
        connection.close()
        
        if affected_rows > 0:
            return jsonify({
                'success': True,
                'message': f'Estudiante {id} eliminado exitosamente'
            })
        else:
            return jsonify({'error': 'Estudiante no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check endpoint
@app.route('/health')
def health():
    connection = get_db_connection()
    db_status = 'connected' if connection else 'disconnected'
    if connection:
        connection.close()
    
    return jsonify({
        'status': 'healthy',
        'database': db_status,
        'timestamp': datetime.now().isoformat()
    })

# Vercel compatibility
if __name__ == '__main__':
    app.run(debug=True)