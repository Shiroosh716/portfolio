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
            #view{
                background-color: lightblue;
            }
            div{
                margin-bottom: 30px;
            }
            table{
                border:1px solid black;
            }
            th{
                border: 1px solid black;
                text-align: left;
            }
            #first{
                width:400px;
            }
            #second{
                width:150px;
            }
            #third{
                width:100px;
            }
            .delete:visited{
                color: purple;
            }
            #success{
                background-color: lightblue;
                color:black;
                width:665px;
                padding:2px;
                margin-bottom: 5px;
            }

        </style>
    </head>
    <body>
        <h1>My Movie Database: View</h1>

        <?php
            include('header.php');

            if($_GET){
                if ($_GET['status'] == 'delete') {
        ?>

                <div id="success">A movie has been deleted!</div>

        <!-- grab all movies from the database and display to the user -->
        <?php
        }
    }

            // connect to database
            $dbpath ='/home/sz2760/databases/movies.db';
            $db = new SQLite3($dbpath);


            // set up a SQL query to get all movies from the table
            $sql = "SELECT id, title, year FROM movies";
            $statement = $db->prepare($sql);
            $result = $statement->execute();
        

            // iterate over those movies and generate output
            print '<table>';
            while ($array = $result->fetchArray()) {

                //print '<tr id="'.$array['id'] . '"><th id="first">' . $array['title'] . '</th><th id="second">' . $array['year'] . '</th><th id="third"><a  href="delete.php" id="'.$array['id'] .'" class="delete">Delete</a>' . '</th>'.'</tr>';

                print '<tr id="'.$array['id'] . '"><th id="first">' . $array['title'] . '</th><th id="second">' . $array['year'] . '</th><th id="third"><a id=num"'.$array['id'] .'" class="delete" href="delete.php?id='.$array['id'].'">Delete</a>' . '</th>'.'</tr>';

            }
            print '</table>';

            $db->close();
            unset($db);

        ?>



    </body>

</html>