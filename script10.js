// Variables globales para las estructuras de datos
let listaActual = [];
let tuplaActual = [];
let diccionarioActual = {};

// Función para verificar tipos de datos
function verificarTipo() {
    const tipo = document.getElementById('tipoVariable').value;
    const valor = document.getElementById('valorVariable').value;
    const resultDiv = document.getElementById('tipoInfo');
    
    if (!valor.trim()) {
        resultDiv.innerHTML = '<span style="color: red;">Por favor ingresa un valor</span>';
        return;
    }
    
    let valorConvertido;
    let tipoReal;
    let ejemplo;
    
    try {
        switch(tipo) {
            case 'int':
                valorConvertido = parseInt(valor);
                tipoReal = isNaN(valorConvertido) ? 'Error' : 'int';
                ejemplo = `numero = ${valorConvertido}`;
                break;
            case 'float':
                valorConvertido = parseFloat(valor);
                tipoReal = isNaN(valorConvertido) ? 'Error' : 'float';
                ejemplo = `decimal = ${valorConvertido}`;
                break;
            case 'str':
                valorConvertido = valor;
                tipoReal = 'str';
                ejemplo = `texto = "${valorConvertido}"`;
                break;
            case 'bool':
                valorConvertido = valor.toLowerCase() === 'true' || valor.toLowerCase() === 'false';
                tipoReal = valorConvertido ? 'bool' : 'Error';
                ejemplo = `booleano = ${valor.toLowerCase()}`;
                break;
            case 'list':
                try {
                    valorConvertido = JSON.parse(valor);
                    tipoReal = Array.isArray(valorConvertido) ? 'list' : 'Error';
                    ejemplo = `lista = ${JSON.stringify(valorConvertido)}`;
                } catch {
                    tipoReal = 'Error';
                    ejemplo = 'Formato inválido. Use: [1, 2, 3]';
                }
                break;
        }
        
        if (tipoReal === 'Error') {
            resultDiv.innerHTML = `
                <span style="color: #ff6b6b;">❌ Error de tipo</span><br>
                <span style="color: #666;">El valor "${valor}" no es válido para el tipo ${tipo}</span>
            `;
        } else {
            resultDiv.innerHTML = `
                <div style="font-family: 'Courier New', monospace; background: #2d3748; color: #e2e8f0; padding: 10px; border-radius: 5px; margin-top: 10px;">
                    <span style="color: #6272a4;"># Verificación de tipo</span><br>
                    <span style="color: #50fa7b;">type</span>(${ejemplo}) <span style="color: #ff79c6;">==</span> <span style="color: #f1fa8c;">&lt;class '${tipoReal}'&gt;</span><br>
                    <span style="color: #8be9fd;">✅ Tipo válido: ${tipoReal}</span>
                </div>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = `<span style="color: #ff6b6b;">❌ Error: ${error.message}</span>`;
    }
}

// Función para trabajar con estructuras de datos
function agregarElemento() {
    const tipo = document.getElementById('estructuraType').value;
    const elemento = document.getElementById('elementoInput').value;
    const resultDiv = document.getElementById('estructuraInfo');
    
    if (!elemento.trim()) {
        resultDiv.innerHTML = '<span style="color: red;">Por favor ingresa un elemento</span>';
        return;
    }
    
    switch(tipo) {
        case 'lista':
            listaActual.push(elemento);
            actualizarVisualizacion('lista', listaActual);
            break;
        case 'tupla':
            tuplaActual.push(elemento);
            actualizarVisualizacion('tupla', tuplaActual);
            break;
        case 'diccionario':
            // Para diccionarios, esperamos formato "clave:valor"
            if (elemento.includes(':')) {
                const [clave, valor] = elemento.split(':');
                diccionarioActual[clave.trim()] = valor.trim();
                actualizarVisualizacion('diccionario', diccionarioActual);
            } else {
                resultDiv.innerHTML = '<span style="color: red;">Para diccionarios use formato "clave:valor"</span>';
                return;
            }
            break;
    }
    
    document.getElementById('elementoInput').value = '';
}

// Función para limpiar estructuras
function limpiarEstructura() {
    const tipo = document.getElementById('estructuraType').value;
    
    switch(tipo) {
        case 'lista':
            listaActual = [];
            actualizarVisualizacion('lista', listaActual);
            break;
        case 'tupla':
            tuplaActual = [];
            actualizarVisualizacion('tupla', tuplaActual);
            break;
        case 'diccionario':
            diccionarioActual = {};
            actualizarVisualizacion('diccionario', diccionarioActual);
            break;
    }
}

// Función para actualizar la visualización de estructuras
function actualizarVisualizacion(tipo, estructura) {
    const resultDiv = document.getElementById('estructuraInfo');
    let representacion;
    let operaciones;
    
    switch(tipo) {
        case 'lista':
            representacion = `[${estructura.map(item => `"${item}"`).join(', ')}]`;
            operaciones = estructura.length > 0 ? 
                `<br><span style="color: #6272a4;"># Operaciones disponibles:</span><br>
                 <span style="color: #50fa7b;">len</span>(lista) = ${estructura.length}<br>
                 <span style="color: #50fa7b;">lista.append</span>("nuevo")<br>
                 <span style="color: #50fa7b;">lista.pop</span>()` : '';
            break;
        case 'tupla':
            representacion = `(${estructura.map(item => `"${item}"`).join(', ')})`;
            operaciones = estructura.length > 0 ? 
                `<br><span style="color: #6272a4;"># Tupla inmutable:</span><br>
                 <span style="color: #50fa7b;">len</span>(tupla) = ${estructura.length}<br>
                 <span style="color: #6272a4;"># No se puede modificar</span>` : '';
            break;
        case 'diccionario':
            const entries = Object.entries(estructura).map(([k, v]) => `"${k}": "${v}"`);
            representacion = `{${entries.join(', ')}}`;
            operaciones = entries.length > 0 ? 
                `<br><span style="color: #6272a4;"># Operaciones disponibles:</span><br>
                 <span style="color: #50fa7b;">len</span>(dict) = ${entries.length}<br>
                 <span style="color: #50fa7b;">dict.keys</span>() = [${Object.keys(estructura).map(k => `"${k}"`).join(', ')}]<br>
                 <span style="color: #50fa7b;">dict.values</span>() = [${Object.values(estructura).map(v => `"${v}"`).join(', ')}]` : '';
            break;
    }
    
    resultDiv.innerHTML = `
        <div style="font-family: 'Courier New', monospace; background: #2d3748; color: #e2e8f0; padding: 10px; border-radius: 5px; margin-top: 10px;">
            <span style="color: #ff79c6;">${tipo}</span> = <span style="color: #f1fa8c;">${representacion}</span>
            ${operaciones}
        </div>
    `;
}

// Función para crear coche (simulador de OOP)
function crearCoche() {
    const marca = document.getElementById('marcaCoche').value;
    const modelo = document.getElementById('modeloCoche').value;
    const puertas = document.getElementById('puertasCoche').value;
    const resultDiv = document.getElementById('cocheInfo');
    
    if (!marca || !modelo || !puertas) {
        resultDiv.innerHTML = '<span style="color: red;">Por favor complete todos los campos</span>';
        return;
    }
    
    resultDiv.innerHTML = `
        <div style="font-family: 'Courier New', monospace; background: #2d3748; color: #e2e8f0; padding: 10px; border-radius: 5px; margin-top: 10px;">
            <span style="color: #6272a4;"># Clase Coche creada</span><br>
            <span style="color: #ff79c6;">class</span> <span style="color: #8be9fd;">Coche</span>(<span style="color: #8be9fd;">Vehiculo</span>):<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff79c6;">def</span> <span style="color: #50fa7b;">__init__</span>(self, marca, modelo, puertas):<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #50fa7b;">super</span>().__init__(marca, modelo)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.puertas = puertas<br><br>
            <span style="color: #6272a4;"># Instancia creada:</span><br>
            <span style="color: #f1fa8c;">mi_coche = Coche("${marca}", "${modelo}", ${puertas})</span><br>
            <span style="color: #8be9fd;">✅ ${marca} ${modelo} con ${puertas} puertas</span><br>
            <span style="color: #8be9fd;">🚗 Velocidad actual: 0 km/h</span>
        </div>
    `;
}

// Función principal de calculadora
function calcular(operacion) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultDiv = document.getElementById('calc-output');
    
    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.innerHTML = '<span style="color: red;">Error: Por favor ingresa números válidos</span>';
        return;
    }
    
    let resultado;
    let operador;
    let nombreOperacion;
    
    switch(operacion) {
        case 'suma':
            resultado = num1 + num2;
            operador = '+';
            nombreOperacion = 'suma';
            break;
        case 'resta':
            resultado = num1 - num2;
            operador = '-';
            nombreOperacion = 'resta';
            break;
        case 'multiplicacion':
            resultado = num1 * num2;
            operador = '*';
            nombreOperacion = 'multiplicación';
            break;
        case 'division':
            if (num2 === 0) {
                resultDiv.innerHTML = '<span style="color: red;">Error: No se puede dividir por cero</span>';
                return;
            }
            resultado = num1 / num2;
            operador = '/';
            nombreOperacion = 'división';
            break;
        default:
            resultDiv.innerHTML = '<span style="color: red;">Error: Operación no válida</span>';
            return;
    }
    
    resultDiv.innerHTML = `
        <div style="font-family: 'Courier New', monospace; background: #2d3748; color: #e2e8f0; padding: 10px; border-radius: 5px; margin-top: 10px;">
            <span style="color: #6272a4;"># Calculadora Python</span><br>
            <span style="color: #ff79c6;">def</span> <span style="color: #50fa7b;">${nombreOperacion}</span>(a, b):<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff79c6;">return</span> a ${operador} b<br><br>
            <span style="color: #6272a4;"># Ejecutando operación:</span><br>
            <span style="color: #50fa7b;">${nombreOperacion}</span>(${num1}, ${num2})<br>
            <span style="color: #f1fa8c;">➤ Resultado: ${resultado}</span>
        </div>
    `;
}

