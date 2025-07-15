
        let requestCount = 0;
        let currentPage = 2;
        
        const sampleUsers = [
            { id: 1, name: "Juan Pérez", email: "juan@email.com", status: "active", created_at: "2024-07-01" },
            { id: 2, name: "María García", email: "maria@email.com", status: "active", created_at: "2024-07-02" },
            { id: 3, name: "Carlos López", email: "carlos@gmail.com", status: "inactive", created_at: "2024-07-03" },
            { id: 4, name: "Ana Martínez", email: "ana@gmail.com", status: "active", created_at: "2024-07-04" },
            { id: 5, name: "Luis Rodríguez", email: "luis@email.com", status: "active", created_at: "2024-07-05" }
        ];

        function showTopicDetail(topic) {
            const topicDetail = document.getElementById('topicDetail');
            const topicTitle = document.getElementById('topicTitle');
            const topicContent = document.getElementById('topicContent');
            
            const topics = {
                rest: {
                    title: "REST & APIs de Hipermedia",
                    content: `
                        <p><strong>REST (Representational State Transfer)</strong> es un estilo arquitectural que define principios para diseñar servicios web:</p>
                        <ul style="margin-left: 20px; margin-top: 10px;">
                            <li><strong>Recursos:</strong> Todo se trata como un recurso identificable por URL</li>
                            <li><strong>Métodos HTTP:</strong> GET, POST, PUT, DELETE para operaciones CRUD</li>
                            <li><strong>Sin estado:</strong> Cada petición es independiente</li>
                            <li><strong>Cacheable:</strong> Las respuestas deben ser marcadas como cacheables o no</li>
                            <li><strong>Interfaz uniforme:</strong> Consistent API design</li>
                        </ul>
                    `
                },
                hateoas: {
                    title: "HATEOAS - Hipermedia como Motor de Estado",
                    content: `
                        <p><strong>HATEOAS</strong> permite que las APIs sean autodescriptivas incluyendo enlaces relacionados:</p>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; font-family: monospace;">
                        {
                          "data": { "id": 1, "name": "Juan" },
                          "links": {
                            "self": "/api/users/1",
                            "edit": "/api/users/1",
                            "delete": "/api/users/1",
                            "posts": "/api/users/1/posts"
                          }
                        }
                        </div>
                    `
                },
                serialization: {
                    title: "Serialización de Modelos y Datos",
                    content: `
                        <p>La <strong>serialización</strong> convierte objetos de programación en formatos transmisibles:</p>
                        <ul style="margin-left: 20px; margin-top: 10px;">
                            <li><strong>JSON:</strong> Formato más común para APIs REST</li>
                            <li><strong>XML:</strong> Usado en APIs más antiguas</li>
                            <li><strong>Transformación:</strong> Ocultar campos sensibles, formatear datos</li>
                            <li><strong>Validación:</strong> Verificar datos antes de serializar</li>
                        </ul>
                    `
                },
                filtering: {
                    title: "Filtrado, Paginación y Límites",
                    content: `
                        <p>Optimización de respuestas para mejorar rendimiento:</p>
                        <ul style="margin-left: 20px; margin-top: 10px;">
                            <li><strong>Filtrado:</strong> ?filter[name]=Juan&filter[status]=active</li>
                            <li><strong>Paginación:</strong> ?page=2&per_page=10</li>
                            <li><strong>Ordenamiento:</strong> ?sort=created_at&order=desc</li>
                            <li><strong>Rate Limiting:</strong> Límites de peticiones por tiempo</li>
                        </ul>
                    `
                },
                security: {
                    title: "Seguridad: CSRF, CORS y Autenticación",
                    content: `
                        <p>Aspectos críticos de seguridad en APIs:</p>
                        <ul style="margin-left: 20px; margin-top: 10px;">
                            <li><strong>CSRF:</strong> Protección contra ataques de falsificación de peticiones</li>
                            <li><strong>CORS:</strong> Control de acceso desde diferentes dominios</li>
                            <li><strong>Autenticación:</strong> JWT, OAuth, API Keys</li>
                            <li><strong>Autorización:</strong> Control de permisos por recurso</li>
                        </ul>
                    `
                },
                routing: {
                    title: "Ruteadores y Conjuntos de Vistas",
                    content: `
                        <p>Organización y gestión de rutas en APIs:</p>
                        <ul style="margin-left: 20px; margin-top: 10px;">
                            <li><strong>Ruteadores:</strong> Agrupación lógica de endpoints</li>
                            <li><strong>Middleware:</strong> Funciones que se ejecutan antes/después</li>
                            <li><strong>Versionado:</strong> /api/v1/, /api/v2/</li>
                            <li><strong>Recursos anidados:</strong> /users/{id}/posts</li>
                        </ul>
                    `
                }
            };
            
            const selectedTopic = topics[topic];
            topicTitle.textContent = selectedTopic.title;
            topicContent.innerHTML = selectedTopic.content;
            topicDetail.style.display = 'block';
        }

        function simulateApiCall(method, endpoint) {
            requestCount++;
            updateStats();
            
            const output = document.getElementById('apiOutput');
            
            const responses = {
                'GET /api/users': {
                    status: 200,
                    data: {
                        data: sampleUsers.slice(0, 3),
                        pagination: {
                            page: currentPage,
                            per_page: 3,
                            total: sampleUsers.length,
                            total_pages: Math.ceil(sampleUsers.length / 3)
                        },
                        links: {
                            first: "/api/users?page=1",
                            last: "/api/users?page=2",
                            prev: currentPage > 1 ? `/api/users?page=${currentPage - 1}` : null,
                            next: currentPage < 2 ? `/api/users?page=${currentPage + 1}` : null
                        }
                    }
                },
                'POST /api/users': {
                    status: 201,
                    data: {
                        data: {
                            id: sampleUsers.length + 1,
                            name: "Nuevo Usuario",
                            email: "nuevo@email.com",
                            status: "active",
                            created_at: new Date().toISOString()
                        },
                        message: "Usuario creado exitosamente",
                        links: {
                            self: `/api/users/${sampleUsers.length + 1}`,
                            edit: `/api/users/${sampleUsers.length + 1}`,
                            delete: `/api/users/${sampleUsers.length + 1}`
                        }
                    }
                },
                'PUT /api/users/1': {
                    status: 200,
                    data: {
                        data: {
                            id: 1,
                            name: "Juan Pérez Actualizado",
                            email: "juan.actualizado@email.com",
                            status: "active",
                            updated_at: new Date().toISOString()
                        },
                        message: "Usuario actualizado exitosamente"
                    }
                },
                'DELETE /api/users/1': {
                    status: 200,
                    data: {
                        message: "Usuario eliminado exitosamente",
                        deleted_id: 1
                    }
                }
            };
            
            const response = responses[`${method} ${endpoint}`];
            
            output.innerHTML = `
                <div style="color: #667eea; font-weight: bold; margin-bottom: 10px;">
                    ${method} ${endpoint} - Status: ${response.status}
                </div>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
                    ${JSON.stringify(response.data, null, 2)}
                </div>
            `;
        }

        function simulateFilter(filterType, value) {
            const output = document.getElementById('filterOutput');
            
            let filteredUsers = sampleUsers.filter(user => {
                switch(filterType) {
                    case 'name':
                        return user.name.toLowerCase().includes(value.toLowerCase());
                    case 'email':
                        return user.email.includes(value);
                    case 'created_at':
                        return user.created_at.includes(value);
                    case 'status':
                        return user.status === value;
                    default:
                        return true;
                }
            });
            
            output.innerHTML = `
                <div style="color: #667eea; font-weight: bold; margin-bottom: 10px;">
                    GET /api/users?filter[${filterType}]=${value}
                </div>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
                    {
                      "data": ${JSON.stringify(filteredUsers, null, 2)},
                      "meta": {
                        "total_filtered": ${filteredUsers.length},
                        "filter_applied": "${filterType}: ${value}"
                      }
                    }
                </div>
            `;
        }

        function changePage(page) {
            currentPage = page;
            
            // Update active button
            document.querySelectorAll('.page-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Simulate API call for new page
            simulateApiCall('GET', '/api/users');
        }

        function updateStats() {
            document.getElementById('totalRequests').textContent = requestCount;
            
            // Simulate some dynamic stats
            const successRate = Math.max(95, 100 - Math.floor(requestCount / 10));
            document.getElementById('successRate').textContent = successRate + '%';
            
            const avgTime = Math.floor(Math.random() * 20) + 35;
            document.getElementById('avgResponseTime').textContent = avgTime + 'ms';
            
            const activeUsers = 1234 + Math.floor(Math.random() * 100);
            document.getElementById('activeUsers').textContent = activeUsers.toLocaleString();
        }

        // Initialize stats
        updateStats();

        // Add some interactive animations
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(1deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Auto-update some stats every few seconds
        setInterval(() => {
            if (requestCount > 0) {
                const activeUsers = 1234 + Math.floor(Math.random() * 200);
                document.getElementById('activeUsers').textContent = activeUsers.toLocaleString();
            }
        }, 3000);

        // Add typing effect to API responses
        function typeEffect(element, text, speed = 30) {
            element.innerHTML = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Enhanced API simulation with typing effect
        function simulateApiCallWithTyping(method, endpoint) {
            requestCount++;
            updateStats();
            
            const output = document.getElementById('apiOutput');
            output.innerHTML = '<div style="color: #667eea;">Procesando solicitud...</div>';
            
            setTimeout(() => {
                simulateApiCall(method, endpoint);
            }, 500);
        }

        // Add some sample data for more realistic demo
        const samplePosts = [
            { id: 1, title: "Primer Post", content: "Contenido del primer post", user_id: 1 },
            { id: 2, title: "Segundo Post", content: "Contenido del segundo post", user_id: 2 },
            { id: 3, title: "Tercer Post", content: "Contenido del tercer post", user_id: 1 }
        ];

        // Add keyboard shortcuts for demo
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        simulateApiCall('GET', '/api/users');
                        break;
                    case '2':
                        e.preventDefault();
                        simulateApiCall('POST', '/api/users');
                        break;
                    case '3':
                        e.preventDefault();
                        simulateApiCall('PUT', '/api/users/1');
                        break;
                    case '4':
                        e.preventDefault();
                        simulateApiCall('DELETE', '/api/users/1');
                        break;
                }
            }
        });

        // Add tooltip for keyboard shortcuts
        const demoSection = document.querySelector('.interactive-demo');
        demoSection.innerHTML += `
            <div style="margin-top: 15px; padding: 10px; background: #e8f4f8; border-radius: 5px; font-size: 0.9em; color: #2c5282;">
                <strong>💡 Tip:</strong> Usa Ctrl+1, Ctrl+2, Ctrl+3, Ctrl+4 para ejecutar rápidamente las operaciones CRUD
            </div>
        `;

        // Add more realistic error handling
        function simulateError() {
            const output = document.getElementById('apiOutput');
            output.innerHTML = `
                <div style="color: #f56565; font-weight: bold; margin-bottom: 10px;">
                    Error 404 - Resource Not Found
                </div>
                <div style="background: #fed7d7; padding: 10px; border-radius: 5px; color: #742a2a;">
                    {
                      "error": "Not Found",
                      "message": "The requested resource could not be found",
                      "code": 404,
                      "timestamp": "${new Date().toISOString()}"
                    }
                </div>
            `;
        }

        // Add rate limiting simulation
        let lastRequestTime = 0;
        const RATE_LIMIT = 1000; // 1 second between requests

        function checkRateLimit() {
            const now = Date.now();
            if (now - lastRequestTime < RATE_LIMIT) {
                const output = document.getElementById('apiOutput');
                output.innerHTML = `
                    <div style="color: #f56565; font-weight: bold; margin-bottom: 10px;">
                        Error 429 - Too Many Requests
                    </div>
                    <div style="background: #fed7d7; padding: 10px; border-radius: 5px; color: #742a2a;">
                        {
                          "error": "Rate Limit Exceeded",
                          "message": "You have exceeded the rate limit. Try again later.",
                          "retry_after": 1,
                          "code": 429
                        }
                    </div>
                `;
                return false;
            }
            lastRequestTime = now;
            return true;
        }

        console.log('API RESTful Demo cargado correctamente');
        console.log('Semana 13 - Diseño de APIs RESTful');
        console.log('Funcionalidades: CRUD, Filtrado, Paginación, HATEOAS');
