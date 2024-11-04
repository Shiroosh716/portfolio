<!doctype html>
<html>
    <head>
        <title>Movie Database</title>
        <style>
            #navigation a{
                text-decoration: none;
                border: 1px solid black;
                padding:10px;
                border-radius: 2px;
            }
            #navigation a:active{
                background-color: grey;
            }
            #navigation a:visited{
                color: blue;
            }
            #search{
                background-color: lightblue;
            }
            div{
                margin-bottom: 30px;
            }
            #yr{
                width: 77px;
            }

        </style>
    </head>
    <body>
        <h1>My Movie Database: Search</h1>
        <?php
            include('header.php');

        ?>
        <form method="POST" action="config.php">
            Title: <input type="text" name="searchTitle"><br>
            Year: <input id="yr" type="text" name="searchYear">
            <input type="submit" value="Search">
        </form> 
        <?php

                session_start();
                $movies = $_SESSION['movies'];
                $movies2 = $_SESSION['movies2'];


                if($movies){
                    foreach ($movies as $movie) {
                    print '<p> -' . $movie['title'] . ' '. $movie['year'] .'</p>';
                    }
                }


                if($movies2){
                    foreach ($movies2 as $movie) {
                    print '<p> -' . $movie['title'] . ' '. $movie['year'] .'</p>';
                    }
                }
            

        ?>




    </body>

</html>