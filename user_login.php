<?php
 
// Importing DBConfig.php file.
include 'db.php';
 
// Creating connection.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
$userName = $obj['username'];
$password = $obj['password'];
$Id_D_A = 3;

$Sql_Query = "select * from cmk_ticket_login where username = '$userName' and password = '$password' and Id_D_A= '$Id_D_A'";

// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($con,$Sql_Query));


if(isset($check)){

 $SuccessLoginMsg = 'Data Matched';
 
 // Converting the message into JSON format.
$SuccessLoginJson = json_encode($SuccessLoginMsg);
 
// Echo the message.
 echo $SuccessLoginJson ; 

 }
 
 else{
 
 // If the record inserted successfully then show the message.
$InvalidMSG = 'Invalid Username or Password Please Try Again' ;
 
// Converting the message into JSON format.
$InvalidMSGJSon = json_encode($InvalidMSG);
 
// Echo the message.
 echo $InvalidMSGJSon ;
 
 }
 
 mysqli_close($con);
?>