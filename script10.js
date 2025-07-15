function runBasicSyntax() {
    const output = document.getElementById('output1');
    const result = `Lenguaje: Python
Versión: 3.9
Es interpretado: True
Tipos principales: ['int', 'float', 'str', 'bool', 'list', 'dict']`;
    
    output.innerHTML = result;
}

function runDataStructures() {
    const output = document.getElementById('output2');
    const result = `Lista: ['Python', 'JavaScript', 'Java', 'C++']
Tupla: (10, 20)
Diccionario: {'nombre': 'Ana', 'edad': 22, 'carrera': 'Ingeniería'}
Lista actualizada: ['Python', 'JavaScript', 'Java', 'C++', 'Ruby']`;
    
    output.innerHTML = result;
}

function runOOP() {
    const output = document.getElementById('output3');
    const result = `Toyota Corolla con 4 puertas
Toyota Corolla acelerando a 50 km/h`;
    
    output.innerHTML = result;
}

// Función para verificar tipos de datos
function verificarTipo() {
    const tipo = document.getElementById('tipoVariable').value;
    const valor = document.getElementById('valorVariable').value;
    const resultDiv = document.getElementById('tipoInfo');
    
    if (!valor.trim()) {
        resultDiv.innerHTML = 'Por favor ingresa un valor';
        return;
    }
    
    let resultado;
    let valorConvertido;
    
    try {
        switch(tipo) {
            case 'int':
                valorConvertido = parseInt(valor);
                resultado = isNaN(valorConvertido) ? 'Error: No es un entero válido' : 
                          `Valor: ${valorConvertido}, Tipo: ${typeof valorConvertido}`;
                break;
            case 'float':
                valorConvertido = parseFloat(valor);
                resultado = isNaN(valorConvertido) ? 'Error: No es un decimal válido' : 
                          `Valor: ${valorConvertido}, Tipo: ${typeof valorConvertido}`;
                break;
            case 'str':
                valorConvertido = String(valor);
                resultado = `Valor: "${valorConvertido}", Tipo: ${typeof valorConvertido}`;
                break;
            case 'bool':
                valorConvertido = valor.toLowerCase() === 'true' || valor.toLowerCase() === 'false' ? 
                                valor.toLowerCase() === 'true' : Boolean(valor);
                resultado = `Valor: ${valorConvertido}, Tipo: ${typeof valorConvertido}`;
                break;
            case 'list':
                try {
                    valorConvertido = valor.split(',').map(item => item.trim());
                    resultado = `Lista: [${valorConvertido.map(item => `"${item}"`).join(', ')}], Longitud: ${valorConvertido.length}`;
                } catch {
                    resultado = 'Error: Separa los elementos con comas';
                }
                break;
        }
        
        resultDiv.innerHTML = resultado;
    } catch (error) {
        resultDiv.innerHTML = 'Error al procesar el valor';
    }
}

// Variables globales para las estructuras de datos
let estructuraActual = {
    lista: [],
    tupla: [],
    diccionario: {}
};

function agregarElemento() {
    const tipo = document.getElementById('estructuraType').value;
    const elemento = document.getElementById('elementoInput').value.trim();
    const resultDiv = document.getElementById('estructuraInfo');
    
    if (!elemento) {
        resultDiv.innerHTML = 'Por favor ingresa un elemento';
        return;
    }
    
    switch(tipo) {
        case 'lista':
            estructuraActual.lista.push(elemento);
            resultDiv.innerHTML = `Lista: [${estructuraActual.lista.map(item => `"${item}"`).join(', ')}]`;
            break;
        case 'tupla':
            estructuraActual.tupla.push(elemento);
            resultDiv.innerHTML = `Tupla: (${estructuraActual.tupla.map(item => `"${item}"`).join(', ')})`;
            break;
        case 'diccionario':
            if (elemento.includes(':')) {
                const [clave, valor] = elemento.split(':').map(item => item.trim());
                estructuraActual.diccionario[clave] = valor;
                const items = Object.entries(estructuraActual.diccionario)
                    .map(([k, v]) => `"${k}": "${v}"`)
                    .join(', ');
                resultDiv.innerHTML = `Diccionario: {${items}}`;
            } else {
                resultDiv.innerHTML = 'Para diccionarios usa el formato: clave:valor';
                return;
            }
            break;
    }
    
    document.getElementById('elementoInput').value = '';
}

