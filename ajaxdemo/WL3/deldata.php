<?php
	require_once('../connect.php');
	
	$wm=$_POST["wm"];
	$id=$_POST["id"];
	$biao=$_POST["biao"];
	
	$sql="DELETE FROM `{$biao}`  WHERE id='{$id}'";
	//判断信息是否填写完全
	
	//TODO: 获取POST表单数据并保存到数据库
	$mysqli->select_db($wm);
	if($mysqli->query($sql)){
	echo '{"success":true,"msg":"信息删除成功！"}';
}else{
	echo '{"success":false,"msg":"失败"}';}


?>