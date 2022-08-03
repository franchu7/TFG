<?php

include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER['REQUEST_METHOD'] == "POST") {


    $data = json_decode(file_get_contents("php://input", true));


    $id = $data->id;

    
    $name = $data->userData->person->name;
    $surname1 = $data->userData->person->surname1;
    $surname2 = $data->userData->person->surname2;
    
    $dni = $data->userData->dni;

    $gender = $data->userData->gender;
    
    $street =  $data->userData->address->street;
    $streetNum = $data->userData->address->streetNum;
    $floor = $data->userData->address->floor;

    $zipCode = $data->userData->zipCode;
    $location = $data->userData->location;

    $province = $data->userData->province;

    $phoneNum = $data->userData->phoneNum;

    $avatar = $data->userData->avatar;



    $obj->select('users', '*', null, "id='{$id}'", null, null);
    $data = $obj->getResult();
    if(!empty($data)) {
        $obj->update('users',
            [
                'name' => $name,
                'surname1' => $surname1,
                'surname2' => $surname2,
                'dni' => $dni,
                'gender' => $gender,
                'street' => $street,
                'streetNum' => $streetNum,
                'floor' => $floor,
                'zipCode' => $zipCode,
                'location' => $location,
                'province' => $province,
                'phoneNum' => $phoneNum,
                'avatar' => $avatar
            ],
            "id='{$id}'");
        $data = $obj->getResult();
        
        if ($data[0] == 1) {
            echo json_encode([
                'status' => 1,
                'message' => 'Usuario actualizado correctamente',
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
            'message' => "No existe un usuario con ese ID",
        ]);
    }
        
    
   
} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Acceso denegado',
    ]);
}
