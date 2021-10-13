<?php 
session_start();
   if(isset($_SESSION['session_id'])){
       echo "logged"; 
   }
   else{
       echo " not logged";
   }
?>