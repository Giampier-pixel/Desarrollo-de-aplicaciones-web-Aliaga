from http.server import BaseHTTPRequestHandler
import json
import pymysql
import os
from urllib.parse import parse_qs

def obtener_conexion():
    return pymysql.connect(
        host=os.environ.get('MYSQL_HOST', 'estudiantes-db-1-flask21e12ed.e.aivencloud.com'),
        user=os.environ.get('MYSQL_USER', 'avnadmin'),
        password=os.environ.get('MYSQL_PASSWORD', 'AVNS_jNTjSKAKXF6vAkvb9Qg'),
        database=os.environ.get('MYSQL_DATABASE', 'defaultdb'),
        port=int(os.environ.get('MYSQL_PORT', 24967)),
        cursorclass=pymysql.cursors.DictCursor,
        ssl={
            'ssl_disabled': False
        },
        charset='utf8mb4'
    )

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        try:
            conexion = obtener_conexion()
            with conexion.cursor() as cursor:
                cursor.execute("SELECT * FROM estudiantes ORDER BY IdEstudiante DESC")
                estudiantes = cursor.fetchall()
            conexion.close()
            
            response = {
                'success': True,
                'estudiantes': estudiantes
            }
        except Exception as e:
            response = {
                'success': False,
                'error': str(e)
            }
        
        self.wfile.write(json.dumps(response).encode())

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            nombre = data.get('nombre')
            direccion = data.get('direccion')
            ciudad = data.get('ciudad')
            
            if not all([nombre, direccion, ciudad]):
                raise ValueError("Todos los campos son requeridos")
            
            conexion = obtener_conexion()
            with conexion.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO estudiantes(nomEstudiante, dirEstudiante, ciuEstudiante) VALUES (%s, %s, %s)",
                    (nombre, direccion, ciudad)
                )
                conexion.commit()
                estudiante_id = cursor.lastrowid
            conexion.close()
            
            response = {
                'success': True,
                'message': 'Estudiante registrado exitosamente',
                'id': estudiante_id
            }
        except Exception as e:
            response = {
                'success': False,
                'error': str(e)
            }
        
        self.wfile.write(json.dumps(response).encode())