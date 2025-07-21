// Simulador de API REST para gestión de estudiantes
// Base de datos simulada en memoria
let estudiantes = [
    {
        id: 1,
        nomEstudiante: "Juan Pérez",
        dirEstudiante: "Jr. Los Andes 123",
        ciuEstudiante: "Huancayo"
    },
    {
        id: 2,
        nomEstudiante: "María García",
        dirEstudiante: "Av. Real 456",
        ciuEstudiante: "Lima"
    }
];
let nextId = 3;

// Función para mostrar respuesta de la API
function mostrarRespuesta(metodo, url, status, data, descripcion) {
    const responseDiv = document.getElementById('apiResponse');
    const timestamp = new Date().toLocaleTimeString();
    
    let statusClass = status >= 200 && status < 300 ? 'success' : 'error';
    
    responseDiv.innerHTML = `
        <div class="api-response ${statusClass}">
            <div class="response-header">
                <span class="method-badge ${metodo.toLowerCase()}">${metodo}</span>
                <span class="url">${url}</span>
                <span class="status status-${statusClass}">${status}</span>
                <span class="timestamp">${timestamp}</span>
            </div>
            <div class="response-description">${descripcion}</div>
            <div class="response-body">
                <pre>${JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    `;
}

// POST - Crear nuevo estudiante o PUT - Actualizar existente
function guardarEstudiante() {
    const id = document.getElementById('estudianteId').value;
    const nombre = document.getElementById('nombreEstudiante').value.trim();
    const direccion = document.getElementById('direccionEstudiante').value.trim();
    const ciudad = document.getElementById('ciudadEstudiante').value.trim();
    
    if (!nombre || !direccion || !ciudad) {
        mostrarRespuesta('POST/PUT', '/api/estudiantes', 400, 
            { error: "Todos los campos son requeridos" },
            "Error de validación: Faltan campos obligatorios"
        );
        return;
    }
    
    if (id) {
        // PUT - Actualizar estudiante existente
        const estudianteIndex = estudiantes.findIndex(e => e.id === parseInt(id));
        if (estudianteIndex !== -1) {
            estudiantes[estudianteIndex] = {
                id: parseInt(id),
                nomEstudiante: nombre,
                dirEstudiante: direccion,
                ciuEstudiante: ciudad
            };
            
            mostrarRespuesta('PUT', `/api/estudiantes/${id}`, 200,
                estudiantes[estudianteIndex],
                "Estudiante actualizado exitosamente"
            );
        } else {
            mostrarRespuesta('PUT', `/api/estudiantes/${id}`, 404,
                { error: "Estudiante no encontrado" },
                "El estudiante con el ID especificado no existe"
            );
        }
    } else {
        // POST - Crear nuevo estudiante
        const nuevoEstudiante = {
            id: nextId++,
            nomEstudiante: nombre,
            dirEstudiante: direccion,
            ciuEstudiante: ciudad
        };
        
        estudiantes.push(nuevoEstudiante);
        mostrarRespuesta('POST', '/api/estudiantes', 201,
            nuevoEstudiante,
            "Estudiante creado exitosamente"
        );
    }
    
    actualizarListaEstudiantes();
    limpiarFormulario();
}

// GET - Listar todos los estudiantes
function listarEstudiantes() {
    mostrarRespuesta('GET', '/api/estudiantes', 200,
        estudiantes,
        `Se encontraron ${estudiantes.length} estudiantes`
    );
    actualizarListaEstudiantes();
}

// GET - Buscar estudiante por ID
function buscarEstudiante() {
    const id = document.getElementById('buscarId').value;
    
    if (!id) {
        mostrarRespuesta('GET', '/api/estudiantes/{id}', 400,
            { error: "ID es requerido" },
            "Error: Debe especificar un ID para buscar"
        );
        return;
    }
    
    const estudiante = estudiantes.find(e => e.id === parseInt(id));
    
    if (estudiante) {
        mostrarRespuesta('GET', `/api/estudiantes/${id}`, 200,
            estudiante,
            "Estudiante encontrado exitosamente"
        );
    } else {
        mostrarRespuesta('GET', `/api/estudiantes/${id}`, 404,
            { error: "Estudiante no encontrado" },
            "No se encontró un estudiante con el ID especificado"
        );
    }
    
    document.getElementById('buscarId').value = '';
}

// DELETE - Eliminar estudiante
function eliminarEstudiante() {
    const id = document.getElementById('eliminarId').value;
    
    if (!id) {
        mostrarRespuesta('DELETE', '/api/estudiantes/{id}', 400,
            { error: "ID es requerido" },
            "Error: Debe especificar un ID para eliminar"
        );
        return;
    }
    
    const estudianteIndex = estudiantes.findIndex(e => e.id === parseInt(id));
    
    if (estudianteIndex !== -1) {
        const estudianteEliminado = estudiantes[estudianteIndex];
        estudiantes.splice(estudianteIndex, 1);
        
        mostrarRespuesta('DELETE', `/api/estudiantes/${id}`, 204,
            null,
            `Estudiante "${estudianteEliminado.nomEstudiante}" eliminado exitosamente`
        );
        
        actualizarListaEstudiantes();
    } else {
        mostrarRespuesta('DELETE', `/api/estudiantes/${id}`, 404,
            { error: "Estudiante no encontrado" },
            "No se puede eliminar: estudiante no encontrado"
        );
    }
    
    document.getElementById('eliminarId').value = '';
}

