// script13.js - Funcionalidad para simuladores Laravel PHP

// Array para almacenar estudiantes registrados
let estudiantes = [];

// Función para registrar estudiante
function registrarEstudiante() {
    const nombre = document.getElementById('nombre').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();

    // Validaciones
    if (!nombre || !direccion || !ciudad) {
        alert('Por favor, complete todos los campos');
        return;
    }

    if (nombre.length < 2) {
        alert('El nombre debe tener al menos 2 caracteres');
        return;
    }

    // Crear objeto estudiante
    const estudiante = {
        id: Date.now(),
        nombre: nombre,
        direccion: direccion,
        ciudad: ciudad,
        fechaRegistro: new Date().toLocaleString()
    };

    // Agregar al array
    estudiantes.push(estudiante);

    // Actualizar vista
    actualizarListaEstudiantes();

    // Limpiar formulario
    document.getElementById('nombre').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('ciudad').value = '';

    // Mostrar mensaje de éxito
    mostrarMensaje('✅ Estudiante registrado exitosamente', 'success');
}

// Función para actualizar la lista de estudiantes
function actualizarListaEstudiantes() {
    const lista = document.getElementById('listaEstudiantes');
    const contador = document.getElementById('contadorEstudiantes');
    
    if (estudiantes.length === 0) {
        lista.innerHTML = '<div style="color: #666; font-style: italic;">No hay estudiantes registrados</div>';
        contador.innerHTML = '';
        return;
    }

    let html = '<div style="max-height: 300px; overflow-y: auto;">';
    estudiantes.forEach((estudiante, index) => {
        html += `
            <div style="background: #f8f9fa; margin: 5px 0; padding: 10px; border-radius: 5px; border-left: 4px solid #007bff;">
                <strong>${estudiante.nombre}</strong><br>
                <small style="color: #666;">
                    📍 ${estudiante.direccion}, ${estudiante.ciudad}<br>
                    🕒 Registrado: ${estudiante.fechaRegistro}
                </small>
                <button onclick="eliminarEstudiante(${index})" style="float: right; background: #dc3545; color: white; border: none; padding: 2px 6px; border-radius: 3px; font-size: 12px; cursor: pointer;">
                    ❌
                </button>
            </div>
        `;
    });
    html += '</div>';
    
    lista.innerHTML = html;
    contador.innerHTML = `📊 Total de estudiantes: ${estudiantes.length}`;
}

// Función para eliminar estudiante
function eliminarEstudiante(index) {
    if (confirm('¿Está seguro de eliminar este estudiante?')) {
        estudiantes.splice(index, 1);
        actualizarListaEstudiantes();
        mostrarMensaje('🗑️ Estudiante eliminado', 'warning');
    }
}

// Función para limpiar lista
function limpiarLista() {
    if (estudiantes.length === 0) {
        alert('No hay estudiantes para eliminar');
        return;
    }
    
    if (confirm('¿Está seguro de eliminar todos los estudiantes?')) {
        estudiantes = [];
        actualizarListaEstudiantes();
        mostrarMensaje('🧹 Lista limpiada completamente', 'info');
    }
}

// Función para ejecutar comandos Artisan
function ejecutarComando() {
    const comando = document.getElementById('artisanCommand').value;
    const output = document.getElementById('commandOutput');
    
    // Simular respuestas de comandos Artisan
    const respuestas = {
        'migrate': `
            <div style="background: #d4edda; padding: 10px; border-radius: 5px; font-family: monospace;">
                Migration table created successfully.<br>
                Migrating: 2024_01_01_000000_create_estudiantes_table<br>
                Migrated:  2024_01_01_000000_create_estudiantes_table (45.67ms)<br>
                <span style="color: #28a745;">✅ Migrations completed successfully!</span>
            </div>
        `,
        'serve': `
            <div style="background: #d1ecf1; padding: 10px; border-radius: 5px; font-family: monospace;">
                Laravel development server started:<br>
                <strong style="color: #0c5460;">http://127.0.0.1:8000</strong><br>
                [Press Ctrl+C to quit]<br>
                <span style="color: #17a2b8;">🚀 Server is running!</span>
            </div>
        `,
        'make:controller': `
            <div style="background: #fff3cd; padding: 10px; border-radius: 5px; font-family: monospace;">
                Controller created successfully.<br>
                Created: app/Http/Controllers/EstudianteController.php<br>
                <span style="color: #856404;">📁 Controller ready to use!</span>
            </div>
        `,
        'make:model': `
            <div style="background: #e2e3e5; padding: 10px; border-radius: 5px; font-family: monospace;">
                Model created successfully.<br>
                Created: app/Models/Estudiante.php<br>
                Migration created successfully.<br>
                Created: database/migrations/2024_01_01_000000_create_estudiantes_table.php<br>
                <span style="color: #6c757d;">🏗️ Model and migration created!</span>
            </div>
        `,
        'route:list': `
            <div style="background: #f8d7da; padding: 10px; border-radius: 5px; font-family: monospace; font-size: 12px;">
                +--------+----------+----------+------+---------+------------+<br>
                | Domain | Method   | URI      | Name | Action  | Middleware |<br>
                +--------+----------+----------+------+---------+------------+<br>
                |        | GET|HEAD | /        |      | EstudianteController@create | web |<br>
                |        | POST     | /guardar |      | EstudianteController@store  | web |<br>
                +--------+----------+----------+------+---------+------------+<br>
                <span style="color: #721c24;">📋 Routes listed successfully!</span>
            </div>
        `
    };
    
    output.innerHTML = respuestas[comando] || '<div style="color: #dc3545;">❌ Comando no encontrado</div>';
    
    // Simular tiempo de carga
    output.innerHTML = '<div style="color: #6c757d;">⏳ Ejecutando comando...</div>';
    setTimeout(() => {
        output.innerHTML = respuestas[comando];
    }, 1000);
}

