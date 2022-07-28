<?php


include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    try {

        $obj->select('users', "*", null, "role='student'", null, null);
        $users = $obj->getResult();   
        $json_arr = array();
        if ($users) {
            foreach($users as $user) {
                //$user['password'] = "Hola";
                //$user['address'] = "prueba";
                //array_push($json_arr,$user);
                //$userJSON->password = "prueba";
                //echo json_encode($user);
                //$user->prueba = "prueba";
            }
            echo json_encode([
                'status' => 1,
                'users' => $users,
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
