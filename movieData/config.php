<?php

    // get the search query from the user input
    $search_title = $_POST['searchTitle'];
    $search_year = $_POST['searchYear'];


    session_start();

    // connect to the database
    $dbpath ='/home/sz2760/databases/movies.db';
    $db = new SQLite3($dbpath);

    if(strlen($search_title) == 0 && strlen($search_year) == 0){
        print " ";
        $db->close();
        $_SESSION ['movies'] = '';
        $_SESSION ['movies2'] = '';
        header('Location: search_form.php');
        exit();
    }
    else if(strlen($search_year) == 0){
        // prepare and execute the SQL SELECT statement with a search query
        $sql = "SELECT * FROM movies WHERE title LIKE :search_title";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':search_title', "%$search_title%", SQLITE3_TEXT);
        $result = $stmt->execute();

        // fetch all matching movies as an array of associative arrays
        $movies = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $movies[] = $row;
        }

        // close the database connection
        $db->close();
        $_SESSION ['movies'] = $movies;
        $_SESSION ['movies2'] = '';

        // display the matching movies
        foreach ($movies as $movie) {
            print '<p> -' . $movie['title'] . '</p>';
        }

        header('Location: search_form.php');
        exit();

    }else if(strlen($search_title) == 0){
        $sql2 = "SELECT * FROM movies WHERE year = :search_year";
        $stmt2 = $db->prepare($sql2);
        $stmt2->bindValue(':search_year', $search_year, SQLITE3_TEXT);
        $result2 = $stmt2->execute();



        $movies2 = array();
        while ($row2 = $result2->fetchArray(SQLITE3_ASSOC)) {
            $movies2[] = $row2;
        }

        // close the database connection
        $db->close();
        $_SESSION ['movies'] = '';
        $_SESSION ['movies2'] = $movies2;

        

        foreach ($movies2 as $movie) {
            print '<p> - '. $movie['year'] .'</p>';
        }

        header('Location: search_form.php');
        exit();

    }else{
        // prepare and execute the SQL SELECT statement with a search query
        $sql = "SELECT * FROM movies WHERE title LIKE :search_title";
        $stmt = $db->prepare($sql);
        $stmt->bindValue(':search_title', "%$search_title%", SQLITE3_TEXT);
        $result = $stmt->execute();

        $sql2 = "SELECT * FROM movies WHERE year = :search_year";
        $stmt2 = $db->prepare($sql2);
        $stmt2->bindValue(':search_year', $search_year, SQLITE3_TEXT);
        $result2 = $stmt2->execute();

        // fetch all matching movies as an array of associative arrays
        $movies = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $movies[] = $row;
        }

        $movies2 = array();
        while ($row2 = $result2->fetchArray(SQLITE3_ASSOC)) {
            $movies2[] = $row2;
        }

        // close the database connection
        $db->close();
        $_SESSION ['movies'] = $movies;
        $_SESSION ['movies2'] = $movies2;

        // display the matching movies
        foreach ($movies as $movie) {
            print '<p> -' . $movie['title'] . ' '. $movie['year'] .'</p>';
        }

        foreach ($movies2 as $movie) {
            print '<p> -' . $movie['title'] . ' '. $movie['year'] .'</p>';
        }

        header('Location: search_form.php');
        exit();

    }


?>