// Función para editar estudiante (cargar datos en el formulario)
function editarEstudiante(id, nombre, direccion, ciudad) {
    document.getElementById('estudianteId').value = id;
    document.getElementById('nombreEstudiante').value = nombre;
    document.getElementById('direccionEstudiante').value = direccion;
    document.getElementById('ciudadEstudiante').value = ciudad;
    
    // Scroll al formulario
    document.querySelector('.demo-form').scrollIntoView({ behavior: 'smooth' });
}

// Función para eliminar desde la lista
function eliminarEstudiantePorId(id) {
    document.getElementById('eliminarId').value = id;
    eliminarEstudiante();
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById('estudianteId').value = '';
    document.getElementById('nombreEstudiante').value = '';
    document.getElementById('direccionEstudiante').value = '';
    document.getElementById('ciudadEstudiante').value = '';
}

// Actualizar la lista visual de estudiantes
function actualizarListaEstudiantes() {
    const listaDiv = document.getElementById('estudiantesList');
    
    if (estudiantes.length === 0) {
        listaDiv.innerHTML = '<p class="no-students">No hay estudiantes registrados</p>';
        return;
    }
    
    listaDiv.innerHTML = estudiantes.map(estudiante => `
        <div class="student-item" data-id="${estudiante.id}">
            <span><strong>ID:</strong> ${estudiante.id} | <strong>Nombre:</strong> ${estudiante.nomEstudiante}</span>
            <span><strong>Dirección:</strong> ${estudiante.dirEstudiante}</span>
            <span><strong>Ciudad:</strong> ${estudiante.ciuEstudiante}</span>
            <div class="student-actions">
                <button onclick="editarEstudiante(${estudiante.id}, '${estudiante.nomEstudiante}', '${estudiante.dirEstudiante}', '${estudiante.ciuEstudiante}')" class="btn-edit">Editar</button>
                <button onclick="eliminarEstudiantePorId(${estudiante.id})" class="btn-delete">Eliminar</button>
            </div>
        </div>
    `).join('');
}

// Agregar estilos CSS dinámicamente
function agregarEstilosAPI() {
    const estilos = `
        <style>
        .api-section {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #f9f9f9;
        }
        
        .api-section h5 {
            margin-top: 0;
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 5px;
        }
        
        .api-section input, .api-section button {
            margin: 5px;
            padding: 8px 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        
        .api-section button {
            background: #007bff;
            color: white;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .api-section button:hover {
            background: #0056b3;
        }
        
        .api-response {
            margin: 10px 0;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .api-response.success {
            border-left: 4px solid #28a745;
            background: #d4edda;
        }
        
        .api-response.error {
            border-left: 4px solid #dc3545;
            background: #f8d7da;
        }
        
        .response-header {
            display: flex;
            gap: 10px;
            align-items: center;
            padding: 10px;
            background: rgba(0, 0, 0, 0.05);
            font-family: monospace;
            font-size: 12px;
        }
        
        .method-badge {
            padding: 2px 8px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
        }
        
        .method-badge.get { background: #17a2b8; }
        .method-badge.post { background: #28a745; }
        .method-badge.put { background: #ffc107; color: #212529; }
        .method-badge.delete { background: #dc3545; }
        
        .status.status-success { color: #28a745; font-weight: bold; }
        .status.status-error { color: #dc3545; font-weight: bold; }
        
        .response-description {
            padding: 10px;
            font-weight: bold;
            color: #495057;
        }
        
        .response-body {
            padding: 0 10px 10px;
        }
        
        .response-body pre {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 4px;
            font-size: 12px;
            overflow-x: auto;
            margin: 0;
        }
        
        .students-list {
            margin-top: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            background: white;
        }
        
        .students-list h5 {
            margin-top: 0;
            color: #333;
            border-bottom: 2px solid #28a745;
            padding-bottom: 5px;
        }
        
        .student-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 15px;
            margin-bottom: 10px;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            background: #f8f9fa;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .student-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .student-actions {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        
        .btn-edit, .btn-delete {
            padding: 5px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.3s;
        }
        
        .btn-edit {
            background: #ffc107;
            color: #212529;
        }
        
        .btn-edit:hover {
            background: #e0a800;
        }
        
        .btn-delete {
            background: #dc3545;
            color: white;
        }
        
        .btn-delete:hover {
            background: #c82333;
        }
        
        .no-students {
            text-align: center;
            color: #6c757d;
            font-style: italic;
            padding: 20px;
        }
        
        .timestamp {
            margin-left: auto;
            color: #6c757d;
        }
        
        .url {
            font-family: monospace;
            color: #495057;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', estilos);
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    agregarEstilosAPI();
    actualizarListaEstudiantes();
    
    // Mostrar mensaje inicial
    mostrarRespuesta('INFO', '/api/estudiantes', 200,
        { mensaje: "API REST Simulator iniciado", estudiantes: estudiantes.length },
        "Simulador de API Spring Boot listo para usar"
    );
});