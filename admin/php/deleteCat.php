<?php   
    require_once('config/db.php');
    if(isset($_POST['cat_id'])){
        $sql = "delete from categories where id={$_POST['cat_id']}";
        $query = mysqli_query($conn, $sql);
        if($query){
            echo "success";
        }else{
                echo "error: " .mysqli_sqlstate($conn); 
        }
    
    }
?>