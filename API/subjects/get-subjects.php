<?php


include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    try {

        // Obtener todas las asignaturas registradas en la base de datos
        $obj->select('subjects', "*", null, null, null, null);
        $subjects = $obj->getResult();   
        if ($subjects) {
            echo json_encode([
                'status' => 1,
                'message' => "Conjunto de asignaturas",
                'data' => $subjects,
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
