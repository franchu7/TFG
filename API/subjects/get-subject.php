<?php

include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    // ID de la asignatura
    $id = (string)($data->id);

    // Obtener los datos de la asignatura
    $obj->select('subjects', '*', null, "id='{$id}'", null, null);
    $data = $obj->getResult();
    if(!empty($data)) {
       
        echo json_encode([
            'status' => 1,
            'message' => "Asignatura encontrada",
            'data' => $data
        ]);
    } else {
        echo json_encode([
            'status' => 0,
            'message' => "No existe una asignatura con ese ID",
        ]);
    }
     
} else {
    echo json_encode([
        'status' => 0,
        'message' => "Acceso denegado",
    ]);
}