const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Inicjalizacja serwera
const app = express();

// Konfiguracja (pozwala na komunikację z frontendem i czytanie JSON-ów)
app.use(cors());
app.use(express.json());

// Ustawienia połączenia z lokalną bazą MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pbl_db'
});

// Próba połączenia z bazą
db.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
        return;
    }
    console.log('Udało się połączyć z bazą MySQL');
});

app.get('/', (req, res) => {
    res.send('Serwer bazy danych');
});

// Uruchomienie serwera na porcie 3000
app.listen(3000, () => {
    console.log('Serwer działa na adresie http://localhost:3000');
});

// Konfiguracja mysql i express
app.get('/api/ingredients', (req, res) => {
    const search = req.query.q || '';
    // Upewnij się, że nazwa tabeli 'ingredients' zgadza się z bazą 'pbl_db'
    const query = "SELECT * FROM ingredients WHERE food_name LIKE ?";
    
    db.query(query, [`%${search}%`], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Błąd bazy danych');
        } else {
            res.json(results);
        }
    });
});