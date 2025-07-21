// Funciones para el Ejercicio 1: Persona y Estudiante
async function crearPersonaOEstudiante() {
    const nombre = document.getElementById('nombre-persona').value;
    const edad = document.getElementById('edad-persona').value;
    const carrera = document.getElementById('carrera-estudiante').value;
    const resultadoDiv = document.getElementById('resultado-persona');
    
    if (!nombre || !edad) {
        resultadoDiv.innerHTML = '<div class="model-field error">⚠️ Nombre y edad son requeridos</div>';
        return;
    }
    
    try {
        const response = await fetch('/api/persona', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre,
                edad: parseInt(edad),
                carrera: carrera
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            let html = `<div class="model-field">✅ ${data.presentacion}</div>`;
            if (data.estudio) {
                html += `<div class="model-field">📚 ${data.estudio}</div>`;
            }
            html += `<div class="model-field">🔍 Tipo: ${data.datos.tipo}</div>`;
            html += `<div class="model-field">👤 Datos: ${JSON.stringify(data.datos, null, 2)}</div>`;
            
            resultadoDiv.innerHTML = html;
        } else {
            resultadoDiv.innerHTML = `<div class="model-field error">❌ Error: ${data.error}</div>`;
        }
    } catch (error) {
        resultadoDiv.innerHTML = `<div class="model-field error">❌ Error de conexión: ${error.message}</div>`;
    }
    
    // Limpiar formulario
    document.getElementById('nombre-persona').value = '';
    document.getElementById('edad-persona').value = '';
    document.getElementById('carrera-estudiante').value = '';
}

// Funciones para el Ejercicio 2: Flask con MySQL
async function registrarEstudiante() {
    const nombre = document.getElementById('nombre-estudiante').value;
    const direccion = document.getElementById('direccion-estudiante').value;
    const ciudad = document.getElementById('ciudad-estudiante').value;
    const resultadoDiv = document.getElementById('resultado-flask');
    
    if (!nombre || !direccion || !ciudad) {
        resultadoDiv.innerHTML = '<div class="model-field error">⚠️ Todos los campos son requeridos</div>';
        return;
    }
    
    try {
        const response = await fetch('/api/estudiantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre,
                direccion: direccion,
                ciudad: ciudad
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            resultadoDiv.innerHTML = `
                <div class="model-field">✅ ${data.message}</div>
                <div class="model-field">🆔 ID asignado: ${data.id}</div>
                <div class="model-field">📊 Conexión a Aiven MySQL ✓</div>
            `;
            
            // Limpiar formulario
            document.getElementById('nombre-estudiante').value = '';
            document.getElementById('direccion-estudiante').value = '';
            document.getElementById('ciudad-estudiante').value = '';
            
            // Actualizar lista automáticamente
            setTimeout(cargarEstudiantes, 500);
        } else {
            resultadoDiv.innerHTML = `<div class="model-field error">❌ Error: ${data.error}</div>`;
        }
    } catch (error) {
        resultadoDiv.innerHTML = `<div class="model-field error">❌ Error de conexión: ${error.message}</div>`;
    }
}

async function cargarEstudiantes() {
    const listaDiv = document.getElementById('lista-estudiantes');
    
    try {
        listaDiv.innerHTML = '<div class="model-field">🔄 Cargando estudiantes...</div>';
        
        const response = await fetch('/api/estudiantes');
        const data = await response.json();
        
        if (data.success) {
            if (data.estudiantes.length === 0) {
                listaDiv.innerHTML = '<div class="model-field">📝 No hay estudiantes registrados</div>';
            } else {
                let html = `<div class="model-field">📊 Total de estudiantes: ${data.estudiantes.length}</div>`;
                data.estudiantes.forEach((estudiante, index) => {
                    html += `
                        <div class="model-field">
                            ${index + 1}. ${estudiante.nomEstudiante} - ${estudiante.dirEstudiante}, ${estudiante.ciuEstudiante}
                        </div>
                    `;
                });
                listaDiv.innerHTML = html;
            }
        } else {
            listaDiv.innerHTML = `<div class="model-field error">❌ Error: ${data.error}</div>`;
        }
    } catch (error) {
        listaDiv.innerHTML = `<div class="model-field error">❌ Error de conexión: ${error.message}</div>`;
    }
}

// Funciones para microservicios (mantienen la funcionalidad original)
function toggleService(serviceName) {
    const serviceElement = event.target;
    if (serviceElement.classList.contains('active')) {
        serviceElement.classList.remove('active');
        serviceElement.textContent = '● INACTIVE';
        serviceElement.style.backgroundColor = '#dc3545';
    } else {
        serviceElement.classList.add('active');
        serviceElement.textContent = '● ACTIVE';
        serviceElement.style.backgroundColor = '#28a745';
    }
}

function simulateServiceCall() {
    const logDiv = document.getElementById('communication-log');
    const steps = [
        'Iniciando llamada al User Service...',
        'User Service: Validando autenticación ✓',
        'Llamando al Order Service...',
        'Order Service: Procesando pedido ✓',
        'Llamando al Payment Service...',
        'Payment Service: Procesando pago ✓',
        'Respuesta exitosa recibida'
    ];
    
    let stepIndex = 0;
    logDiv.innerHTML = '';
    
    const interval = setInterval(() => {
        if (stepIndex < steps.length) {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'model-field';
            stepDiv.textContent = steps[stepIndex];
            logDiv.appendChild(stepDiv);
            stepIndex++;
        } else {
            clearInterval(interval);
        }
    }, 800);
}