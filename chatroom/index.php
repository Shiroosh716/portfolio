<!DOCTYPE html>
<html>
    <head>
        <!--Favicon-->
		<link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon.ico">
        
        <title>Let's Chat!</title>
        <style>
            #previous_messages {
                width: 100%;
                height: 300px;
                resize: none;
            }
            .hidden {
                display: none;
                visibility: hidden;
            }
            .missing{
                width: 400px;
                height: 50px;
                background-color: red;
                color: white;
            }
            #error{
                width: 200px;
                height: 25px;
                background-color: red;
                color: white;
            }
            .error{
                justify-content: center;
                position: relative;

                width: 200px;
                height: 25px;
                bottom: -40px;
                margin-top: 115px;
                margin-left: 41%;
                background-color: red;
                color: white;
            }
            #enter_log{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 40px;
            }
            #create_user{
                position: relative;
                justify-content: center;
                align-items: center;
                margin-top: 5px;
            }
            #panel_nickname{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: lavender;
                width:30%;
                padding:40px;
                padding-top:70px;
                border-radius: 40px;
            }
            h1{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 100px;
                font-size: 72px;
            }
            input{
                margin:5px;
            }
            body{
                background-image: url('images/3.jpg');
            }

        </style>
        <script src="helpers.js"></script>
        <script>
            function changePanel(e) {
                userNickname = document.querySelector('#logNickname').value;
                userPassword = document.querySelector('#logPassword').value;
                document.querySelector('#panel_nickname').classList.add('hidden');
                document.querySelector('#panel_chat').classList.remove('hidden');
            }
            function changeEntryPanel(e) {
                document.querySelector('#createNew_panel').classList.add('hidden');
                document.querySelector('#login_panel').classList.remove('hidden');
            }

                function submitForm(formId, successCallback) {
                userNickname = document.querySelector('#logNickname').value;
                userPassword = document.querySelector('#logPassword').value;
                const form = document.getElementById(formId);
                const formData = new FormData(form);

                performFetch({
                    url: form.action,
                    method: form.method,
                    data: formData,
                    success: successCallback,
                    error: function(error) {
                        console.log("ERROR:", error);
                    }
                });
            }
        </script>
    </head>
    <body>
        <h1>Let's Chat!</h1>

        <div id="panel_nickname">
            <div id=createNew_panel>
                <form action ="process_login.php" method="POST" id="create_user_form">
                    Username: <input type="text" id="nickname" name="nickname"><br>
                    Password: <input type="text" id="password" name="password"><br>
                    <button type="submit" id="create_user">Create Log-in</button><br>
                    <a href='#' id="enter_log">Have an account</a>
                </form>
            </div>
            <div id="login_panel" class="hidden">
                <form action ="process.php" method="POST" id="login_form">
                    Username: <input type="text" id="logNickname" name="logNickname"><br>
                    Password: <input type="password" id="logPassword" name="logPassword"><br>
                    <button type="submit" id="log_in">Log-in</button>
                </form>
            </div>
        </div>

        <div id="panel_chat" class="hidden">
            <textarea id="previous_messages" readonly></textarea>
                <div id='error' class='hidden'>Please fill out the message</div>
                <input type="text" id="message" name="Message">
                <button type="submit" id="button_sendmessage">Send Message</button>
        </div>
                

        <script>
            // global variables
            let userNickname;

            document.querySelector('#enter_log').onclick = changeEntryPanel;

            //submit the create user form to php
            document.querySelector('#create_user_form').addEventListener('submit', function(e) {
            //e.preventDefault(); // Prevent the default form submission
            submitForm('create_user_form', function(data) {
                // Handle the response from the PHP file
                console.log("SUCCESS:", data);
                changeEntryPanel(); // Show the chat panel
                });
            });

            // //submit the log-in form to php
            // document.querySelector('#login_form').addEventListener('submit', function(e) {
            //     //logs into chat automatically without disappearing
            //     //e.preventDefault(); // Prevent the default form submission

            //     submitForm('login_form', function(data) {
            //         // Handle the response from the PHP file
            //         console.log("SUCCESS:", data);
            //         changePanel(); // Show the chat panel
            //     });
            // });



            // when the user types in a new chat message
            document.querySelector('#button_sendmessage').onclick = function(e) {
                userNickname = document.querySelector('#logNickname').value;
                userPassword = document.querySelector('#logPassword').value;
                let error = document.getElementById('error');
                error.classList.add('hidden');

                //validating user message
                var message = document.querySelector('#message').value;
                if(message.trim().length == 0){
                    error.classList.remove('hidden');
                }else{

                    // contact the server with our message AND our nickname
                    performFetch({
                        url: 'api.php?command=save',
                        method: 'post',
                        data: {
                            nickname: userNickname,
                            message: document.querySelector('#message').value
                        },
                        success: function(data) {
                            console.log("SUCCESS");
                            //console.log(data);
                            if (data != "MISSINGDATA") {
                                document.querySelector('#previous_messages').value += data + "\n";
                            }else{
                                //validate here
                            }
                        },
                        error: function(error) {
                            console.log("ERROR");
                        }
                    })

                }
                 function getAllMessages() {

                    performFetch({
                        url: 'api.php',
                        method: 'get',
                        data: {
                            command: 'get_all_messages'
                        },
                        success: function(data) {
                            //console.log(data);



                            // take what the server gave us and turn it into a JS object
                            data = JSON.parse( data );

                            //console.log(data);

                            document.querySelector('#previous_messages').value = '';

                            for (let i = 0; i < data.length; i++) {
                                document.querySelector('#previous_messages').value += data[i] + "\n";
                            }
                            scrollToEnd(document.querySelector('#previous_messages'));
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    })
                }

                setInterval(
                    getAllMessages,
                    3000
                );
                //automatic scroll feature
                function scrollToEnd(textbox) {
                  textbox.scrollTop = textbox.scrollHeight;
                }

                //hover override
                const myTextarea = document.getElementById("previous_messages");
                let shouldScroll = true;

                myTextarea.addEventListener("mouseover", () => {
                  shouldScroll = false;
                });

                myTextarea.addEventListener("mouseout", () => {
                  shouldScroll = true;
                });

                function scrollToEnd(textbox) {
                  if (shouldScroll) {
                    textbox.scrollTop = textbox.scrollHeight;
                  }
                }


                //const myTextarea = document.getElementById("previous_messages");
                //myTextarea.addEventListener("input", () => {
                  //scrollToEnd(myTextarea);
                //});

            //clear input box 
            document.querySelector('#message').value = '';
            }; 
            //end of else

        </script>
    <?php 
        if (isset($_GET['error'])){
                if($_GET['error']=='missing'){
                    print "<div id='missing' class='error'>missing</div>";
                }else if($_GET['error']=='already'){
                    print "<div id='already' class='error'>username already in use</div>";
                }else if($_GET['error']=='notThere'){
                    print "<div id='notThere' class='error'>username not in records</div>";
                }else if($_GET['error']=='incorrect'){
                    print "<div id='incorrect' class='error'>Incorrect password</div>";
                }else if($_GET['error']=='none'){
    ?>
                    <script>
                    changeEntryPanel();
                    </script>
            <?php
                }else if($_GET['error']=='intoChat'){
             ?>
                    <script>
                    //either its always hidden or I change parenthesis and its always chat
                    //changePanel;
                       //userNickname = document.querySelector('#logNickname').value;
                        document.querySelector('#logNickname').value = '<?php print $_GET['nickname']; ?>';
                        //userPassword = document.querySelector('#logPassword').value;
                        document.querySelector('#createNew_panel').classList.add('hidden');
                        document.querySelector('#login_panel').classList.add('hidden');
                        document.querySelector('#panel_nickname').classList.add('hidden');
                        document.getElementById('panel_nickname').classList.add('hidden');
                        document.querySelector('#panel_chat').classList.remove('hidden');
                    </script>
            <?php
                }; 
    
            };
            ?>

    </body>

</html>

