<?php 
    $host = 'localhost';
    $dbname = 'dbdino';
    $username = 'root';
    $password = '';

    try {
        $pdo = new PDO ("mysql:host=$host; dbname=$dbname", $username, $password);
        $pdo ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        echo "connected to the database siccsessfully <br>";

        //sql query to create a table
        $sql = "CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        email VARCHAT(50) UNIQUE,
        created_at DATATIME DEFAULT CURRENT_TIMESTAMP
        )";

        $pdo->exec($sql);

        echo "Table 'users' created successfully <br>";
    } catch (PDOException $e) {
        echo "<span style ='color:red;'>Error: " . $e->getMessage() ."</span>";
    }
?>