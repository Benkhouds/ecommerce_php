<?php 
session_start(); 
   if(isset($_POST['cart_item'])){
       require_once('config/db.php');
       $data = json_decode($_POST['cart_item']);
       $check_sql = "select product_id from cart_items where shopping_id = {$_SESSION['cart_id']} "; 
       $check_query = mysqli_query($conn, $check_sql); 
       if($check_query){
            $x=0 ; 
            while($row = mysqli_fetch_assoc($check_query)){
                if((int)$data->id == (int)$row['product_id']){
                    $sql = "update cart_items set quantity= {$data->quantity} where product_id ={$data->id} 
                    and shopping_id = {$_SESSION['cart_id']}";
                    $query = mysqli_query($conn, $sql);
                    echo "update success";
                    $x=1 ;
                }
            }
           
            if($x==0){
                $sql = "insert into cart_items(product_id, shopping_id , quantity) values({$data->id},
                {$_SESSION['cart_id']}, {$data->quantity})";
                $query = mysqli_query($conn, $sql);
            }
       }
       else{
            $sql = "insert into cart_items(product_id, shopping_id , quantity) values({$data->id},
            {$_SESSION['cart_id']}, {$data->quantity})";
            $query = mysqli_query($conn, $sql);
            echo "insert success";
       }

     
   
    }

?>