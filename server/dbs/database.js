const mysql = require('mysql')

const conn = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

// Transactions
conn.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

var query = 'SELECT * FROM foods';

conn.query(query, function (err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }

  console.log('--------------------------SELECT----------------------------');
  console.log(result);
  console.log('------------------------------------------------------------\n\n');
});

conn.end();
