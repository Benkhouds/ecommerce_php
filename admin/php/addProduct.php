<?php 
   require_once('./config/db.php');
   $origin = mysqli_real_escape_string($conn, $_POST["origin"]);
   $label = mysqli_real_escape_string($conn, $_POST["label"]);
   $category = (int)mysqli_real_escape_string($conn, $_POST["category"]);
   $price = mysqli_real_escape_string($conn, $_POST["price"]);
   $stock = (int)mysqli_real_escape_string($conn, $_POST["stock"]);
   $extensions = ["jpeg", "jpg", "png"];
   if (!empty($origin) && !empty($label) && !empty($category) && !empty($price)&& !empty($stock)) {     
        if (isset($_FILES['image']) && $_FILES["image"]["error"] == 0) {
            $img_name = basename($_FILES['image']['name']);
            $img_extension = pathinfo($img_name, PATHINFO_EXTENSION);
            if (in_array($img_extension, $extensions)) {
                $img_tmp_name = $_FILES['image']['tmp_name'];
                if (!file_exists("../../assets/images/" . $img_name)) {
                    $img_tmp = $_FILES["image"]["tmp_name"];
                    move_uploaded_file($img_tmp,"../../assets/images/". $img_name);
                }
                else{
                    $img_name = uniqid();
                    $img_tmp = $_FILES["image"]["tmp_name"];
                    move_uploaded_file($img_tmp,"../../assets/images/".$img_name);
                }
                $sql = "insert into products(origin, label,image, category_id , inventory, price)
                values('{$origin}','{$label}','{$img_name}',{$category},{$stock},{$price})";
                $query = mysqli_query($conn, $sql);
                if($query){
                    echo "success";
                }
                else{
                    echo "error".mysqli_sqlstate($conn);
                }
             }
             else{
                 echo "extension unavailable" ;
             }
         }else{
            echo "error :image".$_FILES["image"]["error"];
        }
    }

?>