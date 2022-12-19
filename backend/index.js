const connectToMongoose = require('./db');
const express = require('express')

connectToMongoose();
const app = express()
const port = 3002

app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/api/auth', require('./routes/auth'));
// app.use('api/notes', require('.routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})