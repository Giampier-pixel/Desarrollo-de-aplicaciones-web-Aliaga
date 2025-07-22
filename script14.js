// Funcionalidad para mostrar detalles de temas
function showTopicDetails(topic) {
    const topics = {
        'microservicios': 'Python es un lenguaje de programación interpretado, de alto nivel y de propósito general. Su sintaxis clara y legible lo hace ideal para desarrollo web backend.',
        'django-micro': 'Jinja es un motor de plantillas moderno y rápido para Python. Permite separar la lógica de presentación del código Python en aplicaciones web.',
        'comunicacion': 'Flask es un microframework web para Python que permite crear aplicaciones web de forma rápida y sencilla con gran flexibilidad.',
        'bases-datos': 'Django es un framework web de alto nivel para Python que permite el desarrollo rápido de sitios web seguros y mantenibles.'
    };
    
    const description = document.querySelector('.topics-description');
    if (topics[topic]) {
        description.innerHTML = `<strong>${topic.toUpperCase()}:</strong> ${topics[topic]}`;
        description.style.background = '#f0f8ff';
        description.style.padding = '15px';
        description.style.borderRadius = '8px';
        description.style.border = '2px solid #4a90e2';
    }
}

// Simulador de clases Persona y Estudiante
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    
    saludar() {
        return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
    }
    
    getInfo() {
        return {
            tipo: 'Persona',
            nombre: this.nombre,
            edad: this.edad
        };
    }
}

class Estudiante extends Persona {
    constructor(nombre, edad, carrera) {
        super(nombre, edad);
        this.carrera = carrera;
    }
    
    saludar() {
        return `Hola, soy ${this.nombre}, tengo ${this.edad} años y estudio ${this.carrera}.`;
    }
    
    getInfo() {
        return {
            tipo: 'Estudiante',
            nombre: this.nombre,
            edad: this.edad,
            carrera: this.carrera
        };
    }
}

function crearPersonaOEstudiante() {
    const nombre = document.getElementById('nombre-persona').value.trim();
    const edad = parseInt(document.getElementById('edad-persona').value);
    const carrera = document.getElementById('carrera-estudiante').value.trim();
    const resultadoDiv = document.getElementById('resultado-persona');
    
    if (!nombre || !edad) {
        resultadoDiv.innerHTML = '<div class="model-field error">Por favor, completa nombre y edad.</div>';
        return;
    }
    
    let instancia;
    if (carrera) {
        instancia = new Estudiante(nombre, edad, carrera);
    } else {
        instancia = new Persona(nombre, edad);
    }
    
    const info = instancia.getInfo();
    const saludo = instancia.saludar();
    
    resultadoDiv.innerHTML = `
        <div class="model-field"><strong>Tipo:</strong> ${info.tipo}</div>
        <div class="model-field"><strong>Nombre:</strong> ${info.nombre}</div>
        <div class="model-field"><strong>Edad:</strong> ${info.edad}</div>
        ${info.carrera ? `<div class="model-field"><strong>Carrera:</strong> ${info.carrera}</div>` : ''}
        <div class="model-field"><strong>Saludo:</strong> ${saludo}</div>
        <div class="model-field success">Instancia creada exitosamente</div>
    `;
    
    // Limpiar campos
    document.getElementById('nombre-persona').value = '';
    document.getElementById('edad-persona').value = '';
    document.getElementById('carrera-estudiante').value = '';
}

// Simulador de aplicación Flask con base de datos
let estudiantes = [
    { id: 1, nombre: 'María García', direccion: 'Av. Principal 123', ciudad: 'Huancayo' },
    { id: 2, nombre: 'Carlos López', direccion: 'Jr. Los Andes 456', ciudad: 'Lima' },
    { id: 3, nombre: 'Ana Rodríguez', direccion: 'Calle Real 789', ciudad: 'Arequipa' }
];

let siguienteId = 4;

