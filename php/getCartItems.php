<?php 
    
    session_start();
    if(isset($_SESSION['cart_id'])){   
        require_once('config/db.php'); 
        $sql= "SELECT p.product_id,q.inventory, q.label,q.price , q.image, p.quantity 
        FROM cart_items p JOIN products q ON p.product_id = q.id where p.shopping_id= {$_SESSION['cart_id']}";
        $query = mysqli_query($conn, $sql) ;
        
        if($query){
           $items =[];
           while($row = mysqli_fetch_assoc($query)){
               $total = (int)$row['quantity']*(int) $row['price'];
                array_push($items,array(
                                    "id" => $row['product_id'],
                                    "stock"=> $row['inventory'],
                                    "label"=> $row['label'],
                                    "price"=> $row['price'].".00",
                                    "image"=> $row['image'],
                                    "counter" => (int)$row['quantity'],
                                    "totalPrice"=> $total,
                                    "category" => "coffee"
                                   )
                            );
           }
           echo json_encode($items);
        }else{
            echo "empty"; 
        }
    }
    else{
        echo "no cart found" ;
    }
?>