<?php 
     
    require_once('config/db.php');
    if(isset($_POST['product_id'])){
        $sql = "delete from products where id={$_POST['product_id']}";
        $query = mysqli_query($conn, $sql);
        if($query){
            echo "success";
        }else{
                echo "error: " .mysqli_sqlstate($conn).": {$_POST['product_id']}"; 
        }
    
    }
    
?>