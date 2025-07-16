// ===== EJERCICIO 1: FORMULARIO DE REGISTRO =====
function registrarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const edad = parseInt(document.getElementById('edad').value);
    const categoria = document.getElementById('categoria').value;
    const resultDiv = document.getElementById('registroInfo');
    
    // Validaciones
    let errores = [];
    
    if (!nombre || nombre.length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }
    
    if (!email || !isValidEmail(email)) {
        errores.push("Email inválido");
    }
    
    if (!telefono || telefono.length < 9) {
        errores.push("Teléfono debe tener al menos 9 dígitos");
    }
    
    if (!edad || edad < 18) {
        errores.push("Debe ser mayor de edad (18+)");
    }
    
    if (!categoria) {
        errores.push("Debe seleccionar una categoría");
    }
    
    // Simular verificación de email existente (incluyendo usuarios registrados)
    const emailsExistentes = ['test@email.com', 'user@example.com'];
    const emailsRegistrados = usuariosRegistrados.map(u => u.email);
    const todosEmails = [...emailsExistentes, ...emailsRegistrados];
    
    if (todosEmails.includes(email)) {
        errores.push("Este email ya está registrado");
    }
    
    if (errores.length > 0) {
        resultDiv.innerHTML = `
            <div style="color: #e74c3c; padding: 10px; background: #fdf2f2; border-radius: 5px;">
                <strong>❌ Errores de validación:</strong><br>
                ${errores.map(error => `• ${error}`).join('<br>')}
            </div>
        `;
        return;
    }
    
    // Registro exitoso
    const nuevoUsuario = {
        id: Date.now(), // ID único basado en timestamp
        nombre: nombre,
        email: email,
        categoria: categoria,
        activo: true,
        fecha: new Date().toISOString().split('T')[0]
    };
    
    // Agregar usuario al array global
    usuariosRegistrados.push(nuevoUsuario);
    
    resultDiv.innerHTML = `
        <div style="color: #27ae60; padding: 10px; background: #f2fdf4; border-radius: 5px;">
            <strong>✅ Usuario registrado exitosamente!</strong><br>
            <strong>Nombre:</strong> ${nombre}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Teléfono:</strong> ${telefono}<br>
            <strong>Edad:</strong> ${edad} años<br>
            <strong>Categoría:</strong> ${categoria}<br>
            <em>Datos validados y sanitizados correctamente</em><br>
            <small style="color: #666;">Usuario agregado al sistema admin</small>
        </div>
    `;
    
    // Limpiar formulario
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('categoria').value = '';
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ===== EJERCICIO 2: DJANGO ADMIN PANEL =====
// Array global para almacenar usuarios registrados
let usuariosRegistrados = [];

