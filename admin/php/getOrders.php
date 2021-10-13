<?php 
     
    require_once('config/db.php');
    $sql = "select * from order_details ORDER BY user_id ";
    $query = mysqli_query($conn, $sql);
    if($query){
        $result = mysqli_fetch_all($query); 
        echo json_encode($result);
    }else{
        echo "error: " .mysqli_sqlstate($conn); 
    }

?>