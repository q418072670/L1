<?php
//设置页面内容是html编码格式是utf-8
header("Content-Type: text/plain;charset=utf-8"); 
header("Content-Type: application/json;charset=utf-8"); 
//header("Content-Type: text/xml;charset=utf-8"); 
//header("Content-Type: text/html;charset=utf-8"); 
//header("Content-Type: application/javascript;charset=utf-8"); 

//定义一个多维数组，包含员工的信息，每条员工信息为一个数组
$staff = array
	(
		array( "number" => "外套", "link" => "https://uniqlo.tmall.com/p/rd109856.htm"),
		array( "number" => "衬衫", "link" => "https://uniqlo.tmall.com/p/rd341094.htm"),
		array( "number" => "T恤背心", "link" => "https://uniqlo.tmall.com/p/rd803346.htm"),
		array( "number" => "W店庆通栏L3", "link" => "https://uniqlo.tmall.com/category-1307733599.htm")
	);

//判断如果是get请求，则进行搜索；如果是POST请求，则进行新建
//$_SERVER是一个超全局变量，在一个脚本的全部作用域中都可用，不用使用global关键字
//$_SERVER["REQUEST_METHOD"]返回访问页面使用的请求方法
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	search();
} elseif ($_SERVER["REQUEST_METHOD"] == "POST"){
	create();
}

//通过员工编号搜索员工
function search(){
	//检查是否有员工编号的参数
	//isset检测变量是否设置；empty判断值为否为空
	//超全局变量 $_GET 和 $_POST 用于收集表单数据
	if (!isset($_GET["number"]) || empty($_GET["number"])) {
		echo '{"success":false,"msg":"参数错误"}';
		return;
	}
	//函数之外声明的变量拥有 Global 作用域，只能在函数以外进行访问。
	//global 关键词用于访问函数内的全局变量
	global $staff;
	//获取number参数
	$number = $_GET["number"];
	$result = '{"success":false,"msg":"没有找到员工。"}';
	
	//遍历$staff多维数组，查找key值为number的员工是否存在，如果存在，则修改返回结果
	foreach ($staff as $value) {
		if ($value["number"] == $number) {
			$result = '{"success":true,"msg":"女装：' . $value["number"] .'，LINK：' . $value["link"] . '"}';
			break;
		}
	}
    echo $result;
}

//创建员工
function create(){
	//判断信息是否填写完全
	if (!isset($_POST["number"]) || empty($_POST["number"])
		|| !isset($_POST["link"]) || empty($_POST["link"])) {
		echo '{"success":false,"msg":"参数错误，员工信息填写不全"}';
		return;
	}
	//TODO: 获取POST表单数据并保存到数据库
	
	//提示保存成功
	echo '{"success":true,"msg":"员工：' . $_POST["number"] . ' 信息保存成功！"}';
}