function filtrarAdmin() {
    const filtro = document.getElementById('adminFilter').value;
    const busqueda = document.getElementById('adminSearch').value.toLowerCase();
    const resultDiv = document.getElementById('adminInfo');
    
    // Datos simulados de usuarios base + usuarios registrados
    const usuariosBase = [
        { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com', categoria: 'estudiante', activo: true, fecha: '2024-01-15' },
        { id: 2, nombre: 'María García', email: 'maria@email.com', categoria: 'profesional', activo: true, fecha: '2024-01-20' },
        { id: 3, nombre: 'Carlos López', email: 'carlos@email.com', categoria: 'empresario', activo: false, fecha: '2024-01-25' },
        { id: 4, nombre: 'Ana Rodríguez', email: 'ana@email.com', categoria: 'estudiante', activo: true, fecha: '2024-02-01' },
        { id: 5, nombre: 'Luis Martínez', email: 'luis@email.com', categoria: 'profesional', activo: true, fecha: '2024-02-05' }
    ];
    
    // Combinar usuarios base con usuarios registrados
    const usuarios = [...usuariosBase, ...usuariosRegistrados];
    
    let usuariosFiltrados = usuarios;
    
    // Aplicar filtro
    if (filtro !== 'todos') {
        if (filtro === 'activos') {
            usuariosFiltrados = usuariosFiltrados.filter(user => user.activo);
        } else if (filtro === 'estudiantes') {
            usuariosFiltrados = usuariosFiltrados.filter(user => user.categoria === 'estudiante');
        } else if (filtro === 'profesionales') {
            usuariosFiltrados = usuariosFiltrados.filter(user => user.categoria === 'profesional');
        } else if (filtro === 'empresarios') {
            usuariosFiltrados = usuariosFiltrados.filter(user => user.categoria === 'empresario');
        }
    }
    
    // Aplicar búsqueda
    if (busqueda) {
        usuariosFiltrados = usuariosFiltrados.filter(user => 
            user.nombre.toLowerCase().includes(busqueda) || 
            user.email.toLowerCase().includes(busqueda)
        );
    }
    
    // Mostrar resultados
    if (usuariosFiltrados.length === 0) {
        resultDiv.innerHTML = `
            <div style="color: #f39c12; padding: 10px; background: #fef9e7; border-radius: 5px;">
                <strong>⚠️ No se encontraron usuarios</strong><br>
                Pruebe con otros filtros o términos de búsqueda
            </div>
        `;
        return;
    }
    
    const tablaHTML = `
        <div style="padding: 10px; background: #f8f9fa; border-radius: 5px; overflow-x: auto;">
            <strong>📊 Usuarios encontrados: ${usuariosFiltrados.length}</strong><br><br>
            <div style="overflow-x: auto; max-width: 100%;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px; min-width: 600px;">
                    <thead>
                        <tr style="background: #e9ecef;">
                            <th style="padding: 6px; border: 1px solid #dee2e6; font-size: 11px;">ID</th>
                            <th style="padding: 6px; border: 1px solid #dee2e6; font-size: 11px;">Nombre</th>
                            <th style="padding: 6px; border: 1px solid #dee2e6; font-size: 11px;">Email</th>
                            <th style="padding: 6px; border: 1px solid #dee2e6; font-size: 11px;">Categoría</th>
                            <th style="padding: 6px; border: 1px solid #dee2e6; font-size: 11px;">Estado</th>
                            <th style="padding: 6px; border: 1px solid #dee2e6; font-size: 11px;">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usuariosFiltrados.map(user => `
                            <tr>
                                <td style="padding: 6px; border: 1px solid #dee2e6; font-size: 10px; max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${user.id.toString().substring(0, 8)}...</td>
                                <td style="padding: 6px; border: 1px solid #dee2e6; font-size: 11px; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${user.nombre}</td>
                                <td style="padding: 6px; border: 1px solid #dee2e6; font-size: 10px; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${user.email}</td>
                                <td style="padding: 6px; border: 1px solid #dee2e6; font-size: 11px; text-align: center;">${user.categoria}</td>
                                <td style="padding: 6px; border: 1px solid #dee2e6; font-size: 11px; text-align: center;">
                                    <span style="color: ${user.activo ? '#27ae60' : '#e74c3c'};">
                                        ${user.activo ? '✅' : '❌'}
                                    </span>
                                </td>
                                <td style="padding: 6px; border: 1px solid #dee2e6; font-size: 10px; text-align: center;">${user.fecha}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = tablaHTML;
}

// ===== EJERCICIO 3: MIDDLEWARE Y SESIONES =====
function ejecutarMiddleware() {
    const accion = document.getElementById('middlewareAction').value;
    const resultDiv = document.getElementById('middlewareInfo');
    
    switch (accion) {
        case 'request':
            simularRequest(resultDiv);
            break;
        case 'auth':
            verificarAutenticacion(resultDiv);
            break;
        case 'session':
            actualizarSesion(resultDiv);
            break;
        case 'log':
            mostrarLogs(resultDiv);
            break;
        default:
            resultDiv.innerHTML = "Seleccione una acción válida";
    }
}

function simularRequest(resultDiv) {
    const timestamp = new Date().toLocaleString();
    const ip = '192.168.1.' + Math.floor(Math.random() * 255);
    const userAgent = navigator.userAgent.substring(0, 50) + '...';
    
    resultDiv.innerHTML = `
        <div style="color: #3498db; padding: 10px; background: #f4f8fb; border-radius: 5px; font-family: monospace;">
            <strong>🔍 LoggingMiddleware - Request Process</strong><br>
            <strong>Timestamp:</strong> ${timestamp}<br>
            <strong>Method:</strong> POST<br>
            <strong>Path:</strong> /registro/<br>
            <strong>User:</strong> user_123<br>
            <strong>IP:</strong> ${ip}<br>
            <strong>User-Agent:</strong> ${userAgent}<br>
            <strong>Status:</strong> Request procesado correctamente
        </div>
    `;
}

function verificarAutenticacion(resultDiv) {
    const isAuthenticated = Math.random() > 0.5; // Simular autenticación aleatoria
    
    if (isAuthenticated) {
        resultDiv.innerHTML = `
            <div style="color: #27ae60; padding: 10px; background: #f2fdf4; border-radius: 5px;">
                <strong>✅ AuthRequiredMiddleware - Autenticación Exitosa</strong><br>
                <strong>Usuario:</strong> admin_user<br>
                <strong>Permisos:</strong> ['is_authenticated', 'is_staff']<br>
                <strong>Sesión:</strong> session_abc123<br>
                <strong>Última actividad:</strong> ${new Date().toLocaleString()}<br>
                <strong>Resultado:</strong> Acceso permitido al panel administrativo
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div style="color: #e74c3c; padding: 10px; background: #fdf2f2; border-radius: 5px;">
                <strong>❌ AuthRequiredMiddleware - Acceso Denegado</strong><br>
                <strong>Usuario:</strong> anonymous<br>
                <strong>Permisos:</strong> []<br>
                <strong>Sesión:</strong> null<br>
                <strong>Resultado:</strong> HttpResponseForbidden("Acceso denegado")<br>
                <strong>Redirigir a:</strong> /login/
            </div>
        `;
    }
}

function actualizarSesion(resultDiv) {
    const sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
    const sessionData = {
        user_id: Math.floor(Math.random() * 1000),
        login_time: new Date().toISOString(),
        last_activity: new Date().toISOString(),
        ip_address: '192.168.1.' + Math.floor(Math.random() * 255)
    };
    
    resultDiv.innerHTML = `
        <div style="color: #9b59b6; padding: 10px; background: #f8f4fd; border-radius: 5px;">
            <strong>🔄 Session Management - Sesión Actualizada</strong><br>
            <strong>Session ID:</strong> ${sessionId}<br>
            <strong>User ID:</strong> ${sessionData.user_id}<br>
            <strong>Login Time:</strong> ${sessionData.login_time}<br>
            <strong>Last Activity:</strong> ${sessionData.last_activity}<br>
            <strong>IP Address:</strong> ${sessionData.ip_address}<br>
            <strong>Status:</strong> Sesión activa y válida<br>
            <strong>Expires:</strong> ${new Date(Date.now() + 24*60*60*1000).toISOString()}
        </div>
    `;
}

function mostrarLogs(resultDiv) {
    const logs = [
        { level: 'INFO', message: 'Request: GET /admin/', timestamp: new Date(Date.now() - 10000).toLocaleString() },
        { level: 'INFO', message: 'User: admin_user authenticated', timestamp: new Date(Date.now() - 8000).toLocaleString() },
        { level: 'WARNING', message: 'Multiple login attempts detected', timestamp: new Date(Date.now() - 5000).toLocaleString() },
        { level: 'INFO', message: 'Response: 200 OK', timestamp: new Date(Date.now() - 2000).toLocaleString() },
        { level: 'ERROR', message: 'Invalid form data received', timestamp: new Date().toLocaleString() }
    ];
    
    const logsHTML = logs.map(log => {
        const color = log.level === 'ERROR' ? '#e74c3c' : 
                     log.level === 'WARNING' ? '#f39c12' : '#27ae60';
        return `
            <div style="margin: 5px 0; padding: 5px; border-left: 3px solid ${color};">
                <strong style="color: ${color};">[${log.level}]</strong> ${log.timestamp}<br>
                ${log.message}
            </div>
        `;
    }).join('');
    
    resultDiv.innerHTML = `
        <div style="padding: 10px; background: #f8f9fa; border-radius: 5px; font-family: monospace;">
            <strong>📋 Django Logs - Últimas 5 entradas</strong><br><br>
            ${logsHTML}
        </div>
    `;
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Django Backend Interactive Script loaded successfully!');
    
    // Inicializar mensajes por defecto
    document.getElementById('registroInfo').innerHTML = 'Complete el formulario para registrar un usuario';
    document.getElementById('adminInfo').innerHTML = 'Use los filtros para explorar el panel administrativo';
    document.getElementById('middlewareInfo').innerHTML = 'Seleccione una acción para simular el middleware';
    
    // Agregar event listeners para mejorar la experiencia
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const card = this.closest('.exercise-card');
                if (card) {
                    const button = card.querySelector('button');
                    if (button) button.click();
                }
            }
        });
    });
});

// ===== UTILIDADES ADICIONALES =====
function limpiarFormularios() {
    document.querySelectorAll('input, select').forEach(element => {
        element.value = '';
    });
    
    document.querySelectorAll('.result-display div').forEach(div => {
        if (div.id.includes('Info')) {
            div.innerHTML = 'Formulario limpiado';
        }
    });
}

function mostrarEstadisticas() {
    const stats = {
        totalUsuarios: 127,
        usuariosActivos: 98,
        sesionesActivas: 23,
        requestsHoy: 1456,
        erroresHoy: 12
    };
    
    console.log('📊 Estadísticas del Sistema Django:', stats);
    return stats;
}