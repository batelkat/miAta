const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const cors = require('cors');
const _ = require('lodash');

const app = express();



app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const { User } = require('./Helpers/UserClass');

require('./socket/streams')(io, User, _);
require('./socket/private')(io);

const dbConfig = require('./config/secret');
const auth = require('./routes/authRoutes');
const posts = require('./routes/postRoutes');
const users = require('./routes/userRoutes');
const friends = require('./routes/friendsRoutes');
const message = require('./routes/messageRoutes');
const image = require('./routes/imageRoutes');
const suggestedQuestion = require('./routes/sueggestedQuestionRoutes');
const suggestedValues = require('./routes/sueggestedValuesRoutes');
const nation = require('./routes/nationRoutes');


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url,
    { useNewUrlParser: true, useUnifiedTopology: true, useNewUrlParser: true }, process.env.MONGO_URI

  )
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log('DB not Connected!');
  });

app.use('/api', auth);
app.use('/api', posts);
app.use('/api', users);
app.use('/api', friends);
app.use('/api', message);
app.use('/api', image);
app.use('/api', suggestedQuestion);
app.use('/api', suggestedValues);
app.use('/api', nation);

app.get('*', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});