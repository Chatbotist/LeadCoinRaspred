const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Маршруты для каждой из страниц
app.get('/Coin', (req, res) => {
  res.sendFile(path.join(__dirname, 'Coin', 'index.html'));
});

app.get('/Up', (req, res) => {
  res.sendFile(path.join(__dirname, 'Up', 'index.html'));
});

app.get('/Tasks', (req, res) => {
  res.sendFile(path.join(__dirname, 'Tasks', 'index.html'));
});

app.get('/Top', (req, res) => {
  res.sendFile(path.join(__dirname, 'Top', 'index.html'));
});

// Маршрут по умолчанию
app.get('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
