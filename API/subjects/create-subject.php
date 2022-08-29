<?php

include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER['REQUEST_METHOD'] == "POST") {


    $data = json_decode(file_get_contents("php://input", true));

    // Datos de uan asginatura

    $name = $data->subjectData->name;
    $description = $data->subjectData->description;
    $avatar = $data->subjectData->avatar;

    // Comprobar si ya existe la asignatura, en caso de que no, se inserta un nuevo registro
    $obj->select("subjects", "name", null, "name='{$name}'", null, null);
    $data = $obj->getResult();
    if (isset($data[0]['name']) == $name) {
        echo json_encode([
            'status' => 2,
            'message' => 'La asignatura ya existe',
        ]);
    }else{
        $obj->insert('subjects', 
            [
                'name' => $name,
                'description' => $description,
                'avatar' => $avatar
            ]);
        $data = $obj->getResult();
        
        if ($data[0] == 1) {
            echo json_encode([
                'status' => 1,
                'message' => 'Asignatura creada correctamente',
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => 'Problema en el servidor',
            ]);
        }
    }
   
} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Acceso denegado',
    ]);
}
