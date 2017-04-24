<?php
	require_once('../connect.php');
	$wm= $_GET["wm"];
	$name= $_GET["name"];
	$dian= $_GET["dian"];
	$Array=array(array(
		'dian' => '123',  
		'name' => '123',
        'link' => '123',
		'id' => '123',));
	$i=0;
	$mysqli->select_db("$wm");
	$sql="SELECT * FROM `$name` WHERE dian='{$dian}' ";
	if($result = $mysqli->query($sql)){
		 while( $row = mysqli_fetch_assoc($result) ){  
		    $Array[$i]['dian']=$row['dian'];
			$Array[$i]['name']=$row['name'];
			$Array[$i]['link']=$row['link'];
			$Array[$i]['id']=$row['id'];
			$i++;
		};
		 echo json_encode($Array);
		 //echo '{"success":true,"msg":"'.json_encode($Array).'"}';
	}else{
			echo '{"success":false,"msg":"失败"}';};
?>