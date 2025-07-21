<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Configuración de la base de datos usando variables de entorno de Vercel
$host = $_ENV['MYSQL_HOST'] ?? 'estudiantes-db-1-flask21e12ed.e.aivencloud.com';
$username = $_ENV['MYSQL_USER'] ?? 'avnadmin';
$password = $_ENV['MYSQL_PASSWORD'] ?? 'AVNS_jNTjSKAKXF6vAkvb9Qg';
$database = $_ENV['MYSQL_DATABASE'] ?? 'defaultdb';
$port = $_ENV['MYSQL_PORT'] ?? 24967;

function conectarDB() {
    global $host, $username, $password, $database, $port;
    
    try {
        // Configuración SSL para Aiven
        $dsn = "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
            PDO::MYSQL_ATTR_SSL_CA => null
        ];
        
        $pdo = new PDO($dsn, $username, $password, $options);
        return $pdo;
    } catch (PDOException $e) {
        return ['error' => 'Error de conexión: ' . $e->getMessage()];
    }
}

function crearTablaEstudiantes2($pdo) {
    $sql = "CREATE TABLE IF NOT EXISTS estudiantes2 (
        idEstudiante INT AUTO_INCREMENT PRIMARY KEY,
        nomEstudiante VARCHAR(255) NOT NULL,
        dirEstudiante VARCHAR(255) NOT NULL,
        ciuEstudiante VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    try {
        $pdo->exec($sql);
        return true;
    } catch (PDOException $e) {
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Procesar inserción de nuevo estudiante
    $nombre = $_POST['nombre'] ?? '';
    $direccion = $_POST['direccion'] ?? '';
    $ciudad = $_POST['ciudad'] ?? '';
    
    if (empty($nombre) || empty($direccion) || empty($ciudad)) {
        echo json_encode(['error' => 'Todos los campos son requeridos']);
        exit;
    }
    
    $pdo = conectarDB();
    if (isset($pdo['error'])) {
        echo json_encode($pdo);
        exit;
    }
    
    // Crear tabla si no existe
    crearTablaEstudiantes2($pdo);
    
    try {
        $stmt = $pdo->prepare("INSERT INTO estudiantes2 (nomEstudiante, dirEstudiante, ciuEstudiante) VALUES (?, ?, ?)");
        $result = $stmt->execute([$nombre, $direccion, $ciudad]);
        
        if ($result) {
            $id = $pdo->lastInsertId();
            echo json_encode([
                'success' => true,
                'message' => 'Estudiante registrado exitosamente',
                'id' => $id,
                'data' => [
                    'nombre' => $nombre,
                    'direccion' => $direccion,
                    'ciudad' => $ciudad
                ]
            ]);
        } else {
            echo json_encode(['error' => 'Error al registrar estudiante']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en la consulta: ' . $e->getMessage()]);
    }
    
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Obtener lista de estudiantes
    $pdo = conectarDB();
    if (isset($pdo['error'])) {
        echo json_encode($pdo);
        exit;
    }
    
    // Crear tabla si no existe
    crearTablaEstudiantes2($pdo);
    
    try {
        $stmt = $pdo->query("SELECT * FROM estudiantes2 ORDER BY created_at DESC LIMIT 10");
        $estudiantes = $stmt->fetchAll();
        
        echo json_encode([
            'success' => true,
            'data' => $estudiantes,
            'count' => count($estudiantes)
        ]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error al obtener estudiantes: ' . $e->getMessage()]);
    }
}
?>