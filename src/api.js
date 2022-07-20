const express = require('express');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const categoriesRoute = require('./routes/categories');
const loginRoute = require('./routes/loginRoute');
const postRoute = require('./routes/post');
const usersRoute = require('./routes/usersRoute');
const swaggerFile = require('../swagger_output.json');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRoute);

app.use('/user', usersRoute);

app.use('/categories', categoriesRoute);

app.use('/post', postRoute);

app.use(errorHandlerMiddleware);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
