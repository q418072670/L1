<?php
	require_once('../connect.php');
	
	$wm=$_POST["wm"];
	$id=$_POST["id"];
	$biao=$_POST["biao"];
	$name=$_POST["name"];
	$link=$_POST["link"];
	$sql="UPDATE `{$biao}` SET `name`='{$name}',`link`='{$link}' WHERE id='{$id}'";
	//判断信息是否填写完全
	if (!isset($name) || empty($name)
		|| !isset($link) || empty($link)) {
		echo '{"success":false,"msg":"参数错误，信息填写不全"}';
		return;
	}
	//TODO: 获取POST表单数据并保存到数据库
	$mysqli->select_db($wm);
	if($mysqli->query($sql)){
	echo '{"success":true,"msg":"信息修改成功！"}';
}else{
	echo '{"success":false,"msg":"失败"}';}


?>