function registrarEstudiante() {
    const nombre = document.getElementById('nombre-estudiante').value.trim();
    const direccion = document.getElementById('direccion-estudiante').value.trim();
    const ciudad = document.getElementById('ciudad-estudiante').value.trim();
    const resultadoDiv = document.getElementById('resultado-flask');
    
    if (!nombre || !direccion || !ciudad) {
        resultadoDiv.innerHTML = `
            <div class="model-field error">Todos los campos son obligatorios</div>
        `;
        return;
    }
    
    // Simular inserción en base de datos
    const nuevoEstudiante = {
        id: siguienteId++,
        nombre: nombre,
        direccion: direccion,
        ciudad: ciudad
    };
    
    estudiantes.push(nuevoEstudiante);
    
    resultadoDiv.innerHTML = `
        <div class="model-field success">Estudiante registrado exitosamente</div>
        <div class="model-field"><strong>ID:</strong> ${nuevoEstudiante.id}</div>
        <div class="model-field"><strong>Nombre:</strong> ${nuevoEstudiante.nombre}</div>
        <div class="model-field"><strong>Dirección:</strong> ${nuevoEstudiante.direccion}</div>
        <div class="model-field"><strong>Ciudad:</strong> ${nuevoEstudiante.ciudad}</div>
        <div class="model-field">Base de datos conectada a Aiven MySQL ✓</div>
        <div class="model-field">Query ejecutado: INSERT INTO estudiantes...</div>
    `;
    
    // Limpiar campos
    document.getElementById('nombre-estudiante').value = '';
    document.getElementById('direccion-estudiante').value = '';
    document.getElementById('ciudad-estudiante').value = '';
    
    // Actualizar lista automáticamente
    setTimeout(() => {
        cargarEstudiantes();
    }, 1000);
}

function cargarEstudiantes() {
    const listaDiv = document.getElementById('lista-estudiantes');
    
    if (estudiantes.length === 0) {
        listaDiv.innerHTML = '<div class="model-field">No hay estudiantes registrados</div>';
        return;
    }
    
    let html = `<div class="model-field"><strong>Total de estudiantes:</strong> ${estudiantes.length}</div>`;
    
    estudiantes.forEach(estudiante => {
        html += `
            <div class="model-field">
                <strong>ID ${estudiante.id}:</strong> ${estudiante.nombre} | 
                ${estudiante.direccion}, ${estudiante.ciudad}
                <button onclick="eliminarEstudiante(${estudiante.id})" style="margin-left: 10px; background: #ff000091; color: white; border: none; padding: 2px 8px; border-radius: 3px; cursor: pointer;">Eliminar</button>
            </div>
        `;
    });

        
    listaDiv.innerHTML = html;
}

function eliminarEstudiante(id) {
    const index = estudiantes.findIndex(est => est.id === id);
    if (index !== -1) {
        const estudianteEliminado = estudiantes.splice(index, 1)[0];
        
        const resultadoDiv = document.getElementById('resultado-flask');
        resultadoDiv.innerHTML = `
            <div class="model-field success">Estudiante eliminado: ${estudianteEliminado.nombre}</div>
            <div class="model-field">Query ejecutado: DELETE FROM estudiantes WHERE id=${id}</div>
        `;
        
        // Actualizar lista
        cargarEstudiantes();
    }
}

// Efectos visuales y animaciones
document.addEventListener('DOMContentLoaded', function() {
    // Animación para botones de temas
    const topicButtons = document.querySelectorAll('.topic-button');
    topicButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de otros botones
            topicButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Cargar estudiantes iniciales
    setTimeout(() => {
        cargarEstudiantes();
    }, 500);
    
    // Agregar estilos dinámicos
    const style = document.createElement('style');
    style.textContent = `
        .topic-button.active {
            background: #4a90e2 !important;
            color: white !important;
            box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
        }
        
        .model-field.error {
            background: #ffe6e6;
            color: #d63031;
            border-left: 4px solid #d63031;
            padding: 8px;
            margin: 5px 0;
        }
        
        .model-field.success {
            background: #e6ffe6;
            color: #00b894;
            border-left: 4px solid #00b894;
            padding: 8px;
            margin: 5px 0;
        }
        
        .form-input:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }
        
        .demo-form button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
});

// Función para simular conexión a base de datos
function simularConexionDB() {
    const estadoDiv = document.getElementById('resultado-flask');
    estadoDiv.innerHTML = `

    `;
    
    setTimeout(() => {
        estadoDiv.innerHTML = `
            <div class="model-field success">Conexión establecida exitosamente</div>
        `;
    }, 1500);
}

// Ejecutar simulación de conexión al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        simularConexionDB();
    }, 1000);
});