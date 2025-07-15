
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