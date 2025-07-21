// script9.js - Funcionalidad para los simuladores de la Semana 9

// Variables globales para el contador de sesión
let sessionCounter = 0;

// ========== SIMULADOR DE FACTORIAL JSP ==========

/**
 * Calcula el factorial de un número
 * @param {number} n - Número para calcular el factorial
 * @returns {number} - El factorial del número
 */
function factorial(n) {
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1;
    
    let result = 1;
    for (let i = n; i > 1; i--) {
        result *= i;
    }
    return result;
}

/**
 * Calcula el factorial y actualiza la interfaz
 */
function calcularFactorial() {
    const numeroInput = document.getElementById('factorialNum');
    const outputDiv = document.getElementById('factorialOutput');
    const countDiv = document.getElementById('countValue');
    
    const numero = parseInt(numeroInput.value);
    
    // Validaciones
    if (isNaN(numero) || numero < 1) {
        outputDiv.innerHTML = '<span style="color: red;">Debe indicar un número entero mayor que 0</span>';
        return;
    }
    
    if (numero > 20) {
        outputDiv.innerHTML = '<span style="color: red;">Número demasiado grande. Use un número menor a 21</span>';
        return;
    }
    
    // Calcular factorial
    const resultado = factorial(numero);
    
    // Mostrar resultado
    outputDiv.innerHTML = `<span style="color: green;">Resultado: ${numero}! = ${resultado.toLocaleString()}</span>`;
    
    // Incrementar contador de sesión
    sessionCounter++;
    countDiv.textContent = sessionCounter;
    
    // Limpiar input
    numeroInput.value = '';
}

/**
 * Resetea el contador de sesión
 */
function resetearSesion() {
    sessionCounter = 0;
    document.getElementById('countValue').textContent = sessionCounter;
    document.getElementById('factorialOutput').innerHTML = 'Sesión reseteada. Ingrese un número para calcular';
}

// Event listener para Enter en el input del factorial
document.addEventListener('DOMContentLoaded', function() {
    const factorialInput = document.getElementById('factorialNum');
    if (factorialInput) {
        factorialInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calcularFactorial();
            }
        });
    }
});

// ========== SIMULADOR API REST SPRING ==========

/**
 * Valida un ID de estudiante
 * @param {number} id - ID del estudiante
 * @returns {boolean} - true si es válido
 */
function validarId(id) {
    return !isNaN(id) && id > 0 && Number.isInteger(id);
}

/**
 * Valida una nota (0-20)
 * @param {number} nota - Nota a validar
 * @returns {boolean} - true si es válida
 */
function validarNota(nota) {
    return !isNaN(nota) && nota >= 0 && nota <= 20;
}

/**
 * Formatea la respuesta JSON para mostrarla
 * @param {Object} response - Objeto respuesta
 * @returns {string} - JSON formateado
 */
function formatearJSON(response) {
    return JSON.stringify(response, null, 2);
}

/**
 * Prueba el endpoint 1: /student/{id}/{nota}
 */
function testEndpoint1() {
    const idInput = document.getElementById('studentId1');
    const notaInput = document.getElementById('studentNota');
    const outputPre = document.getElementById('apiOutput');
    
    const id = parseInt(idInput.value);
    const nota = parseFloat(notaInput.value);
    
    let response = {};
    
    try {
        // Validar que los campos no estén vacíos
        if (isNaN(id) || isNaN(nota)) {
            response = {
                error: "ID y nota deben ser números válidos",
                status: 400,
                timestamp: new Date().toISOString()
            };
            outputPre.textContent = formatearJSON(response);
            outputPre.style.color = '#e74c3c';
            return;
        }
        
        // Validar rangos
        if (!validarId(id) || !validarNota(nota)) {
            response = {
                error: "ID debe ser mayor a 0 y nota entre 0-20",
                status: 400,
                timestamp: new Date().toISOString()
            };
            outputPre.textContent = formatearJSON(response);
            outputPre.style.color = '#e74c3c';
            return;
        }
        
        // Respuesta exitosa
        response = {
            id: id,
            nota: nota,
            mensaje: "Ruta válida - Datos correctos",
            estado: 202,
            timestamp: new Date().toISOString()
        };
        
        outputPre.textContent = formatearJSON(response);
        outputPre.style.color = '#27ae60';
        
    } catch (error) {
        response = {
            error: "Error interno del servidor",
            status: 500,
            timestamp: new Date().toISOString()
        };
        outputPre.textContent = formatearJSON(response);
        outputPre.style.color = '#e74c3c';
    }
    
    // Limpiar inputs
    idInput.value = '';
    notaInput.value = '';
}