// Función para testear rutas
function testearRuta() {
    const ruta = document.getElementById('routeType').value;
    const response = document.getElementById('routeResponse');
    
    const respuestas = {
        'GET /': `
            <div style="background: #d4edda; padding: 10px; border-radius: 5px;">
                <strong>HTTP 200 OK</strong><br>
                Content-Type: text/html<br>
                <pre style="margin: 10px 0; background: #f8f9fa; padding: 5px;">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;Registro de Estudiantes&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;...formulario renderizado...&lt;/body&gt;
&lt;/html&gt;</pre>
                <span style="color: #28a745;">✅ Formulario mostrado correctamente</span>
            </div>
        `,
        'POST /guardar': `
            <div style="background: #d1ecf1; padding: 10px; border-radius: 5px;">
                <strong>HTTP 302 Redirect</strong><br>
                Location: /<br>
                Set-Cookie: laravel_session=...<br>
                <div style="margin: 10px 0; padding: 5px; background: #b8daff; border-radius: 3px;">
                    Flash message: "Estudiante registrado exitosamente"
                </div>
                <span style="color: #0c5460;">↩️ Redirigido con mensaje de éxito</span>
            </div>
        `,
        'GET /api/estudiantes': `
            <div style="background: #fff3cd; padding: 10px; border-radius: 5px;">
                <strong>HTTP 200 OK</strong><br>
                Content-Type: application/json<br>
                <pre style="margin: 10px 0; background: #f8f9fa; padding: 5px; font-size: 12px;">
{
  "data": [
    {
      "idEstudiante": 1,
      "nomEstudiante": "Juan Pérez",
      "dirEstudiante": "Av. Principal 123",
      "ciuEstudiante": "Lima",
      "created_at": "2024-01-01T10:00:00.000000Z"
    }
  ],
  "total": 1
}</pre>
                <span style="color: #856404;">📊 JSON response generado</span>
            </div>
        `,
        'GET /api/estudiantes/1': `
            <div style="background: #e2e3e5; padding: 10px; border-radius: 5px;">
                <strong>HTTP 200 OK</strong><br>
                Content-Type: application/json<br>
                <pre style="margin: 10px 0; background: #f8f9fa; padding: 5px; font-size: 12px;">
{
  "idEstudiante": 1,
  "nomEstudiante": "Juan Pérez",
  "dirEstudiante": "Av. Principal 123",
  "ciuEstudiante": "Lima",
  "created_at": "2024-01-01T10:00:00.000000Z",
  "updated_at": "2024-01-01T10:00:00.000000Z"
}</pre>
                <span style="color: #6c757d;">🔍 Estudiante encontrado</span>
            </div>
        `
    };
    
    response.innerHTML = '<div style="color: #6c757d;">⏳ Procesando solicitud...</div>';
    
    setTimeout(() => {
        response.innerHTML = respuestas[ruta] || '<div style="color: #dc3545;">❌ Ruta no encontrada</div>';
    }, 800);
}

// Función para mostrar mensajes temporales
function mostrarMensaje(mensaje, tipo = 'info') {
    const colores = {
        'success': '#d4edda',
        'warning': '#fff3cd',
        'info': '#d1ecf1',
        'error': '#f8d7da'
    };
    
    const div = document.createElement('div');
    div.innerHTML = mensaje;
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colores[tipo] || colores.info};
        padding: 12px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(div);
    
    setTimeout(() => {
        div.style.opacity = '0';
        div.style.transform = 'translateX(100%)';
        setTimeout(() => div.remove(), 300);
    }, 3000);
}

// Event listeners para Enter key
document.addEventListener('DOMContentLoaded', function() {
    const inputs = ['nombre', 'direccion', 'ciudad'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    registrarEstudiante();
                }
            });
        }
    });
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        mostrarMensaje('🎉 Simulador Laravel PHP listo para usar', 'success');
    }, 500);
});