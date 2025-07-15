
        // Simulador de usuarios
        let usuarios = [];

        function agregarUsuario() {
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const edad = document.getElementById('edad').value;

            if (nombre && email && edad) {
                const usuario = {
                    id: usuarios.length + 1,
                    nombre: nombre,
                    email: email,
                    edad: parseInt(edad)
                };
                
                usuarios.push(usuario);
                mostrarUsuarios();
                limpiarFormulario();
            } else {
                alert('Por favor, complete todos los campos');
            }
        }

        function mostrarUsuarios() {
            const lista = document.getElementById('listaUsuarios');
            if (usuarios.length === 0) {
                lista.innerHTML = '<em>No hay usuarios registrados</em>';
                return;
            }

            let html = '<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
            html += '<tr style="background-color: #667eea; color: white;"><th>ID</th><th>Nombre</th><th>Email</th><th>Edad</th></tr>';
            
            usuarios.forEach(usuario => {
                html += `<tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px; text-align: center;">${usuario.id}</td>
                    <td style="padding: 8px;">${usuario.nombre}</td>
                    <td style="padding: 8px;">${usuario.email}</td>
                    <td style="padding: 8px; text-align: center;">${usuario.edad}</td>
                </tr>`;
            });
            
            html += '</table>';
            lista.innerHTML = html;
        }

        function limpiarFormulario() {
            document.getElementById('nombre').value = '';
            document.getElementById('email').value = '';
            document.getElementById('edad').value = '';
        }

        // Simulador de autenticación
        const usuariosAuth = {
            'admin': 'password123',
            'user': 'user123',
            'demo': 'demo123'
        };

        function autenticar() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const statusDiv = document.getElementById('authStatus');

            if (!username || !password) {
                statusDiv.innerHTML = '<span style="color: red;">Por favor, ingrese usuario y contraseña</span>';
                return;
            }

            setTimeout(() => {
                if (usuariosAuth[username] && usuariosAuth[username] === password) {
                    statusDiv.innerHTML = `<span style="color: green;">✅ Autenticación exitosa para: ${username}</span>`;
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                } else {
                    statusDiv.innerHTML = '<span style="color: red;">❌ Credenciales incorrectas</span>';
                }
            }, 1000);

            statusDiv.innerHTML = '<span style="color: blue;">🔄 Verificando credenciales...</span>';
        }

        // Simulador de estado del servidor
        function checkServerStatus() {
            const serverType = document.getElementById('serverType').value;
            const statusDiv = document.getElementById('statusInfo');
            
            const serverInfo = {
                apache: {
                    name: 'Apache HTTP Server',
                    version: '2.4.41',
                    status: 'Activo',
                    port: '80, 443',
                    modules: 'mod_php, mod_rewrite, mod_ssl'
                },
                tomcat: {
                    name: 'Apache Tomcat',
                    version: '9.0.65',
                    status: 'Activo',
                    port: '8080, 8443',
                    modules: 'JSP, Servlets, JDBC'
                },
                nginx: {
                    name: 'Nginx',
                    version: '1.18.0',
                    status: 'Activo',
                    port: '80, 443',
                    modules: 'HTTP, SSL, Gzip'
                }
            };

            setTimeout(() => {
                const info = serverInfo[serverType];
                statusDiv.innerHTML = `
                    <strong>${info.name}</strong><br>
                    Versión: ${info.version}<br>
                    Estado: <span style="color: green;">${info.status}</span><br>
                    Puertos: ${info.port}<br>
                    Módulos: ${info.modules}
                `;
            }, 1500);

            statusDiv.innerHTML = '<span style="color: blue;">🔄 Verificando estado del servidor...</span>';
        }

        // Inicializar la página
        window.onload = function() {
            mostrarUsuarios();
        };