<?php 
 
		//include db configuration file
		//include_once("config.php");
		$username = "dalmeida"; //mysql username
		$password = "ADR95z380"; //mysql password
		$hostname = "localhost"; //hostname
		$databasename = 'pweb17_dalmeida'; //databasename
		
		// Create connection
		$conn = new mysqli($hostname, $username, $password, $databasename);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 
		$sql = "SELECT nom,Latitude,Longitude FROM events";
		$result = $conn->query($sql);
		$rows = array();
if ($result->num_rows > 0) {
    // output data of each row
	
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
	
	echo json_encode($rows);

} 


$conn->close();
?>
