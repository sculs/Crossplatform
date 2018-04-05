<?php

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

$dbHost = "fdb17.awardspace.net";
$dbUser = "2545511_user";
$dbPass = "4dN_v98z3dwx3";
$dbName = "2545511_user";

$connection = mysqli_connect($dbHost, $dbUser, $dbPass, $dbName);

mysqli_set_charset($connection, "utf8");

$email = $request->email;
$password = $request->password;

if (empty($email)) {
//    array_push($errors, "Email is required");
}
if (empty($password)) {
//    array_push($errors, "Password is required");
}


if (count($errors) == 0) {
    $email = strtolower($email); // lowercase;
    $password = md5($password);  //encrypt the password before saving in the database
    $query = "SELECT * FROM users WHERE email ='".$email."' AND password='".$password."'";

    $result = mysqli_query($connection, $query);

    if (mysqli_num_rows($result) == 1) {
//        echo '<script>alert("You are logged in, Have a nice shopping!"); history.back();</script>';
        $_SESSION['email'] = $email;
        $_SESSION['status'] = "login";
        $row = mysqli_fetch_assoc($result);
        $_SESSION['name'] = $row['name'];
        $_SESSION['userid'] = $row['userid'];


        exit();
    }else {
        $_SESSION['info'] = "Incorrect email or password!<br>Please try again!";
//        echo '<script>alert("Incorrect email or password, please try again!");
//        history.back();</script>';
        header('Location: ../login.php');
    }
}

?>