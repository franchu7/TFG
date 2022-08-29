<?php

include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // ID de la asignatura
    $id = $data->id;
    
    // Eliminar una asignatura de la base de datos
    $obj->select('subjects', '*', null, "id='{$id}'", null, null);
    $data = $obj->getResult();
    if(!empty($data)) {
        $obj->delete("subjects", "id='{$id}'");
        $result = $obj->getResult();
        if ($result[0] == 1) {
            echo json_encode([
                'status' => 1,
                'message' => "Asignatura eliminada correctamente",
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => "Problema en el servidor",
            ]);
        }

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