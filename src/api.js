const express = require('express');
const categoriesRoute = require('./routes/categories');
require('express-async-errors');
const loginRoute = require('./routes/loginRoute');
const usersRoute = require('./routes/usersRoute');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRoute);

app.use('/user', usersRoute);

app.use('/categories', categoriesRoute);

app.use((err, _req, res, _next) => {
  const { message, code } = err;
  res.status(code || 500).json({ message });
});
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
