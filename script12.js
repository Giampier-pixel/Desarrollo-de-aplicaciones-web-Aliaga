
        // Variables globales
        let usuariosRegistrados = [];
        let isAuthenticated = true;
        let sessionId = 'sess_7829abc123';
        let middlewareLogEntries = [];

        // Inicializar la aplicación
        document.addEventListener('DOMContentLoaded', function() {
            inicializarDatos();
            actualizarTablaAdmin();
            actualizarTiempo();
            
            // Event listener para el formulario
            document.getElementById('registroForm').addEventListener('submit', manejarRegistro);
        });

        // Datos iniciales
        function inicializarDatos() {
            usuariosRegistrados = [
                {
                    id: 1,
                    nombre: 'Juan Pérez',
                    email: 'juan@email.com',
                    categoria: 'profesional',
                    registro: '2024-07-10',
                    activo: true
                },
                {
                    id: 2,
                    nombre: 'María García',
                    email: 'maria@email.com',
                    categoria: 'estudiante',
                    registro: '2024-07-09',
                    activo: true
                },
                {
                    id: 3,
                    nombre: 'Carlos López',
                    email: 'carlos@email.com',
                    categoria: 'empresario',
                    registro: '2024-07-08',
                    activo: false
                }
            ];

            middlewareLogEntries = [
                '[2024-07-11 14:30:25] AuthMiddleware: Usuario autenticado',
                '[2024-07-11 14:30:25] SessionMiddleware: Sesión iniciada',
                '[2024-07-11 14:30:25] SecurityMiddleware: Headers de seguridad aplicados'
            ];
        }

        // Validaciones del formulario
        function validarFormulario(formData) {
            const errores = {};
            
            // Validar nombre
            if (!formData.nombre.trim()) {
                errores.nombre = 'El nombre es requerido';
            } else if (formData.nombre.length < 2) {
                errores.nombre = 'El nombre debe tener al menos 2 caracteres';
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email.trim()) {
                errores.email = 'El email es requerido';
            } else if (!emailRegex.test(formData.email)) {
                errores.email = 'Formato de email inválido';
            } else if (usuariosRegistrados.some(u => u.email === formData.email)) {
                errores.email = 'Este email ya está registrado';
            }
            
            // Validar teléfono
            const telefonoRegex = /^\+?[\d\s-()]{10,}$/;
            if (!formData.telefono.trim()) {
                errores.telefono = 'El teléfono es requerido';
            } else if (!telefonoRegex.test(formData.telefono)) {
                errores.telefono = 'Formato de teléfono inválido';
            }
            
            // Validar edad
            const edad = parseInt(formData.edad);
            if (!edad || edad < 18) {
                errores.edad = 'Debe ser mayor de edad (18+)';
            } else if (edad > 100) {
                errores.edad = 'Edad máxima permitida: 100 años';
            }
            
            // Validar categoría
            if (!formData.categoria) {
                errores.categoria = 'Debe seleccionar una categoría';
            }
            
            return errores;
        }

        // Manejar registro del formulario
        function manejarRegistro(e) {
            e.preventDefault();
            
            // Limpiar errores previos
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
                el.parentElement.classList.remove('error');
            });
            
            // Obtener datos del formulario
            const formData = new FormData(e.target);
            const datos = Object.fromEntries(formData);
            
            // Validar datos
            const errores = validarFormulario(datos);
            
            if (Object.keys(errores).length > 0) {
                // Mostrar errores
                Object.keys(errores).forEach(campo => {
                    const errorElement = document.getElementById(campo + 'Error');
                    const inputElement = document.getElementById(campo);
                    
                    if (errorElement && inputElement) {
                        errorElement.textContent = errores[campo];
                        inputElement.parentElement.classList.add('error');
                    }
                });
                
                // Simular log de middleware
                agregarLogMiddleware(`[${new Date().toISOString()}] ValidationMiddleware: Errores de validación detectados`);
                return;
            }
            
            // Agregar usuario
            const nuevoUsuario = {
                id: usuariosRegistrados.length + 1,
                nombre: datos.nombre,
                email: datos.email,
                categoria: datos.categoria,
                registro: new Date().toISOString().split('T')[0],
                activo: true
            };
            
            usuariosRegistrados.push(nuevoUsuario);
            
            // Actualizar tabla admin
            actualizarTablaAdmin();
            
            // Limpiar formulario
            e.target.reset();
            
            // Mostrar mensaje de éxito
            alert('¡Usuario registrado exitosamente!');
            
            // Simular log de middleware
            agregarLogMiddleware(`[${new Date().toISOString()}] UserMiddleware: Usuario ${datos.nombre} registrado`);
            agregarLogMiddleware(`[${new Date().toISOString()}] SessionMiddleware: Sesión actualizada`);
        }

        // Actualizar tabla del admin
        function actualizarTablaAdmin() {
            const tbody = document.getElementById('adminTableBody');
            tbody.innerHTML = '';
            
            usuariosRegistrados.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.categoria}</td>
                    <td>${usuario.registro}</td>
                    <td>${usuario.activo ? '✅' : '❌'}</td>
                    <td>
                        <button class="btn btn-secondary" onclick="toggleUsuario(${usuario.id})" style="padding: 5px 10px; font-size: 12px;">
                            ${usuario.activo ? 'Desactivar' : 'Activar'}
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        // Toggle estado de usuario
        function toggleUsuario(id) {
            const usuario = usuariosRegistrados.find(u => u.id === id);
            if (usuario) {
                usuario.activo = !usuario.activo;
                actualizarTablaAdmin();
                agregarLogMiddleware(`[${new Date().toISOString()}] AdminMiddleware: Usuario ${usuario.nombre} ${usuario.activo ? 'activado' : 'desactivado'}`);
            }
        }

        // Toggle autenticación
        function toggleAuth() {
            isAuthenticated = !isAuthenticated;
            const statusElement = document.getElementById('sessionStatus');
            
            if (isAuthenticated) {
                statusElement.textContent = 'Autenticado';
                statusElement.className = 'auth-status authenticated';
                agregarLogMiddleware(`[${new Date().toISOString()}] AuthMiddleware: Usuario autenticado`);
            } else {
                statusElement.textContent = 'No Autenticado';
                statusElement.className = 'auth-status unauthenticated';
                agregarLogMiddleware(`[${new Date().toISOString()}] AuthMiddleware: Sesión cerrada`);
            }
        }

        // Agregar usuario demo
        function agregarUsuarioDemo() {
            const nombres = ['Ana Torres', 'Pedro Ruiz', 'Laura Morales', 'Diego Vargas'];
            const emails = ['ana@demo.com', 'pedro@demo.com', 'laura@demo.com', 'diego@demo.com'];
            const categorias = ['estudiante', 'profesional', 'empresario'];
            
            const randomIndex = Math.floor(Math.random() * nombres.length);
            const nuevoUsuario = {
                id: usuariosRegistrados.length + 1,
                nombre: nombres[randomIndex],
                email: emails[randomIndex],
                categoria: categorias[Math.floor(Math.random() * categorias.length)],
                registro: new Date().toISOString().split('T')[0],
                activo: true
            };
            
            usuariosRegistrados.push(nuevoUsuario);
            actualizarTablaAdmin();
            agregarLogMiddleware(`[${new Date().toISOString()}] AdminMiddleware: Usuario demo ${nuevoUsuario.nombre} agregado`);
        }

        // Limpiar tabla
        function limpiarTabla() {
            usuariosRegistrados = [];
            actualizarTablaAdmin();
            agregarLogMiddleware(`[${new Date().toISOString()}] AdminMiddleware: Tabla de usuarios limpiada`);
        }

        // Limpiar formulario
        function limpiarFormulario() {
            document.getElementById('registroForm').reset();
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
                el.parentElement.classList.remove('error');
            });
            agregarLogMiddleware(`[${new Date().toISOString()}] FormMiddleware: Formulario limpiado`);
        }

        // Simular petición HTTP
        function simularPeticion() {
            const metodos = ['GET', 'POST', 'PUT', 'DELETE'];
            const rutas = ['/api/usuarios', '/api/perfil', '/admin/usuarios', '/api/auth'];
            const estados = [200, 201, 400, 401, 403, 404, 500];
            
            const metodo = metodos[Math.floor(Math.random() * metodos.length)];
            const ruta = rutas[Math.floor(Math.random() * rutas.length)];
            const estado = estados[Math.floor(Math.random() * estados.length)];
            
            const timestamp = new Date().toISOString();
            
            agregarLogMiddleware(`[${timestamp}] RequestMiddleware: ${metodo} ${ruta}`);
            
            if (!isAuthenticated && (ruta.includes('/admin') || ruta.includes('/api'))) {
                agregarLogMiddleware(`[${timestamp}] AuthMiddleware: Acceso denegado - No autenticado`);
                agregarLogMiddleware(`[${timestamp}] ResponseMiddleware: 401 Unauthorized`);
            } else {
                agregarLogMiddleware(`[${timestamp}] SecurityMiddleware: Headers de seguridad aplicados`);
                agregarLogMiddleware(`[${timestamp}] SessionMiddleware: Sesión validada`);
                agregarLogMiddleware(`[${timestamp}] ResponseMiddleware: ${estado} ${getStatusText(estado)}`);
            }
            
            // Actualizar última actividad
            document.getElementById('lastActivity').textContent = new Date().toLocaleString();
        }

        // Obtener texto del estado HTTP
        function getStatusText(code) {
            const statusTexts = {
                200: 'OK',
                201: 'Created',
                400: 'Bad Request',
                401: 'Unauthorized',
                403: 'Forbidden',
                404: 'Not Found',
                500: 'Internal Server Error'
            };
            return statusTexts[code] || 'Unknown';
        }

        // Agregar entrada al log de middleware
        function agregarLogMiddleware(entrada) {
            middlewareLogEntries.push(entrada);
            
            // Mantener solo las últimas 10 entradas
            if (middlewareLogEntries.length > 10) {
                middlewareLogEntries.shift();
            }
            
            actualizarLogMiddleware();
        }

        // Actualizar display del log
        function actualizarLogMiddleware() {
            const logContainer = document.getElementById('middlewareLog');
            logContainer.innerHTML = '';
            
            middlewareLogEntries.forEach(entrada => {
                const div = document.createElement('div');
                div.textContent = entrada;
                
                // Colorear según tipo de mensaje
                if (entrada.includes('Error') || entrada.includes('401') || entrada.includes('403') || entrada.includes('500')) {
                    div.style.color = '#e74c3c';
                } else if (entrada.includes('200') || entrada.includes('201') || entrada.includes('autenticado')) {
                    div.style.color = '#27ae60';
                } else if (entrada.includes('Warning') || entrada.includes('400') || entrada.includes('404')) {
                    div.style.color = '#f39c12';
                } else {
                    div.style.color = '#ecf0f1';
                }
                
                logContainer.appendChild(div);
            });
            
            // Scroll al final
            logContainer.scrollTop = logContainer.scrollHeight;
        }

        // Limpiar log
        function limpiarLog() {
            middlewareLogEntries = [];
            actualizarLogMiddleware();
            agregarLogMiddleware(`[${new Date().toISOString()}] SystemMiddleware: Log limpiado`);
        }

        // Actualizar tiempo cada segundo
        function actualizarTiempo() {
            setInterval(() => {
                document.getElementById('lastActivity').textContent = new Date().toLocaleString();
            }, 1000);
        }

        // Funciones adicionales de utilidad
        function sanitizarDatos(datos) {
            const sanitized = {};
            for (const [key, value] of Object.entries(datos)) {
                if (typeof value === 'string') {
                    // Sanitizar HTML básico
                    sanitized[key] = value
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#x27;')
                        .trim();
                } else {
                    sanitized[key] = value;
                }
            }
            return sanitized;
        }

        // Generar ID de sesión aleatoria
        function generarSessionId() {
            return 'sess_' + Math.random().toString(36).substr(2, 9);
        }

        // Simular renovación de sesión
        function renovarSesion() {
            sessionId = generarSessionId();
            document.getElementById('sessionId').textContent = sessionId;
            agregarLogMiddleware(`[${new Date().toISOString()}] SessionMiddleware: Sesión renovada - ${sessionId}`);
        }

        // Configurar renovación automática de sesión cada 30 segundos
        setInterval(renovarSesion, 30000);

        // Simular carga de datos inicial
        window.addEventListener('load', function() {
            setTimeout(() => {
                agregarLogMiddleware(`[${new Date().toISOString()}] SystemMiddleware: Aplicación cargada completamente`);
            }, 1000);
        });

        // Manejar errores globales
        window.addEventListener('error', function(e) {
            agregarLogMiddleware(`[${new Date().toISOString()}] ErrorMiddleware: ${e.message}`);
        });

        // Detectar cuando el usuario está a punto de salir
        window.addEventListener('beforeunload', function(e) {
            agregarLogMiddleware(`[${new Date().toISOString()}] SessionMiddleware: Usuario saliendo de la aplicación`);
        });
    