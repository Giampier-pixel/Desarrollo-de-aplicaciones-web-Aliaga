from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Obtener variables de entorno (sin mostrar contraseña)
        env_vars = {
            'MYSQL_HOST': os.environ.get('MYSQL_HOST', 'NO CONFIGURADO'),
            'MYSQL_USER': os.environ.get('MYSQL_USER', 'NO CONFIGURADO'),
            'MYSQL_PASSWORD': '***' if os.environ.get('MYSQL_PASSWORD') else 'NO CONFIGURADO',
            'MYSQL_DATABASE': os.environ.get('MYSQL_DATABASE', 'NO CONFIGURADO'),
            'MYSQL_PORT': os.environ.get('MYSQL_PORT', 'NO CONFIGURADO'),
        }
        
        response = {
            'variables_entorno': env_vars,
            'mensaje': 'Verifica que todas las variables estén configuradas en Vercel'
        }
        
        self.wfile.write(json.dumps(response, indent=2).encode())