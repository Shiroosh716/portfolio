<?php

    // grab data from the user
    $title = $_POST['title'];
    $year = $_POST['year'];


    if (!$title) {
        // send them back to the form and tell them
        // to fill it out
        header("Location: add_form.php?error=forgot");
        exit();
    }
    if (!$year) {
        // send them back to the form and tell them
        // to fill it out
        header("Location: add_form.php?error=forgot");
        exit();
    }


    // connect to database
    $dbpath = getcwd() . '/database/movies.db';
    $db = new SQLite3($dbpath);


    // insert a record into our table
    $sql = "INSERT INTO movies (title, year) VALUES (:title, :year)";
    $statement = $db->prepare($sql);
    $statement->bindValue(':title', $title);
    $statement->bindValue(':year', $year);
    $statement->execute();

    $rows_affected = $db->changes();

    $db->close();
    unset($db);


    // redirect them back so they can add more movies to the database
    header("Location: add_form.php");
    exit();

?>