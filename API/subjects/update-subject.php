<?php

include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER['REQUEST_METHOD'] == "POST") {


    $data = json_decode(file_get_contents("php://input", true));

    // ID y datos de la asignatura

    $id = $data->id;

    $name = $data->subjectData->name;
    $description = $data->subjectData->description;
    $avatar = $data->subjectData->avatar;


    // Actualizar la asignatura existente con los nuevos datos
    $obj->select('subjects', '*', null, "id='{$id}'", null, null);
    $data = $obj->getResult();
    if(!empty($data)) {
        $obj->update('subjects',
            [
                'name' => $name,
                'description' => $description,
                'avatar' => $avatar
            ],
            "id='{$id}'");
        $data = $obj->getResult();
        
        if ($data[0] == 1) {
            echo json_encode([
                'status' => 1,
                'message' => 'Asignatura actualizada correctamente',
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => 'Problema en el servidor',
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
        'message' => 'Acceso denegado',
    ]);
}
