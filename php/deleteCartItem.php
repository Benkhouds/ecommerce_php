<?php 
     if(isset($_POST['item_id'])){
         require_once('config/db.php');
         session_start();
         $sql = "delete from cart_items where product_id = {$_POST['item_id']} and 
         shopping_id = {$_SESSION['cart_id']}" ;
         $query = mysqli_query($conn, $sql);
         if($query){
             echo "success";
         }else{
             echo "error: " . mysqli_sqlstate($conn); 
         }
     }
?>