<?php   
    require_once('config/db.php');
    if(isset($_POST['user_id'])){
        $sql = "delete from users where id={$_POST['user_id']}";
        $query = mysqli_query($conn, $sql);
        if($query){
            echo "success";
        }else{
                echo "error: " .mysqli_sqlstate($conn); 
        }
    
    }
?>