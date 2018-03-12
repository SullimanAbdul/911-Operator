<?php 
	
	$username = "root"; //mysql username
	$password = ""; //mysql password
	$hostname = "localhost"; //hostname
	$databasename = 'pwebc'; //databasename
	 
	$connecDB = mysql_connect($hostname, $username, $password);
	 
	// Check connection
	if (!$connecDB) {
		die('Could not connect: ' . mysql_error());
	  }
	 
	$db_selected = mysql_select_db($databasename,$connecDB);
	 
	// Check DB
	if (!$db_selected) {
	  die ('Can t use  : ' . mysql_error());
	  }
	 
	mysql_close($connecDB);
 
?>