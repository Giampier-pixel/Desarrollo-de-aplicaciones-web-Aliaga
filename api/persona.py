from http.server import BaseHTTPRequestHandler
import json

class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad
    
    def presentarse(self):
        return f"Hola, soy {self.nombre} y tengo {self.edad} años."
    
    def to_dict(self):
        return {
            'nombre': self.nombre,
            'edad': self.edad,
            'tipo': 'Persona'
        }

class Estudiante(Persona):
    def __init__(self, nombre, edad, carrera):
        super().__init__(nombre, edad)
        self.carrera = carrera
    
    def estudiar(self):
        return f"{self.nombre} está estudiando {self.carrera}."
    
    def presentarse(self):
        return f"Hola, soy {self.nombre}, tengo {self.edad} años y estudio {self.carrera}."
    
    def to_dict(self):
        return {
            'nombre': self.nombre,
            'edad': self.edad,
            'carrera': self.carrera,
            'tipo': 'Estudiante'
        }

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

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
            edad = data.get('edad')
            carrera = data.get('carrera')
            
            if not nombre or not edad:
                raise ValueError("Nombre y edad son requeridos")
            
            edad = int(edad)
            
            if carrera and carrera.strip():
                # Crear estudiante
                estudiante = Estudiante(nombre, edad, carrera)
                response = {
                    'success': True,
                    'presentacion': estudiante.presentarse(),
                    'estudio': estudiante.estudiar(),
                    'datos': estudiante.to_dict()
                }
            else:
                # Crear persona
                persona = Persona(nombre, edad)
                response = {
                    'success': True,
                    'presentacion': persona.presentarse(),
                    'datos': persona.to_dict()
                }
            
        except ValueError as e:
            response = {
                'success': False,
                'error': str(e)
            }
        except Exception as e:
            response = {
                'success': False,
                'error': f"Error inesperado: {str(e)}"
            }
        
        self.wfile.write(json.dumps(response).encode())