<?php


include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    try {

        // Obtener todos los alumnos registrados en la base de datos
        $obj->select('users', "*", null, "role='student'", null, null);
        $users = $obj->getResult();   
        $json_arr = array();
        if ($users) {
            echo json_encode([
                'status' => 1,
                'message' => "Conjunto de estudiantes",
                'data' => $users,
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => "Problema en el servidor"
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'status' => 0,
            'message' => $e->getMessage(),
        ]);
    }
} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Acceso Denegado',
    ]);
}
