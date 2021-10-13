<?php 
     
    require_once('config/db.php');
    $sql = "select * from products ";
    $query = mysqli_query($conn, $sql);
    if($query){
        $result = mysqli_fetch_all($query); 
        echo json_encode($result);
    }else{
        echo json_encode(array("error"=>mysqli_sqlstate($conn))); 
    }

?>