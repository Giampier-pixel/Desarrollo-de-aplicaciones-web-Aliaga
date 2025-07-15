// Simulador de navegación de URLs
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
            view: 'views.detalle