
<?php
// get the ID of the movie to be deleted from the query string
$id = $_GET['id'];

// connect to the database
$dbpath = getcwd().'database/movies.db';
$db = new SQLite3($dbpath);

// prepare and execute the SQL DELETE statement
$sql = "DELETE FROM movies WHERE id = :id";
$stmt = $db->prepare($sql);
$stmt->bindValue(':id', $id, SQLITE3_INTEGER);
$result = $stmt->execute();

// close the database connection
$db->close();

if ($id){
        header("Location: index.php?status=delete");
        exit();
    };

// redirect the user back to the view page
header('Location: index.php');
exit();
?>
