<?php

include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER['REQUEST_METHOD'] == "POST") {


    $data = json_decode(file_get_contents("php://input", true));

    // ID del alumno y la asignatura
    $studentID = $data->studentID;
    $subjectID = $data->subjectID;

    // En caso de que el ID sea '0' hará referencia a todos loas alumnos
    // Insertar un nuevo registro o registros con el ID del alumno y el ID de la asignatura
    if($studentID == 0) {
        $obj->select('users', "*", null, "role='student'", null, null);
        $users = $obj->getResult();
        foreach ($users as $user) {
            $obj->select('student_subject', "*", null, "student_id='{$user['id']}' AND subject_id='{$subjectID}'", null, null);
            $data = $obj->getResult();

            if(!$data) {
                $obj->insert('student_subject', 
                [
                    'student_id' => $user['id'],
                    'subject_id' => $subjectID,
                ]
                );
            }
            
        }
        echo json_encode([
            'status' => 1,
            'message' => 'Alumnos matriculados correctamente',
        ]);

    } else {
        $obj->select("student_subject", "*", null, "student_id='{$studentID}' AND subject_id='{$subjectID}'", null, null);
        $data = $obj->getResult();
        if (isset($data[0]['student_id']) == $studentID && isset($data[0]['subject_id']) == $subjectID) {
            echo json_encode([
                'status' => 0,
                'message' => 'El alumno ya está matriculado',
            ]);
        }else{
            $obj->insert('student_subject', 
                [
                    'student_id' => $studentID,
                    'subject_id' => $subjectID,
                ]);
            $data = $obj->getResult();
            
            if ($data[0] == 1) {
                echo json_encode([
                    'status' => 1,
                    'message' => 'Alumno matriculado en la asignatura',
                ]);
            } else {
                echo json_encode([
                    'status' => 0,
                    'message' => 'Problema en el servidor',
                ]);
            }
        }
    } 
   
} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Acceso denegado',
    ]);
}
