
        // Variables para el simulador
        let currentPage = 2;
        let requestCount = 0;
        
        // Función para mostrar detalles de temas
        function showTopicDetail(topic) {
            const details = {
                'rest': {
                    title: 'REST & APIs',
                    content: `
                        <div class="django-demo">
                            <div class="demo-section">
                                <div class="demo-title">Principios REST</div>
                                <div class="url-pattern">- Arquitectura cliente-servidor</div>
                                <div class="url-pattern">- Sin estado (stateless)</div>
                                <div class="url-pattern">- Cacheable</div>
                                <div class="url-pattern">- Interfaz uniforme</div>
                            </div>
                        </div>
                    `
                },
                'hateoas': {
                    title: 'HATEOAS',
                    content: `
                        <div class="django-demo">
                            <div class="demo-section">
                                <div class="demo-title">Hypermedia as the Engine of Application State</div>
                                <div class="model-field">Links dinámicos en respuestas JSON</div>
                                <div class="model-field">Navegación programática</div>
                                <div class="model-field">APIs autodescriptivas</div>
                            </div>
                        </div>
                    `
                },
                'serialization': {
                    title: 'Serialización',
                    content: `
                        <div class="django-demo">
                            <div class="demo-section">
                                <div class="demo-title">Transformación de Datos</div>
                                <div class="model-field">Modelos a JSON</div>
                                <div class="model-field">Validación de datos</div>
                                <div class="model-field">Serializers personalizados</div>
                            </div>
                        </div>
                    `
                },
                'filtering': {
                    title: 'Filtrado & Paginación',
                    content: `
                        <div class="django-demo">
                            <div class="demo-section">
                                <div class="demo-title">Optimización de Respuestas</div>
                                <div class="model-field">Filtros por campos</div>
                                <div class="model-field">Paginación automática</div>
                                <div class="model-field">Búsqueda avanzada</div>
                            </div>
                        </div>
                    `
                },
                'security': {
                    title: 'Seguridad',
                    content: `
                        <div class="django-demo">
                            <div class="demo-section">
                                <div class="demo-title">Protección de APIs</div>
                                <div class="model-field">CSRF Protection</div>
                                <div class="model-field">CORS Configuration</div>
                                <div class="model-field">Rate Limiting</div>
                            </div>
                        </div>
                    `
                },
                'routing': {
                    title: 'Ruteadores',
                    content: `
                        <div class="django-demo">
                            <div class="demo-section">
                                <div class="demo-title">Gestión de Rutas</div>
                                <div class="model-field">ViewSets automáticos</div>
                                <div class="model-field">URLs dinámicas</div>
                                <div class="model-field">Vistas personalizadas</div>
                            </div>
                        </div>
                    `
                }
            };
            
            const detail = details[topic];
            document.getElementById('topicTitle').textContent = detail.title;
            document.getElementById('topicContent').innerHTML = detail.content;
            document.getElementById('topicDetail').style.display = 'block';
        }
        
        // Función para simular llamadas a la API
        function simulateApiCall(method, endpoint) {
            requestCount++;
            document.getElementById('totalRequests').textContent = requestCount;
            
            const responses = {
                'GET': {
                    status: '200 OK',
                    data: `{
  "data": [
    { "id": 1, "name": "Juan Pérez", "email": "juan@email.com" },
    { "id": 2, "name": "María García", "email": "maria@email.com" }
  ],
  "pagination": { "page": ${currentPage}, "total": 25 }
}`
                },
                'POST': {
                    status: '201 Created',
                    data: `{
  "data": {
    "id": 26,
    "name": "Carlos López",
    "email": "carlos@email.com"
  },
  "message": "Usuario creado exitosamente"
}`
                },
                'PUT': {
                    status: '200 OK',
                    data: `{
  "data": {
    "id": 1,
    "name": "Juan Pérez Actualizado",
    "email": "juan.nuevo@email.com"
  },
  "message": "Usuario actualizado exitosamente"
}`
                },
                'DELETE': {
                    status: '200 OK',
                    data: `{
  "message": "Usuario eliminado exitosamente",
  "deleted_id": 1
}`
                }
            };
            
            const response = responses[method];
            document.getElementById('apiOutput').innerHTML = `
                <strong>${method} ${endpoint}</strong><br>
                <strong>Status:</strong> ${response.status}<br>
                <strong>Response:</strong><br>
                <pre>${response.data}</pre>
            `;
        }
        
        // Función para cambiar página
        function changePage(page) {
            currentPage = page;
            document.querySelectorAll('.tag').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            simulateApiCall('GET', `/api/users?page=${page}`);
        }
        
        // Función para simular filtros
        function simulateFilter(field, value) {
            const filterResponses = {
                'name': `{
  "data": [
    { "id": 1, "name": "Juan Pérez", "email": "juan@email.com" },
    { "id": 5, "name": "Juan Carlos", "email": "juan.carlos@email.com" }
  ],
  "filter": { "field": "name", "value": "Juan" }
}`,
                'email': `{
  "data": [
    { "id": 3, "name": "Ana López", "email": "ana@gmail.com" },
    { "id": 7, "name": "Pedro Ruiz", "email": "pedro@gmail.com" }
  ],
  "filter": { "field": "email", "value": "gmail.com" }
}`,
                'created_at': `{
  "data": [
    { "id": 8, "name": "Luis Martín", "email": "luis@email.com", "created_at": "2024-07-15" },
    { "id": 9, "name": "Carmen Díaz", "email": "carmen@email.com", "created_at": "2024-07-20" }
  ],
  "filter": { "field": "created_at", "value": "2024-07" }
}`,
                'status': `{
  "data": [
    { "id": 2, "name": "María García", "email": "maria@email.com", "status": "active" },
    { "id": 4, "name": "Carlos López", "email": "carlos@email.com", "status": "active" }
  ],
  "filter": { "field": "status", "value": "active" }
}`
            };
            
            document.getElementById('filterOutput').innerHTML = `
                <strong>Filtro aplicado:</strong> ${field} = "${value}"<br>
                <strong>Resultados:</strong><br>
                <pre>${filterResponses[field]}</pre>
            `;
        }
        
        // Actualizar estadísticas periódicamente
        setInterval(() => {
            const stats = {
                totalRequests: Math.floor(Math.random() * 100) + 1200,
                successRate: (Math.random() * 2 + 98).toFixed(1) + '%',
                avgResponseTime: Math.floor(Math.random() * 20) + 35 + 'ms',
                activeUsers: Math.floor(Math.random() * 500) + 1500
            };
            
            Object.keys(stats).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.textContent = stats[key];
                }
            });
        }, 5000);
