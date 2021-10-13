<?php 
    session_start();
    require('config/db.php');
    if(isset($_GET['product_id'])){
        $sql = "select id, origin, label, image, inventory as stock ,price from products where id = {$_GET['product_id']}";
        $query = mysqli_query($conn,$sql);
        if($query){
            $product = json_encode(mysqli_fetch_assoc($query));
            echo $product ;
        }
        else{
            echo "error".mysqli_sqlstate($conn);
        }

    }
   
?>