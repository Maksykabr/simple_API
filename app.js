const express = require('express');

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));


app.use('/', indexRouter);


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started: http://localhost:${PORT}`);
});
