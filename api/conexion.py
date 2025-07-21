import pymysql
import os

def obtener_conexion():
    try:
        return pymysql.connect(
            host='estudiantes-db-1-flask21e12ed.e.aivencloud.com',
            user='avnadmin',
            password=os.environ.get('DB_PASSWORD'),  # Configura esto en Vercel
            database='defaultdb',
            port=24967,
            ssl={'ssl_mode': 'REQUIRED'},
            cursorclass=pymysql.cursors.DictCursor
        )
    except Exception as e:
        print(f"Error de conexión: {e}")
        return None