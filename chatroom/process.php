<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

	$name = $_POST['logNickname'];
	$password = $_POST['logPassword'];


	$filename = getcwd() . '/data/results.txt';
	$fileContents = file_get_contents($filename);

	if($name && $password){
		//if username is in the file
		if (strpos($fileContents, $name) !== false){
			//verify password matches username
			$lines = explode("\n", $fileContents);
	        foreach ($lines as $line) {
	            $userData = explode(' ', $line);
	            if ($userData[0] === $name) {
	                $existingPassword = trim($userData[1]);
	                break;
	            }
	        }
	        if ($password === $existingPassword) {
	            // Password is correct, proceed with login
	            header("Location: index.php?error=intoChat&nickname=$name");
				exit();
	        } else {
	            // Password is incorrect
	            header("Location: index.php?error=incorrect");
	            exit("Incorrect password.");
	        };
		}else{
            header("Location: index.php?error=notThere");
            exit("Username not in records.");
		};
	}else{
		header("Location: index.php?error=missing");
    	exit("Please fill out the form.");
	};
?>