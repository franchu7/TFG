<?php

include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER['REQUEST_METHOD'] == "POST") {


    $data = json_decode(file_get_contents("php://input", true));


    $name = $data->person->name;
    $surname1 = $data->person->surname1;
    $surname2 = $data->person->surname2;
    
    $dni = $data->dni;

    $gender = $data->gender;
    
    $street =  $data->address->roadType . " " . $data->address->street;
    $streetNum = $data->address->streetNum;
    $floor = $data->address->floor;

    $zipCode = $data->zipCode;
    $location = $data->location;

    $province = $data->province;

    $phoneNum = $data->phoneNum;

    $email = $data->email;
    $password = $data->password;
    $new_password = password_hash($password, PASSWORD_DEFAULT);
    $role = $data->role;
    $avatar = $data->avatar;

    // check user by email
    $obj->select("users", "email", null, "email='{$email}'", null, null);
    $is_email = $obj->getResult();
    if (isset($is_email[0]['email']) == $email) {
        echo json_encode([
            'status' => 2,
            'message' => 'El correo ya existe',
        ]);
    }else{
        $obj->insert('users', 
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
                'email' => $email,
                'password' => $new_password,
                'role' => $role,
                'avatar' => $avatar
            ]);
        $data = $obj->getResult();
        
        if ($data[0] == 1) {
            echo json_encode([
                'status' => 1,
                'message' => 'Usuario registrado correctamente',
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
