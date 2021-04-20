// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Current reservations & waitlist (DATA)

const reservations = [
  {
    routeName: 'yoda',
    name: 'Yoda',
    phoneNum: 'Jedi Master',
    email: 900,
    customerID: 2000,
  },
 
];

const waitList = [

];

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

// Displays all current table reservations
app.get('/api/reservations', (req, res) => res.json(reservations));
// Displays everyone on the waitlist
app.get('/api/waitlist', (req, res) => res.json(waitList));

// Checks
app.get('/api/reservations', (req, res) => {
  
    if (reservations.length <= 5) {
      return res.json(false);
    } else {
    return res.json(true);
    }

});

// Create New Characters - takes in JSON input
app.post('/api/reservations', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
 newReservation.routeName = newReservation.customerName.replace(/\s+/g, '').toLowerCase();

  console.log (newReservation);

  reservations.push (newReservation);
  res.json (newReservation);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));
