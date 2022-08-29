<?php

include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER['REQUEST_METHOD'] == "POST") {


    $data = json_decode(file_get_contents("php://input", true));

    // Datos para la tabla de calificaciones

    $studentID = $data->grade->student_id;
    $subjectID = $data->grade->subject_id;
    $grade = $data->grade->grade;

    // Actualizar la calificación del alumno en esa asignatura
    $obj->select('student_subject', '*', null, "student_id='{$studentID}' AND subject_id='{$subjectID}'", null, null);
    $data = $obj->getResult();
    if(!empty($data)) {
        $obj->update('student_subject',
            [
                'grade' => $grade
            ],
            "student_id='{$studentID}' AND subject_id='{$subjectID}'");
        $data = $obj->getResult();
        
        if ($data[0] == 1) {
            echo json_encode([
                'status' => 1,
                'message' => 'Calificación actualizada correctamente',
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
            'message' => "El alumno no tiene esa asignatura",
        ]);
    }
        
    
   
} else {
    echo json_encode([
        'status' => 0,
        'message' => 'Acceso denegado',
    ]);
}
