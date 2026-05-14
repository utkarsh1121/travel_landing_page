<?php
date_default_timezone_set('Asia/Kolkata');
// echo $_POST['destination'];
// echo $_POST['travel_date'];
// echo $_POST['tour_type'];
// print_r($_POST);



$destination = $_POST['destination'] ?? '';
$travel_date = $_POST['travel_date'] ?? '';
$tour_type = $_POST['tour_type'] ?? '';

$suer_data = array(
  'destination' => htmlspecialchars($destination),
  'travel_date' => htmlspecialchars($travel_date),
  'tour_type' => htmlspecialchars($tour_type),
  'submitted_at' => date('Y-m-d H:i:sa'),
  'message' => 'Data saved successfully!',
);

    foreach ($suer_data as $value) {
    if ($value ==""){
    echo "All fields are required";
      exit;
    }
    if($travel_date < date('Y-m-d') || $travel_date > date('Y-m-d', strtotime('+3 year'))){
      echo "Travel date must be in the future or less than 3 years";
      exit;
    }
}

// echo file_put_contents("log.txt", "Entry logged");

$file = 'leads.txt';
$jsonData = json_encode($suer_data , JSON_PRETTY_PRINT);

file_put_contents(__DIR__ . '/' . $file, $jsonData . PHP_EOL . PHP_EOL, FILE_APPEND);


header('Content-Type: application/json; charset=utf-8');

header('Location: ../index.html?status=success');
// exit;
// echo $jsonData;
// echo "Data saved successfully!";

