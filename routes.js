const authenticationCtrl = require('./controllers/authenticationCtrl');
const validation = require('./helper/validation');

module.exports = app => {
  app.post('/register', validation.register, authenticationCtrl.register);
  app.post('/login', authenticationCtrl.login);
  app.get('/test', authenticationCtrl.test);
};
