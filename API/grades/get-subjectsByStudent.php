<?php


include '../database/cors.php';
include '../database/Database.php';

$obj = new Database();

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    try {

        $data = json_decode(file_get_contents("php://input"));
    
        // ID del alumno
        $studentID = (string)($data->studentID);

        // Obtener asignaturas del usuario a través de la tabla de calificaciones
        $obj->select('student_subject', "*", null, "student_id='{$studentID}'", null, null);
        $grades = $obj->getResult();   
        $subjects_arr = array();
        if ($grades) {
            foreach ($grades as $grade) {
                $subjectID = $grade['subject_id'];
                $obj->select('subjects', "*", null, "id='{$subjectID}'", null, null);
                $subject = $obj->getResult(); 
                if($subject) {
                    array_push($subjects_arr, $subject);
                } else {
                    echo json_encode([
                        'status' => 0,
                        'message' => "No existe una asignatura con ese ID"
                    ]);
                }

            }

            echo json_encode([
                'status' => 1,
                'message' => "Conjunto de asignaturas por estudiante",
                'data' => $subjects_arr,
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => "No existe un estudiante con ese ID"
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
