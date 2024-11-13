<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quotes Website</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      text-align: left;
      padding: 8px;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f2f2f2;
    }

    .button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      border-radius: 4px;
    }
  </style>
</head>
<body>

  <h1>Welcome to our Quotes Website</h1>

  <h2>Quotes</h2>
  <table>
    <thead>
      <tr>
        <th>Quote</th>
        <th>Author</th>
      </tr>
    </thead>
    <tbody>
      <?php
      // Membaca data dari file quotes.txt
      $quotes = file('quotes.txt');

      // Menampilkan quotes
      foreach ($quotes as $quote) {
        $parts = explode('|', $quote);
        $quoteText = trim($parts[0]);

        // Memeriksa apakah array memiliki setidaknya dua elemen
        if (count($parts) >= 2) {
          $author = trim($parts[1]);

          echo '<tr>';
          echo '<td>' . $quoteText . '</td>';
          echo '<td>' . $author . '</td>';
          echo '</tr>';
        } else {
          // Jika array tidak memiliki dua elemen, tampilkan pesan atau abaikan quote
          // Misalnya:
          // echo '<tr><td>' . $quoteText . '</td><td>(Author tidak tersedia)</td></tr>';
        }
      }
      ?>
    </tbody>
  </table>

  <br>

  <a href="login." class="button">Login</a>

</body>
</html>