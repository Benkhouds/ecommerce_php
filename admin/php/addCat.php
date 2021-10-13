<?php 
   require_once('./config/db.php');
   $label = mysqli_real_escape_string($conn, $_POST["label"]);
   $sub_cat = mysqli_real_escape_string($conn, $_POST["sub_cat"]);
   

    $sql = "insert into categories (label,sub_cat) values('{$label}' , '{$sub_cat}')";
    $query = mysqli_query($conn, $sql);
    if($query){
        echo "success";
    }
    else{
        echo "error".mysqli_sqlstate($conn);
    }
   ?>