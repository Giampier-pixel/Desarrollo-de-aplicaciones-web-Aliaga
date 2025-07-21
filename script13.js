// Función para manejar el formulario PHP
async function handlePhpSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const resultsDiv = document.getElementById('phpResults');
    
    // Mostrar estado de carga
    submitButton.innerHTML = '⏳ Guardando...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch('api/estudiantes2.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Mostrar mensaje de éxito
            resultsDiv.innerHTML = `
                <div style="background: #f0fff4; padding: 20px; border-radius: 10px; border-left: 4px solid #48bb78; margin-top: 20px;">
                    <h5 style="margin: 0 0 10px 0; color: #2d3748;">✅ ¡Estudiante Registrado Exitosamente!</h5>
                    <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 15px;">
                        <p style="margin: 5px 0; color: #2d3748;"><strong>ID:</strong> ${result.id}</p>
                        <p style="margin: 5px 0; color: #2d3748;"><strong>Nombre:</strong> ${result.data.nombre}</p>
                        <p style="margin: 5px 0; color: #2d3748;"><strong>Dirección:</strong> ${result.data.direccion}</p>
                        <p style="margin: 5px 0; color: #2d3748;"><strong>Ciudad:</strong> ${result.data.ciudad}</p>
                    </div>
                </div>
            `;
            
            // Limpiar formulario
            form.reset();
            
        } else {
            // Mostrar error
            resultsDiv.innerHTML = `
                <div style="background: #fed7d7; padding: 20px; border-radius: 10px; border-left: 4px solid #f56565; margin-top: 20px;">
                    <h5 style="margin: 0 0 10px 0; color: #c53030;">❌ Error al Registrar</h5>
                    <p style="margin: 0; color: #c53030;">${result.error || 'Error desconocido'}</p>
                </div>
            `;
        }
        
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = `
            <div style="background: #fed7d7; padding: 20px; border-radius: 10px; border-left: 4px solid #f56565; margin-top: 20px;">
                <h5 style="margin: 0 0 10px 0; color: #c53030;">❌ Error de Conexión</h5>
                <p style="margin: 0; color: #c53030;">No se pudo conectar con el servidor. Verifica tu conexión.</p>
            </div>
        `;
    } finally {
        // Restaurar botón
        submitButton.innerHTML = '🚀 Guardar en Base de Datos';
        submitButton.disabled = false;
    }
}

// Función para cargar estudiantes registrados
async function loadEstudiantes2() {
    const listaDiv = document.getElementById('listaEstudiantes2');
    
    // Mostrar loading
    listaDiv.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <p>⏳ Cargando estudiantes...</p>
        </div>
    `;
    listaDiv.style.display = 'block';
    
    try {
        const response = await fetch('api/estudiantes2.php', {
            method: 'GET'
        });
        
        const result = await response.json();
        
        if (result.success && result.data) {
            if (result.data.length > 0) {
                let html = `
                    <div style="background: #f7fafc; padding: 20px; border-radius: 10px; margin-top: 20px;">
                        <h5 style="margin: 0 0 20px 0; color: #2d3748;">📋 Estudiantes Registrados (${result.count})</h5>
                        <div style="display: grid; gap: 15px;">
                `;
                
                result.data.forEach((estudiante, index) => {
                    html += `
                        <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <h6 style="margin: 0 0 8px 0; color: #2d3748; font-size: 16px;">${estudiante.nomEstudiante}</h6>
                                    <p style="margin: 2px 0; color: #4a5568; font-size: 14px;">📍 ${estudiante.dirEstudiante}</p>
                                    <p style="margin: 2px 0; color: #4a5568; font-size: 14px;">🏙️ ${estudiante.ciuEstudiante}</p>
                                </div>
                                <div style="text-align: right; color: #718096; font-size: 12px;">
                                    <p style="margin: 0;">ID: ${estudiante.idEstudiante}</p>
                                    <p style="margin: 0;">${new Date(estudiante.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                html += `
                        </div>
                    </div>
                `;
                
                listaDiv.innerHTML = html;
            } else {
                listaDiv.innerHTML = `
                    <div style="background: #fef5e7; padding: 20px; border-radius: 10px; border-left: 4px solid #f6ad55; margin-top: 20px;">
                        <h5 style="margin: 0 0 10px 0; color: #c05621;">📝 Sin Registros</h5>
                        <p style="margin: 0; color: #c05621;">No hay estudiantes registrados aún. ¡Sé el primero en registrarte!</p>
                    </div>
                `;
            }
        } else {
            listaDiv.innerHTML = `
                <div style="background: #fed7d7; padding: 20px; border-radius: 10px; border-left: 4px solid #f56565; margin-top: 20px;">
                    <h5 style="margin: 0 0 10px 0; color: #c53030;">❌ Error al Cargar</h5>
                    <p style="margin: 0; color: #c53030;">${result.error || 'Error desconocido'}</p>
                </div>
            `;
        }
        
    } catch (error) {
        console.error('Error:', error);
        listaDiv.innerHTML = `
            <div style="background: #fed7d7; padding: 20px; border-radius: 10px; border-left: 4px solid #f56565; margin-top: 20px;">
                <h5 style="margin: 0 0 10px 0; color: #c53030;">❌ Error de Conexión</h5>
                <p style="margin: 0; color: #c53030;">No se pudo cargar la lista de estudiantes.</p>
            </div>
        `;
    }
}

// Mantener la función original del simulador
function submitEstudiante(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const output = document.getElementById('estudianteOutput');
    
    if (nombre && direccion && ciudad) {
        output.innerHTML = `
            <div style="background: #f0fff4; padding: 15px; border-radius: 8px; border-left: 4px solid #48bb78;">
                <h4 style="margin: 0 0 10px 0; color: #2d3748;">✅ Simulación Completada</h4>
                <p style="margin: 5px 0; color: #2d3748;"><strong>Nombre:</strong> ${nombre}</p>
                <p style="margin: 5px 0; color: #2d3748;"><strong>Dirección:</strong> ${direccion}</p>
                <p style="margin: 5px 0; color: #2d3748;"><strong>Ciudad:</strong> ${ciudad}</p>
                <p style="margin: 10px 0 0 0; color: #4a5568; font-style: italic;">Datos simulados - No guardados en base de datos</p>
            </div>
        `;
        
        // Limpiar formulario
        document.getElementById('estudianteForm').reset();
    }
}