const config = require('config');
const app = require('./app');

app.listen(config.get('server.port'), () => {
  console.log(`App is running on http://localhost:${config.get('server.port')}`);
});
