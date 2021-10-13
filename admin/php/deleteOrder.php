<?php   
    require_once('config/db.php');
    if(isset($_POST['order_id'])){
        $sql = "delete from order_details where id={$_POST['order_id']}";
        $query = mysqli_query($conn, $sql);
        if($query){
            echo "success";
        }else{
                echo "error: " .mysqli_sqlstate($conn); 
        }
    
    }
?>