/**
 * Prueba el endpoint 2: /student/{id}?nota1=x&nota2=x&nota3=x
 */
function testEndpoint2() {
    const idInput = document.getElementById('studentId2');
    const nota1Input = document.getElementById('nota1');
    const nota2Input = document.getElementById('nota2');
    const nota3Input = document.getElementById('nota3');
    const outputPre = document.getElementById('apiOutput');
    
    const id = parseInt(idInput.value);
    const nota1 = parseFloat(nota1Input.value);
    const nota2 = parseFloat(nota2Input.value);
    const nota3 = parseFloat(nota3Input.value);
    
    let response = {};
    
    try {
        // Validar que los campos no estén vacíos
        if (isNaN(id) || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
            response = {
                error: "Todos los valores deben ser números válidos",
                status: 400,
                timestamp: new Date().toISOString()
            };
            outputPre.textContent = formatearJSON(response);
            outputPre.style.color = '#e74c3c';
            return;
        }
        
        // Validar rangos
        if (!validarId(id) || !validarNota(nota1) || !validarNota(nota2) || !validarNota(nota3)) {
            response = {
                error: "ID debe ser mayor a 0 y todas las notas entre 0-20",
                status: 400,
                timestamp: new Date().toISOString()
            };
            outputPre.textContent = formatearJSON(response);
            outputPre.style.color = '#e74c3c';
            return;
        }
        
        // Calcular promedio
        const promedio = (nota1 + nota2 + nota3) / 3;
        
        // Respuesta exitosa
        response = {
            id: id,
            nota1: nota1,
            nota2: nota2,
            nota3: nota3,
            promedio: Math.round(promedio * 100) / 100,
            mensaje: "Ruta válida - Promedio calculado",
            estado: 202,
            timestamp: new Date().toISOString()
        };
        
        outputPre.textContent = formatearJSON(response);
        outputPre.style.color = '#27ae60';
        
    } catch (error) {
        response = {
            error: "Error interno del servidor",
            status: 500,
            timestamp: new Date().toISOString()
        };
        outputPre.textContent = formatearJSON(response);
        outputPre.style.color = '#e74c3c';
    }
    
    // Limpiar inputs
    idInput.value = '';
    nota1Input.value = '';
    nota2Input.value = '';
    nota3Input.value = '';
}

// ========== EVENT LISTENERS ADICIONALES ==========

document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para Enter en los inputs de la API
    const apiInputs = [
        'studentId1', 'studentNota', 
        'studentId2', 'nota1', 'nota2', 'nota3'
    ];
    
    apiInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    // Determinar qué endpoint probar basado en el input
                    if (['studentId1', 'studentNota'].includes(inputId)) {
                        testEndpoint1();
                    } else {
                        testEndpoint2();
                    }
                }
            });
        }
    });
    
    // Añadir validación en tiempo real para los inputs
    apiInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function() {
                // Validar el valor mientras el usuario escribe
                if (inputId.includes('Id')) {
                    // Validar ID
                    const value = parseInt(this.value);
                    if (this.value && (!validarId(value))) {
                        this.style.borderColor = '#e74c3c';
                    } else {
                        this.style.borderColor = '';
                    }
                } else if (inputId.includes('nota') || inputId === 'studentNota') {
                    // Validar nota
                    const value = parseFloat(this.value);
                    if (this.value && (!validarNota(value))) {
                        this.style.borderColor = '#e74c3c';
                    } else {
                        this.style.borderColor = '';
                    }
                }
            });
        }
    });
});

// ========== UTILIDADES ADICIONALES ==========

/**
 * Muestra mensajes de ayuda cuando se pasa el mouse sobre los botones
 */
function setupTooltips() {
    const tooltips = {
        'calcularFactorial': 'Calcula el factorial del número ingresado (máximo 20)',
        'resetearSesion': 'Reinicia el contador de cálculos realizados',
        'testEndpoint1': 'Prueba la validación de un estudiante con una nota',
        'testEndpoint2': 'Calcula el promedio de tres notas para un estudiante'
    };
    
    Object.keys(tooltips).forEach(buttonId => {
        const button = document.querySelector(`button[onclick="${buttonId}()"]`);
        if (button) {
            button.title = tooltips[buttonId];
        }
    });
}

// Configurar tooltips al cargar la página
document.addEventListener('DOMContentLoaded', setupTooltips);

// ========== FUNCIONES DE DEBUG (OPCIONAL) ==========

/**
 * Función para debugging - muestra el estado actual de las variables
 */
function debugInfo() {
    console.log('=== DEBUG INFO ===');
    console.log('Session Counter:', sessionCounter);
    console.log('==================');
}

// Para usar en la consola del navegador si es necesario
window.debugInfo = debugInfo;