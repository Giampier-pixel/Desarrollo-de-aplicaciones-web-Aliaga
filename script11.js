function navegarURL() {
            const urlPattern = document.getElementById('urlPattern').value;
            const urlInfo = document.getElementById('urlInfo');
            
            const urlMappings = {
                '/': {
                    view: 'views.index',
                    template: 'index.html',
                    description: 'Página principal del sitio'
                },
                '/productos/': {
                    view: 'views.productos',
                    template: 'productos.html',
                    description: 'Lista todos los productos disponibles'
                },
                '/producto/1/': {
                    view: 'views.detalle_producto',
                    template: 'detalle.html',
                    description: 'Detalle del producto con ID 1'
                },
                '/producto/2/': {
                    view: 'views.detalle_producto',
                    template: 'detalle.html',
                    description: 'Detalle del producto con ID 2'
                }
            };

            setTimeout(() => {
                const mapping = urlMappings[urlPattern];
                urlInfo.innerHTML = `
                    <strong>URL:</strong> ${urlPattern}<br>
                    <strong>Vista:</strong> ${mapping.view}<br>
                    <strong>Plantilla:</strong> ${mapping.template}<br>
                    <strong>Descripción:</strong> ${mapping.description}
                `;
            }, 500);

            urlInfo.innerHTML = '<span style="color: blue;">🔄 Navegando...</span>';
        }

        // Simulador de productos
        let productos = [];

        function agregarProducto() {
            const nombre = document.getElementById('nombreProducto').value;
            const descripcion = document.getElementById('descripcionProducto').value;
            const precio = parseFloat(document.getElementById('precioProducto').value);

            if (nombre && descripcion && precio) {
                const producto = {
                    id: productos.length + 1,
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    fecha_creacion: new Date().toLocaleDateString(),
                    activo: true
                };
                
                productos.push(producto);
                mostrarProductos();
                limpiarFormularioProducto();
            } else {
                alert('Por favor, complete todos los campos');
            }
        }

        function mostrarProductos() {
            const lista = document.getElementById('listaProductos');
            if (productos.length === 0) {
                lista.innerHTML = '<em>No hay productos registrados</em>';
                return;
            }

            let html = '<table style="width: 100%; border-collapse: collapse; margin-top: 10px;">';
            html += '<tr style="background-color: #667eea; color: white;"><th>ID</th><th>Nombre</th><th>Precio</th><th>Fecha</th></tr>';
            
            productos.forEach(producto => {
                html += `<tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 8px; text-align: center;">${producto.id}</td>
                    <td style="padding: 8px;">${producto.nombre}</td>
                    <td style="padding: 8px; text-align: center;">$${producto.precio.toFixed(2)}</td>
                    <td style="padding: 8px; text-align: center;">${producto.fecha_creacion}</td>
                </tr>`;
            });
            
            html += '</table>';
            lista.innerHTML = html;
        }

        function limpiarFormularioProducto() {
            document.getElementById('nombreProducto').value = '';
            document.getElementById('descripcionProducto').value = '';
            document.getElementById('precioProducto').value = '';
        }

        // Simulador de plantillas
        function mostrarPlantilla() {
            const templateType = document.getElementById('templateType').value;
            const templateInfo = document.getElementById('templateInfo');
            
            const templates = {
                'base': {
                    name: 'base.html',
                    blocks: ['title', 'content'],
                    description: 'Plantilla base con navegación y estructura HTML'
                },
                'productos': {
                    name: 'productos.html',
                    blocks: ['title: "Productos - Mi Tienda"', 'content: Lista de productos'],
                    description: 'Extiende base.html, muestra grid de productos'
                },
                'detalle': {
                    name: 'detalle.html',
                    blocks: ['title: "Detalle - Mi Tienda"', 'content: Información detallada'],
                    description: 'Extiende base.html, muestra detalle de un producto'
                }
            };

            setTimeout(() => {
                const template = templates[templateType];
                templateInfo.innerHTML = `
                    <strong>Plantilla:</strong> ${template.name}<br>
                    <strong>Bloques:</strong> ${template.blocks.join(', ')}<br>
                    <strong>Descripción:</strong> ${template.description}
                `;
            }, 500);

            templateInfo.innerHTML = '<span style="color: blue;">🔄 Cargando plantilla...</span>';
        }

        // Inicializar
        window.onload = function() {
            mostrarProductos();
        };
        // Navegación entre semanas
document.addEventListener('DOMContentLoaded', function() {
    const prevWeekBtn = document.getElementById('prevWeek');
    const nextWeekBtn = document.getElementById('nextWeek');
    
    prevWeekBtn.addEventListener('click', function() {
        // Aquí puedes agregar la lógica para ir a la semana anterior
        // Por ejemplo: window.location.href = 'semana10.html';
        alert('Navegando a la semana anterior');
    });
    
    nextWeekBtn.addEventListener('click', function() {
        // Aquí puedes agregar la lógica para ir a la semana siguiente
        // Por ejemplo: window.location.href = 'semana12.html';
        alert('Navegando a la semana siguiente');
    });
});