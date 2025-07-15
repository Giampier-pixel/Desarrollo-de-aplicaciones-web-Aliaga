
        // Estado global de los servicios
        let services = {
            'user-service': { active: true, calls: 0 },
            'product-service': { active: true, calls: 0 },
            'order-service': { active: true, calls: 0 },
            'payment-service': { active: true, calls: 0 }
        };

        // Función para mostrar detalles de temas
        function showTopicDetails(topic) {
            const topics = {
                'microservicios': {
                    title: '🏗️ Arquitectura de Microservicios',
                    content: `
                        <h4>Principios Fundamentales:</h4>
                        <ul>
                            <li><strong>Single Responsibility:</strong> Cada servicio tiene una responsabilidad específica</li>
                            <li><strong>Decentralized:</strong> Servicios independientes con sus propias bases de datos</li>
                            <li><strong>Fault Tolerance:</strong> Fallos aislados no afectan todo el sistema</li>
                            <li><strong>Technology Agnostic:</strong> Cada servicio puede usar tecnologías diferentes</li>
                        </ul>
                        
                        <h4>Ventajas vs Monolitos:</h4>
                        <ul>
                            <li>Escalabilidad independiente por servicio</li>
                            <li>Desarrollo paralelo por equipos</li>
                            <li>Tecnologías heterogéneas</li>
                            <li>Deployment independiente</li>
                            <li>Mejor aislamiento de fallos</li>
                        </ul>
                    `
                },
                'django-micro': {
                    title: '🚀 Django para Microservicios',
                    content: `
                        <h4>Configuración Específica:</h4>
                        <ul>
                            <li><strong>Django REST Framework:</strong> Para APIs robustas</li>
                            <li><strong>Database Routing:</strong> Gestión de múltiples bases de datos</li>
                            <li><strong>Service Discovery:</strong> Registro automático de servicios</li>
                            <li><strong>Health Checks:</strong> Monitoreo de salud del servicio</li>
                        </ul>
                        
                        <h4>Optimizaciones:</h4>
                        <ul>
                            <li>Desactivar middlewares innecesarios</li>
                            <li>Configurar CORS para comunicación entre servicios</li>
                            <li>Implementar caching distribuido</li>
                            <li>Optimizar queries para reducir latencia</li>
                        </ul>
                    `
                },
                'comunicacion': {
                    title: '🔄 Comunicación entre Servicios',
                    content: `
                        <h4>Patrones de Comunicación:</h4>
                        <ul>
                            <li><strong>Synchronous:</strong> REST APIs, GraphQL</li>
                            <li><strong>Asynchronous:</strong> Message Queues, Event Streaming</li>
                            <li><strong>Request-Response:</strong> HTTP calls directas</li>
                            <li><strong>Publish-Subscribe:</strong> Event-driven architecture</li>
                        </ul>
                        
                        <h4>Herramientas:</h4>
                        <ul>
                            <li>RabbitMQ, Apache Kafka para messaging</li>
                            <li>Redis para caching distribuido</li>
                            <li>Celery para tareas asíncronas</li>
                            <li>API Gateway para enrutamiento</li>
                        </ul>
                    `
                },
                'bases-datos': {
                    title: '🗄️ Gestión de Bases de Datos',
                    content: `
                        <h4>Database per Service:</h4>
                        <ul>
                            <li>Cada microservicio tiene su propia base de datos</li>
                            <li>Aislamiento completo de datos</li>
                            <li>Tecnologías de BD específicas por servicio</li>
                            <li>Backup y recovery independientes</li>
                        </ul>
                        
                        <h4>Desafíos:</h4>
                        <ul>
                            <li>Transacciones distribuidas (SAGA pattern)</li>
                            <li>Consistencia eventual</li>
                            <li>Sincronización de datos</li>
                            <li>Queries cross-service</li>
                        </ul>
                    `
                },
                'docker-k8s': {
                    title: '🐳 Docker & Kubernetes',
                    content: `
                        <h4>Containerización:</h4>
                        <ul>
                            <li>Dockerfile optimizado para Django</li>
                            <li>Multi-stage builds para reducir tamaño</li>
                            <li>Health checks integrados</li>
                            <li>Manejo de secrets y configuraciones</li>
                        </ul>
                        
                        <h4>Orquestación:</h4>
                        <ul>
                            <li>Kubernetes deployments y services</li>
                            <li>Auto-scaling horizontal y vertical</li>
                            <li>Service mesh (Istio, Linkerd)</li>
                            <li>CI/CD pipelines automatizados</li>
                        </ul>
                    `
                },
                'seguridad': {
                    title: '🔒 Seguridad en Microservicios',
                    content: `
                        <h4>Autenticación & Autorización:</h4>
                        <ul>
                            <li>JWT tokens para stateless authentication</li>
                            <li>OAuth 2.0 y OpenID Connect</li>
                            <li>API Gateway para centralized auth</li>
                            <li>Role-based access control (RBAC)</li>
                        </ul>
                        
                        <h4>Seguridad de Red:</h4>
                        <ul>
                            <li>TLS/SSL para comunicación segura</li>
                            <li>Network policies en Kubernetes</li>
                            <li>Service mesh para mTLS</li>
                            <li>Secrets management (Vault, K8s secrets)</li>
                        </ul>
                    `
                },
                'monitoreo': {
                    title: '📊 Monitoreo y Escalado',
                    content: `
                        <h4>Observabilidad:</h4>
                        <ul>
                            <li>Logging distribuido (ELK Stack)</li>
                            <li>Métricas con Prometheus + Grafana</li>
                            <li>Distributed tracing (Jaeger, Zipkin)</li>
                            <li>Health checks y heartbeats</li>
                        </ul>
                        
                        <h4>Escalado:</h4>
                        <ul>
                            <li>Horizontal Pod Autoscaler (HPA)</li>
                            <li>Vertical Pod Autoscaler (VPA)</li>
                            <li>Custom metrics scaling</li>
                            <li>Load balancing strategies</li>
                        </ul>
                    `
                },
                'consumo': {
                    title: '🔌 Consumo de Microservicios',
                    content: `
                        <h4>Integration Patterns:</h4>
                        <ul>
                            <li>Service discovery (Consul, Eureka)</li>
                            <li>Circuit breaker pattern</li>
                            <li>Retry mechanisms con exponential backoff</li>
                            <li>Timeout y fallback strategies</li>
                        </ul>
                        
                        <h4>Client Libraries:</h4>
                        <ul>
                            <li>HTTP clients con connection pooling</li>
                            <li>Async/await para mejor performance</li>
                            <li>Caching de responses</li>
                            <li>Request/response logging</li>
                        </ul>
                    `
                }
            };

            const topic = topics[topic];
            if (topic) {
                alert(`${topic.title}\n\n${topic.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')}`);
            }
        }

        // Función para alternar estado de servicios
        function toggleService(serviceName) {
            services[serviceName].active = !services[serviceName].active;
            const statusElement = document.getElementById(`${serviceName}-status`);
            
            if (services[serviceName].active) {
                statusElement.textContent = '● ACTIVE';
                statusElement.className = 'service-status status-active';
                logMessage(`✅ ${serviceName} is now ACTIVE`, 'success');
            } else {
                statusElement.textContent = '● INACTIVE';
                statusElement.className = 'service-status status-inactive';
                logMessage(`❌ ${serviceName} is now INACTIVE`, 'error');
            }
        }

        // Función para simular llamadas entre servicios
        function simulateServiceCall() {
            const logContainer = document.getElementById('communication-log');
            const services = ['user-service', 'product-service', 'order-service', 'payment-service'];
            
            logContainer.innerHTML = '';
            
            logMessage('🚀 Iniciando flujo de comunicación entre servicios...', 'info');
            
            setTimeout(() => {
                logMessage('📡 Frontend → API Gateway: GET /api/orders', 'info');
            }, 500);
            
            setTimeout(() => {
                logMessage('🔄 API Gateway → Order Service: GET /orders', 'info');
            }, 1000);
            
            setTimeout(() => {
                logMessage('🔄 Order Service → User Service: GET /users/123', 'info');
            }, 1500);
            
            setTimeout(() => {
                logMessage('✅ User Service → Order Service: User data retrieved', 'success');
            }, 2000);
            
            setTimeout(() => {
                logMessage('🔄 Order Service → Product Service: GET /products/456', 'info');
            }, 2500);
            
            setTimeout(() => {
                logMessage('✅ Product Service → Order Service: Product data retrieved', 'success');
            }, 3000);
            
            setTimeout(() => {
                logMessage('🔄 Order Service → Payment Service: POST /payments', 'info');
            }, 3500);
            
            setTimeout(() => {
                logMessage('✅ Payment Service → Order Service: Payment processed', 'success');
            }, 4000);
            
            setTimeout(() => {
                logMessage('✅ Order Service → API Gateway: Order created successfully', 'success');
            }, 4500);
            
            setTimeout(() => {
                logMessage('🎉 API Gateway → Frontend: 201 Created - Order ID: ORD-2024-001', 'success');
            }, 5000);
        }

        // Función para simular construcción de Docker
        function simulateDockerBuild() {
            const logContainer = document.getElementById('docker-log');
            
            logMessage('🐳 Starting Docker build process...', 'info');
            
            setTimeout(() => {
                logMessage('📦 Building user-service:latest...', 'info');
            }, 500);
            
            setTimeout(() => {
                logMessage('✅ user-service:latest built successfully', 'success');
            }, 1500);
            
            setTimeout(() => {
                logMessage('📦 Building product-service:latest...', 'info');
            }, 2000);
            
            setTimeout(() => {
                logMessage('✅ product-service:latest built successfully', 'success');
            }, 3000);
            
            setTimeout(() => {
                logMessage('📦 Building order-service:latest...', 'info');
            }, 3500);
            
            setTimeout(() => {
                logMessage('✅ order-service:latest built successfully', 'success');
            }, 4500);
            
            setTimeout(() => {
                logMessage('🎉 All microservices built successfully!', 'success');
            }, 5000);
        }

        // Función para simular ejecución de contenedores
        function simulateDockerRun() {
            const logContainer = document.getElementById('docker-log');
            
            logMessage('🚀 Starting containers...', 'info');
            
            setTimeout(() => {
                logMessage('📊 Starting PostgreSQL databases...', 'info');
            }, 500);
            
            setTimeout(() => {
                logMessage('✅ user-db container started on port 5432', 'success');
            }, 1000);
            
            setTimeout(() => {
                logMessage('✅ product-db container started on port 5433', 'success');
            }, 1500);
            
            setTimeout(() => {
                logMessage('✅ order-db container started on port 5434', 'success');
            }, 2000);
            
            setTimeout(() => {
                logMessage('🔄 Starting Redis cache...', 'info');
            }, 2500);
            
            setTimeout(() => {
                logMessage('✅ Redis container started on port 6379', 'success');
            }, 3000);
            
            setTimeout(() => {
                logMessage('🌐 Starting microservices...', 'info');
            }, 3500);
            
            setTimeout(() => {
                logMessage('✅ user-service started on port 8001', 'success');
            }, 4000);
            
            setTimeout(() => {
                logMessage('✅ product-service started on port 8002', 'success');
            }, 4500);
            
            setTimeout(() => {
                logMessage('✅ order-service started on port 8003', 'success');
            }, 5000);
            
            setTimeout(() => {
                logMessage('🎉 All services are running and healthy!', 'success');
            }, 5500);
        }

        // Función para simular escalado de servicios
        function simulateDockerScale() {
            const logContainer = document.getElementById('docker-log');
            
            logMessage('⚖️ Scaling services based on load...', 'info');
            
            setTimeout(() => {
                logMessage('📊 Analyzing current load metrics...', 'info');
            }, 500);
            
            setTimeout(() => {
                logMessage('🔍 user-service: CPU 85%, Memory 70% - Scaling up', 'info');
            }, 1000);
            
            setTimeout(() => {
                logMessage('✅ user-service scaled to 3 replicas', 'success');
            }, 1500);
            
            setTimeout(() => {
                logMessage('🔍 product-service: CPU 45%, Memory 30% - No scaling needed', 'info');
            }, 2000);
            
            setTimeout(() => {
                logMessage('🔍 order-service: CPU 90%, Memory 85% - Scaling up', 'info');
            }, 2500);
            
            setTimeout(() => {
                logMessage('✅ order-service scaled to 4 replicas', 'success');
            }, 3000);
            
            setTimeout(() => {
                logMessage('🔄 Updating load balancer configuration...', 'info');
            }, 3500);
            
            setTimeout(() => {
                logMessage('✅ Load balancer updated successfully', 'success');
            }, 4000);
            
            setTimeout(() => {
                logMessage('🎉 Auto-scaling completed successfully!', 'success');
            }, 4500);
        }

        // Función para limpiar logs de Docker
        function clearDockerLogs() {
            const logContainer = document.getElementById('docker-log');
            logContainer.innerHTML = '';
            logMessage('🧹 Logs cleared', 'info');
        }

        // Función auxiliar para agregar mensajes al log
        function logMessage(message, type = 'info') {
            const logContainer = document.getElementById('communication-log') || document.getElementById('docker-log');
            if (!logContainer) return;
            
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry log-${type}`;
            logEntry.textContent = `${new Date().toLocaleTimeString()} - ${message}`;
            
            logContainer.appendChild(logEntry);
            logContainer.scrollTop = logContainer.scrollHeight;
        }

        // Inicializar animaciones y efectos
        document.addEventListener('DOMContentLoaded', function() {
            // Animación de entrada para las cards
            const cards = document.querySelectorAll('.topic-card, .service-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.style.animation = 'slideInUp 0.6s ease-out forwards';
            });
            
            // Agregar estilos CSS para animaciones
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .topic-card, .service-card {
                    opacity: 0;
                }
                
                .service-card:hover {
                    animation: pulse 0.6s ease-in-out;
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        });
