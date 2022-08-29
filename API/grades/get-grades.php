<?php


include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    try {

        $data = json_decode(file_get_contents("php://input"));
    
        // ID del alumno
        $studentID = (string)($data->studentID);

        // Obtener calificaciones del alumno
        $obj->select('student_subject', "*", null, "student_id='{$studentID}'", null, null);
        $grades = $obj->getResult();   
        if ($grades) {
            echo json_encode([
                'status' => 1,
                'message' => "Conjunto de calificaciones por estudiante y asignatura",
                'data' => $grades,
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