// Funciones adicionales para ejemplos de código (si se necesitan)
function runBasicSyntax() {
    const output = document.getElementById('output1');
    if (output) {
        const result = `Lenguaje: Python
Versión: 3.9
Es interpretado: True
Tipos principales: ['int', 'float', 'str', 'bool', 'list', 'dict']`;
        output.innerHTML = result;
    }
}

function runDataStructures() {
    const output = document.getElementById('output2');
    if (output) {
        const result = `Lista: ['Python', 'JavaScript', 'Java', 'C++']
Tupla: (10, 20)
Diccionario: {'nombre': 'Ana', 'edad': 22, 'carrera': 'Ingeniería'}
Lista actualizada: ['Python', 'JavaScript', 'Java', 'C++', 'Ruby']`;
        output.innerHTML = result;
    }
}

function runOOP() {
    const output = document.getElementById('output3');
    if (output) {
        const result = `Toyota Corolla con 4 puertas
Toyota Corolla acelerando a 50 km/h`;
        output.innerHTML = result;
    }
}

// Función para mostrar información de temas
function showTopic(topic) {
    const topics = {
        'sintaxis': 'Python utiliza indentación para delimitar bloques de código. Los comentarios comienzan con #',
        'variables': 'Python es de tipado dinámico. Las variables se crean al asignarles un valor',
        'estructuras': 'Listas [], tuplas (), diccionarios {} son estructuras de datos fundamentales',
        'control': 'if/elif/else, for, while son las estructuras de control principales',
        'funciones': 'def define funciones. Pueden retornar valores y recibir parámetros',
        'oop': 'class define clases. Soporta herencia, encapsulamiento y polimorfismo',
        'excepciones': 'try/except/finally para manejar errores de forma elegante',
        'modulos': 'import permite usar código de otros archivos y librerías'
    };
    
    alert(topics[topic] || 'Tema no encontrado');
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar visualizaciones por defecto
    if (document.getElementById('estructuraInfo')) {
        document.getElementById('estructuraInfo').innerHTML = 'Estructura vacía - Agregue elementos para comenzar';
    }
    if (document.getElementById('tipoInfo')) {
        document.getElementById('tipoInfo').innerHTML = 'Ingrese un valor para verificar su tipo';
    }
    if (document.getElementById('cocheInfo')) {
        document.getElementById('cocheInfo').innerHTML = 'Ingrese los datos del coche';
    }
    if (document.getElementById('calcOutput')) {
        document.getElementById('calcOutput').innerHTML = 'Resultado aparecerá aquí...';
    }
    
    // Configurar eventos de cambio para el selector de estructura
    const estructuraSelect = document.getElementById('estructuraType');
    if (estructuraSelect) {
        estructuraSelect.addEventListener('change', function() {
            const placeholder = document.getElementById('elementoInput');
            if (placeholder) {
                switch(this.value) {
                    case 'lista':
                        placeholder.placeholder = 'Agregar elemento a la lista';
                        break;
                    case 'tupla':
                        placeholder.placeholder = 'Agregar elemento a la tupla';
                        break;
                    case 'diccionario':
                        placeholder.placeholder = 'Formato: clave:valor';
                        break;
                }
            }
        });
    }
});