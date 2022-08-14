<?php

include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    // ID del alumno
    $id = (string)($data->id);

    // Obtener datos del alumno existente dado su ID
    $obj->select('users', '*', null, "id='{$id}'", null, null);
    $data = $obj->getResult();
    if(!empty($data)) {
       
        echo json_encode([
            'status' => 1,
            'message' => "Usuario encontrado",
            'data' => $data
        ]);
    } else {
        echo json_encode([
            'status' => 0,
            'message' => "No existe un usuario con ese ID",
        ]);
    }
     
} else {
    echo json_encode([
        'status' => 0,
        'message' => "Acceso denegado",
    ]);
}