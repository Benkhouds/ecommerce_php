<?php 
   require('config/db.php');
   session_start();
   //get orders
   if($_SESSION['session_id']){
       $sql = "select fname,lname,email,image from users where session_id={$_SESSION['session_id']}";
       $query = mysqli_query($conn,$sql);
       if($query){
           $result = mysqli_fetch_assoc($query);
           echo json_encode($result);
       }
       else{
           echo "error".mysqli_sqlstate($conn);
       }
   }
?>