function limpiarEstructura() {
    const tipo = document.getElementById('estructuraType').value;
    const resultDiv = document.getElementById('estructuraInfo');
    
    switch(tipo) {
        case 'lista':
            estructuraActual.lista = [];
            resultDiv.innerHTML = 'Lista: []';
            break;
        case 'tupla':
            estructuraActual.tupla = [];
            resultDiv.innerHTML = 'Tupla: ()';
            break;
        case 'diccionario':
            estructuraActual.diccionario = {};
            resultDiv.innerHTML = 'Diccionario: {}';
            break;
    }
}

function crearCoche() {
    const marca = document.getElementById('marcaCoche').value.trim();
    const modelo = document.getElementById('modeloCoche').value.trim();
    const puertas = document.getElementById('puertasCoche').value;
    const resultDiv = document.getElementById('cocheInfo');
    
    if (!marca || !modelo || !puertas) {
        resultDiv.innerHTML = 'Por favor completa todos los campos';
        return;
    }
    
    const coche = {
        marca: marca,
        modelo: modelo,
        puertas: parseInt(puertas),
        velocidad: 0
    };
    
    resultDiv.innerHTML = `
        <div style="font-family: 'Courier New', monospace; background: #2d3748; color: #e2e8f0; padding: 10px; border-radius: 5px;">
            <span style="color: #6272a4;"># Clase Coche creada</span><br>
            <span style="color: #ff79c6;">class</span> <span style="color: #50fa7b;">Coche</span>:<br>
            &nbsp;&nbsp;&nbsp;&nbsp;marca = "${coche.marca}"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;modelo = "${coche.modelo}"<br>
            &nbsp;&nbsp;&nbsp;&nbsp;puertas = ${coche.puertas}<br>
            &nbsp;&nbsp;&nbsp;&nbsp;velocidad = ${coche.velocidad} km/h<br><br>
            <span style="color: #f1fa8c;">Descripción: ${coche.marca} ${coche.modelo} con ${coche.puertas} puertas</span>
        </div>
    `;
    
    // Limpiar campos
    document.getElementById('marcaCoche').value = '';
    document.getElementById('modeloCoche').value = '';
    document.getElementById('puertasCoche').value = '';
}

function calcular(operacion) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultDiv = document.getElementById('calcOutput'); // Cambiado aquí
    
    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.innerHTML = '<span style="color: red;">Error: Por favor ingresa números válidos</span>';
        return;
    }
    
    let resultado;
    let operador;
    
    switch(operacion) {
        case 'suma':
            resultado = num1 + num2;
            operador = '+';
            break;
        case 'resta':
            resultado = num1 - num2;
            operador = '-';
            break;
        case 'multiplicacion':
            resultado = num1 * num2;
            operador = '*';
            break;
        case 'division':
            if (num2 === 0) {
                resultDiv.innerHTML = '<span style="color: red;">Error: No se puede dividir por cero</span>';
                return;
            }
            resultado = num1 / num2;
            operador = '/';
            break;
        default:
            resultDiv.innerHTML = '<span style="color: red;">Error: Operación no válida</span>';
            return;
    }
    
    resultDiv.innerHTML = `
        <div style="font-family: 'Courier New', monospace; background: #2d3748; color: #e2e8f0; padding: 10px; border-radius: 5px; margin-top: 10px;">
            <span style="color: #6272a4;"># Calculadora Python</span><br>
            <span style="color: #ff79c6;">def</span> <span style="color: #50fa7b;">calcular</span>(${num1}, ${num2}, '${operacion}'):<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ff79c6;">return</span> ${num1} ${operador} ${num2}<br><br>
            <span style="color: #f1fa8c;">Resultado: ${resultado}</span>
        </div>
    `;
}

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