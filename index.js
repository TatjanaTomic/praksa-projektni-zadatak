const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const deviceRoute=require('./routes/device');
const measurementRoute = require('./routes/data');
const defaultRoute = require('./routes/default');
const moment = require('moment');

app.use(jsonParser);

app.use('/api/device', deviceRoute);
app.use('/api/data', measurementRoute);

app.get('/api/time', (req, res) => {
  res.status(200).json({   //mi vracamo json
    time : moment().utc().format('YYYY-MM-DD HH:mm:ss') //moment  vraca tren vrij
  })
});

app.use('/', defaultRoute)



/*app.get('/', (req, res) => {
  res.status(200).json({
    message : 'Hello World'
  })
});*/

const port = process.env.port || 3001;

app.listen(port, () => {
  console.log('Started on port ' + port);
})


