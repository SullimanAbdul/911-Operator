<?php 
 
		//include db configuration file
		//include_once("config.php");
		$username = "root"; //mysql username
		$password = ""; //mysql password
		$hostname = "localhost"; //hostname
		$databasename = 'pwebc'; //databasename
	 
		$connecDB = mysqli_connect($hostname, $username, $password,$databasename);
	 
		// Check connection
		if (!$connecDB) {
			die('Could not connect: ' . mysqli_error());
		}
	 
		mysqli_select_db($connecDB,"pweb17_dalmeida");
	 
		// Check DB
		
 		if($_POST){
				/* VALUES */
				$nom=$_POST['nom'];
				$latitude=$_POST['Latitude'];
				$longitude=$_POST['Longitude'];
				if (mysqli_query($connecDB,"UPDATE events SET Latitude='".$latitude."', Longitude = '".$longitude."' WHERE Nom='".$nom."'")){
						echo"modif";
				} else { 
						echo "marche ps";
				}
		}
	mysqli_close($connecDB);
?>
