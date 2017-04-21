<?php
	require_once('../connect.php');
	$wm= $_GET["wm"];
	$name= $_GET["name"];
	 $Array=array(array(  
				'dian' => '123',
           		 'name' => '123',
           		 'link' => '123',)
    		);
	$i=0;
	$mysqli->select_db("$wm");
	$sql="SELECT * FROM `$name`";
	if($result = $mysqli->query($sql)){
		 while( $row = mysqli_fetch_assoc($result) ){  
		    $Array[$i]['dian']=$row['dian'];
			$Array[$i]['name']=$row['name'];
			$Array[$i]['link']=$row['link'];
			
			
		};
		 echo json_encode($Array);
		 //echo '{"success":true,"msg":"'.json_encode($Array).'"}';
	}else{
			echo '{"success":false,"msg":"失败"}';};
?>