<?php 


   session_start();
  
   if(isset($_SESSION['session_id'])){
       require_once('config/db.php');
       $items = json_decode($_POST['order']);
       $check_sql ="";
       foreach($items as $item){
           $check_sql .="SELECT CASE WHEN inventory >= {$item->counter} THEN '1' ELSE '0' END AS result from products where id={$item->id};";
       }
       $check_array=[];
       $i=true;
       if(mysqli_multi_query($conn,$check_sql)){
                do{
                    if($result = mysqli_store_result($conn)){
                        while ($row = mysqli_fetch_row($result)) {
                                array_push($check_array, $row[0]);
                            }
                        mysqli_free_result($result);
                    }
                    else{
                        echo "error : ".mysqli_sqlstate($conn);
                    }
                    if(mysqli_more_results($conn)) {
                        $i = true;
                        mysqli_next_result($conn) ;
                    }else {
                        $i = false;
                    }
                    
                }while ($i);    
        }
        else{
            echo "error".mysqli_sqlstate($conn) ;
        }
        if(!in_array(0,$check_array)){
            $user_sql = "select id,email from users where session_id = {$_SESSION['session_id']} ";
            $user_query= mysqli_query($conn,$user_sql);
            if($user_query){
                    $user_info = mysqli_fetch_assoc($user_query);
                    $user_email =$user_info['email'];
                    $order_sql = "insert into order_details(user_id,total) values({$user_info['id']}, {$_POST['orderTotal']})" ;
                    $order_query = mysqli_query($conn, $order_sql);
                    if($order_query){
                        $data=[];
                        $items_sql="";
                        $order_id= mysqli_insert_id($conn);
                        foreach($items as $item){
                            $id = (int)($item->id); 
                            $quantity = (int)($item->counter); 
                            array_push($data,"({$order_id},{$id},{$quantity})");
                        }
                        $items_sql.= "insert into order_items(order_id,product_id,quantity) values" . implode(',',$data);    
                        $items_query = mysqli_query($conn, $items_sql);
                        if($items_query){
                           
                            
                            require('./check.php');
                            echo "success";
                            
                            
                            
                        }
                        else{
                            echo "error2: ". mysqli_sqlstate($conn);
                        }
                    }else{
                    echo "error1: ". mysqli_sqlstate($conn)."user_id".$user_id;
                    }
            }
            else{
                echo "error_user: ".mysqli_sqlstate($conn);
            }
        }
        else{
            echo "insufficient inventory";
        }

   }else{
       echo "Not logged In" ; 
   }

?>