<?php   
    require_once('config/db.php');
    if(isset($_POST['cat'])){
        $cat = json_decode($_POST['cat']);
        $sql = "update categories set label='{$cat->label}',sub_cat='{$cat->sub}' where id={$cat->id}";
        $query = mysqli_query($conn, $sql);
        if($query){
            echo "success";
        }else{
                echo "error: " .mysqli_sqlstate($conn); 
        }
    
    }
?>