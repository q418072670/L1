<?php

$tonglan="通栏";
/* Connect to a MySQL server  连接数据库服务器 */
$mysqli = mysqli_connect(
    'localhost',  /* The host to connect to 连接MySQL地址 */
    'root',      /* The user to connect as 连接MySQL用户名 */
    '123',
	'tl');    /* The default database to query 连接数据库名称*/

if (!$mysqli) {
    printf("Can't connect to MySQL Server. Errorcode: %s ", mysqli_connect_error());
    exit;
}else
    echo '数据库连接上了！';
$mysqli->set_charset("UTF8");
$wm="W限定L3";
$name="麻系列";
$link="undefind";
if(strpos($wm, "限定")){
	echo 'xianding！';
		if($link=="undefined"){
			$sql="SELECT `link` FROM `{$wm}` WHERE name='{$wm}'";
			}else{
			$sql="SELECT `link` FROM `{$wm}` WHERE name='{$name}'";}
	}
if($result = $mysqli->query($sql)){
	print_r($result->fetch_row());}
else{
	echo "错误";
	}
 
 $mysqli->close();//别忘
/* Close the connection 关闭连接*/


/*$host="localhost";//mysql主机地址
$user="root"; //mysql 登录账户
$pwd="123"; //mysql登录密码
//连接数据库
$conn = mysql_connect($host,$user,$pwd);
//判断
if (!$conn) {
  die('连接数据库失败: ' . mysql_error());
  }
echo "mysql 连接成功！";*/
 
/*if(mysql_select_db("WL3")){
	echo "选择数据库成功";
}else{
	echo "选择数据库失败";
}*/

/*mysqli_query('set names utf8');
if(mysqli_query('INSERT INTO `外套`(`name`, `link`) VALUES ("衬衫","https://uniqlo.tmall.com/#!women")')){
echo "插入成功";
}else{ 
echo "插入失败";
}*/
/*
$query=mysql_query('select *from `外套`');
while($row=mysql_fetch_object($query)){
	echo $row->name;
	echo "<br/>";
	}*/

//其他代码......
 
// 关闭mysql连接

?>