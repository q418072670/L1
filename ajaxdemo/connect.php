<?php

$mysqli = mysqli_connect(
    'localhost',  /* The host to connect to 连接MySQL地址 */
    'root',      /* The user to connect as 连接MySQL用户名 */
    '123'  /* The password to use 连接MySQL密码 */
    );    /* The default database to query 连接数据库名称*/
$mysqli->set_charset("UTF8");	
?>