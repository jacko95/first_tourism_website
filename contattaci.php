<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Contattaci</title>
        <link rel="stylesheet" href="css/contattaci.css">
    </head>
    <body>
    <header>
        <div class="container">
            <img src="immagini/ONTWN50.jpg" alt="logo" class="logo">
            <nav>
                <ul>
                    <li><a href="index.html">HOME</a></li>
                    <li><a href="storia.html">STORIA</a></li>
                    <li><a href="gallery.html">GALLERY</a></li>
                    <li><a href="mappa.html">DOVE SIAMO</a></li>
                    <li><a href="#">CONTATTACI</a></li>
                </ul>
            </nav>
        </div>
    </header>
        <div class="contact-form">
            <h2>Contattaci</h2>
            <form method="post">
                <input type="text" name="name" placeholder="Nome" required>
                <input type="text" name="phone" placeholder="Telefono" required>
                <input type="text" name="email" placeholder="Email" required>
                <textarea name="message" placeholder="Messaggio" required></textarea>
                <input type="submit" name="submit" class="submit-btn">
            </form>
            <div class="status">
                <?php

                $host = 'pweb1819politid.altervista.org'/*'localhost'*/;
                $user = 'pweb1819politid';
                $password = '';
                $dbname = 'my_pweb1819politid';

                $dsn = 'mysql:host='. $host .';dbname='. $dbname;

                // Create a PDO instance
                $pdo = new PDO($dsn, $user, $password);

                /*per stampare il db*/
                $stmt = $pdo->query('SELECT * FROM utenti');
                
                session_start(); // Start the session

                if(isset($_POST['submit'])){
                    $user_name = $_POST['name'];
                    $user_phone = $_POST['phone'];
                    $user_email = $_POST['email'];
                    $user_message = $_POST['message'];

                    $email_from = $user_email;
                    $email_subject = "Nuova iscrizione";
                    $email_body = 
                    "Nome: $user_name.\n".
                    "Telefono: $user_phone.\n".
                    "Email: $user_email.\n".
                    "Messaggio: $user_message.\n";

                    $to_email = "pweb1819politid@altervista.org";
                    $headers = "Da: $email_from \r\n";
                    $headers .= "a: $user_email\r\n";

                    $UserIP = $_SERVER['REMOTE_ADDR'];

                    $response = file_get_contents($url);
                    $response = json_decode($response);

                    setcookie('name', $user_name, time()+3600); // 1 ora
                    setcookie('email', $user_email, time()+3600);
                    setcookie('phone', $user_phone, time()+3600);
                    setcookie('message', $user_message, time()+3600);
                    $_SESSION['name'] = htmlentities($_POST['name']);
                    $_SESSION['email'] = htmlentities($_POST['email']);
                    $_SESSION['phone'] = htmlentities($_POST['phone']);
                    $_SESSION['message'] = htmlentities($_POST['message']);

                    mail($to_email, $email_subject, $email_body, $headers);
                        
                    echo "Messaggio inviato con successo<br>";

                    if(count($_SESSION) > 0){
                        echo 'Ci sono '.count($_SESSION).' sessioni salvate';
                    } else {                            
                    	echo 'Non ci sono sessioni salvate';
                    }
                    echo '<br>';

                    if(count($_COOKIE) > 0){
                        echo 'Ci sono '.count($_COOKIE).' cookie salvati';
                    } else {
                        echo 'Non ci sono cookie salvati';
                    }
                    echo '<br>';
                }

                // INSERT DATA
                $nome = $user_name;
                $telefono = $user_phone;
                $email = $user_email;
                $messaggio = $user_message;

                $insert = 'INSERT INTO utenti(nome, telefono, email, messaggio) VALUES(:nome, :telefono, :email, :messaggio)';
                $stmt = $pdo->prepare($insert);
                $stmt->execute(['nome' => $nome, 'telefono' => $telefono, 'email' => $email, 'messaggio' => $messaggio]);
				
                ?>
            </div>
        </div>
    </body>
</html>