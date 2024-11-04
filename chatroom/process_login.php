<?php
//file for creating new user log in
$name = $_POST['nickname'];
$password = $_POST['password'];

$filename = getcwd() . '/data/results.txt';
$fileContents = file_get_contents($filename);
print $fileContents;

// Make sure they are both filled out
if ($name && $password) {

        // First make sure username isn't already in the file
        if (strpos($fileContents, $name) === false) {
            $data = $name . ' ' . $password . "\n";
            file_put_contents($filename, $data, FILE_APPEND);
            header("Location: index.php?error=none");
            //echo "User created successfully.";
            exit();
        } else{
            header("Location: index.php?error=already");
            exit("Username already in use.");
        };
    }else {
    header("Location: index.php?error=missing");
    exit("Please fill out the form.");
};
?>
