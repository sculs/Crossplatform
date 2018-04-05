<?php
// echo "connected";
// Lägg till följande rader vid problem med Access-Control-Allow-Origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

// En PHP-Fil som tar emot data
$response = file_get_contents("php://input");

// Skicka tillbaka response-info för att testa
echo $response;

// Omvandla JSON till ett PHP-Objekt
$request = json_decode($response);

// Lagra data från objektet i olika variabler
$name = $request->name;
$email = $request->email;
$telephone = $request->telephone;
$member = $request->member;
$gender = $request->gender;
$age = $request->age;


$message = "
<h4>Thank you <b>$name</b>, your order is successfully placed.</h4>
You booked <b>$rooms</b> room(s) for <b>$persons</b> guest(s), breakfast is <b>$breakfast</b>, and the fee is <b>$status</b>.<br>
On your arrival, just show your booking number: <b>$orderid</b> for checking in.<br><br>
Any further information or questions, please contact us with replying this email. <br><br>
Thanks again for choosing Stockholm Bed & Breakfast!
";
$subject = "Booking status";
//$headers = "From: hi@liusong.xyz";

// Skriv detta för att visa HTML-kodning
$headers = "From:  hi@liusong.xyz \r\n" .
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";

if ($email != "") {
    mail($email, $subject, $message, $headers);
}

// Logga in i databasen!
$dbHost = "fdb17.awardspace.net";
$dbUser = "2545511_user";
$dbPass = "4dN_v98z3dwx3";
$dbName = "2545511_user";

$connection = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);
if (!$connection) {
    echo "<h4>" . mysqli_connect_error() . "</h4>";
    exit;
}
mysqli_set_charset($connection, "utf8");

if ($email != "") {
// Förberedd en SQL-sats
    $sql = "INSERT INTO user(name, lastname, email, telephone, gender, age) 
            VALUES ('$name' , '$lastname' , '$email' , '$telephone' , 'gender' , 'age')";

// Exekvera (kör) SQL-satsen
    mysqli_query($connection, $sql) or die(mysqli_error($connection));
}


$sql2 = "SELECT * FROM room";
$result = mysqli_query($connection, $sql2);

$data = array();
//$data = mysqli_fetch_all($result);
//echo json_encode($data, JSON_PRETTY_PRINT);

while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data); // Important
//
//file_put_contents('data.json', $json);
//echo "connected";



?>
