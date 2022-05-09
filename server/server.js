const express = require('express');
const app = express();
require('dotenv').config();
const api = require('./routes');
const db = require('./config/database');
db();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api 처리는 './routes/index'에서 일괄처리
app.use('/api', api);

// configuration 
app.set('port', process.env.PORT);

app.listen(app.get('port'), () => {
  console.log('포트 넘버 : ' + app.get('port') + "에서 실행 중");
});