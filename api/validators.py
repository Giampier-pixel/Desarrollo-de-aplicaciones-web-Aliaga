import re
from datetime import datetime

class ValidationError(Exception):
    """Excepción personalizada para errores de validación"""
    def __init__(self, message, field=None):
        self.message = message
        self.field = field
        super().__init__(self.message)

class EstudianteValidator:
    @staticmethod
    def validate_nombre(nombre):
        """Valida el nombre del estudiante"""
        try:
            if not nombre or not isinstance(nombre, str):
                raise ValidationError("El nombre es requerido", "nombre")
            
            nombre = nombre.strip()
            if len(nombre) < 2:
                raise ValidationError("El nombre debe tener al menos 2 caracteres", "nombre")
            
            if len(nombre) > 100:
                raise ValidationError("El nombre no puede exceder 100 caracteres", "nombre")
            
            if not re.match(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$', nombre):
                raise ValidationError("El nombre solo puede contener letras y espacios", "nombre")
                
            return nombre
        except ValidationError:
            raise
        except Exception as e:
            raise ValidationError(f"Error inesperado validando nombre: {str(e)}", "nombre")
    
    @staticmethod
    def validate_email(email):
        """Valida el formato del email"""
        try:
            if not email:
                raise ValidationError("El email es requerido", "email")
            
            email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            if not re.match(email_pattern, email):
                raise ValidationError("Formato de email inválido", "email")
            
            return email.lower().strip()
        except ValidationError:
            raise
        except Exception as e:
            raise ValidationError(f"Error validando email: {str(e)}", "email")
    
    @staticmethod
    def validate_edad(edad):
        """Valida la edad del estudiante"""
        try:
            if edad is None:
                raise ValidationError("La edad es requerida", "edad")
            
            edad = int(edad)
            if edad < 18:
                raise ValidationError("La edad mínima es 18 años", "edad")
            
            if edad > 100:
                raise ValidationError("La edad máxima es 100 años", "edad")
            
            return edad
        except ValueError:
            raise ValidationError("La edad debe ser un número entero", "edad")
        except ValidationError:
            raise
        except Exception as e:
            raise ValidationError(f"Error validando edad: {str(e)}", "edad")
    
    @classmethod
    def validate_estudiante(cls, data):
        """Valida todos los datos de un estudiante"""
        errors = {}
        validated_data = {}
        
        # Validar cada campo individualmente
        for field, validator in [
            ('nombre', cls.validate_nombre),
            ('email', cls.validate_email),
            ('edad', cls.validate_edad)
        ]:
            try:
                if field in data:
                    validated_data[field] = validator(data[field])
            except ValidationError as e:
                errors[field] = e.message
        
        if errors:
            raise ValidationError("Errores de validación encontrados", errors)
        
        return validated_data

# api/error_handlers.py
from flask import jsonify
from .validators import ValidationError

def register_error_handlers(app):
    @app.errorhandler(ValidationError)
    def handle_validation_error(e):
        return jsonify({
            'success': False,
            'error': 'Validation Error',
            'message': e.message,
            'field': e.field if hasattr(e, 'field') else None
        }), 400
    
    @app.errorhandler(404)
    def handle_not_found(e):
        return jsonify({
            'success': False,
            'error': 'Not Found',
            'message': 'Recurso no encontrado'
        }), 404
    
    @app.errorhandler(500)
    def handle_internal_error(e):
        return jsonify({
            'success': False,
            'error': 'Internal Server Error',
            'message': 'Error interno del servidor'
        }), 500