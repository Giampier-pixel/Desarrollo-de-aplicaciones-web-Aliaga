<?php
// api/connection.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de la base de datos usando variables de entorno de Vercel
$host = $_ENV['MYSQL_HOST'] ?? 'estudiantes-db-1-flask21e12ed.e.aivencloud.com';
$username = $_ENV['MYSQL_USER'] ?? 'avnadmin';
$password = $_ENV['MYSQL_PASSWORD'] ?? 'AVNS_jNTjSKAKXF6vAkvb9Qg';
$database = $_ENV['MYSQL_DATABASE'] ?? 'defaultdb';
$port = $_ENV['MYSQL_PORT'] ?? 24967;

try {
    // Crear conexión PDO
    $dsn = "mysql:host={$host};port={$port};dbname={$database};charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false
    ]);
    
    // Crear tabla si no existe
    $createTable = "
        CREATE TABLE IF NOT EXISTS students (
            idEstudiante INT AUTO_INCREMENT PRIMARY KEY,
            nomEstudiante VARCHAR(255) NOT NULL,
            dirEstudiante VARCHAR(255) NOT NULL,
            ciuEstudiante VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ";
    $pdo->exec($createTable);
    
    // Manejar diferentes métodos HTTP
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch($method) {
        case 'GET':
            // Obtener estadísticas
            $stmt = $pdo->query("SELECT COUNT(*) as total FROM students");
            $total = $stmt->fetch()['total'];
            
            $stmt = $pdo->query("SELECT COUNT(DISTINCT ciuEstudiante) as ciudades FROM students");
            $ciudades = $stmt->fetch()['ciudades'];
            
            $stmt = $pdo->query("SELECT COUNT(*) as hoy FROM students WHERE DATE(created_at) = CURDATE()");
            $hoy = $stmt->fetch()['hoy'];
            
            echo json_encode([
                'success' => true,
                'data' => [
                    'total_estudiantes' => $total,
                    'ciudades_activas' => $ciudades,
                    'registros_hoy' => $hoy,
                    'database_status' => 'Connected to MySQL Aiven'
                ]
            ]);
            break;
            
        case 'POST':
            // Registrar nuevo estudiante
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['nombre']) || !isset($input['direccion']) || !isset($input['ciudad'])) {
                echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
                break;
            }
            
            $stmt = $pdo->prepare("INSERT INTO students (nomEstudiante, dirEstudiante, ciuEstudiante) VALUES (?, ?, ?)");
            $result = $stmt->execute([$input['nombre'], $input['direccion'], $input['ciudad']]);
            
            if ($result) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Estudiante registrado exitosamente',
                    'id' => $pdo->lastInsertId()
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al registrar estudiante']);
            }
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    }
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false, 
        'message' => 'Error de conexión: ' . $e->getMessage()
    ]);
}
?>