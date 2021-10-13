<?php 
session_start(); 
   if(isset($_POST['items'])){
       require_once('config/db.php');
       $items = json_decode($_POST['items']);
       $sql_delete = "delete from cart_items where shopping_id = {$_SESSION['cart_id']}"; 
       $delete_query = mysqli_query($conn,$sql_delete);
       if($delete_query){
            $data=[];
            foreach($items as $item){
                $id = (int)($item->id); 
                $quantity = (int)($item->counter); 
                array_push($data,"({$_SESSION['cart_id']},{$id},{$quantity})");
            }
            $items_sql.= "insert into cart_items(shopping_id,product_id,quantity) values" . implode(',',$data);    
            $items_query = mysqli_query($conn, $items_sql);
            if($items_query){
                echo "success";
            }
            else{
                echo "error: " .mysqli_sqlstate($conn);
            }
       }
       else{
           echo "error:" .mysqli_sqlstate($conn);
       }

     
   
    }