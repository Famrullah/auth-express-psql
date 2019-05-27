import express from 'express';
import BodyParser from 'body-parser';
import morgan from 'morgan';
import { sequelize } from './models';
const port = process.env.PORT || 8080;
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(morgan('combined'));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

require('./routes')(app);

sequelize
  .sync()
  .then(() => {
    app.listen(port, (req, res) => {
      console.log('app is runnig on port' + port);
    });
  })
  .catch(err => console.log(err));
