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

# Ejemplo de uso
def crear_estudiante_ejemplo():
    alumno = Estudiante("Laura", 20, "Ingeniería de Sistemas")
    return {
        'presentacion': alumno.presentarse(),
        'actividad': alumno.estudiar(),
        'datos': alumno.to_dict()
    }