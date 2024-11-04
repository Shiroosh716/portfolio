<!doctype html>
<html>
    <head>
        <title>Movie Database</title>
        <style>
            #error{
                background-color: red;
                color:white;
                width:180px;
                padding:2px;
                margin-bottom: 5px;
            }
            #success{
                background-color: lightblue;
                color:black;
                width:180px;
                padding:2px;
                margin-bottom: 5px;
            }
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
            #add{
                background-color: lightblue;
            }
            div{
                margin-bottom: 30px;
            }

        </style>
    </head>
    <body>
        <h1>My Movie Database: Add</h1>
        <?php
            include('header.php');

            if($_GET){

                if ($_GET["status"] == 'error') {
        ?>

                <div id="error">You forgot a value!</div>

        <?php
            }
                if ($_GET["status"] == 'success'){
                    ?>
                    <div id="success">You added a movie!</div>
            
            <?php
                 }
                };
        
        ?>
        <form method="POST" action="add_save.php">
            Title: <input type="text" name="title"><br>
            Year: <input type="text" name="year"><br>
            <input style="margin-top:10px" type="submit" value="Add Movie">
        </form> 


    </body>

</html>