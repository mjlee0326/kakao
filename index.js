var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('./config/passport');
var util = require('./util');
var app = express();
const cors = require('cors');
const kakaoEmbed = require('./lib/kakaoEmbed');
require('dotenv').config();


var Post=require('./models/Post');
var User=require('./models/User');


const logger = require('./logger');
const apiRouter = express.Router();
// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
console.log('## DB connecting.');
db.once('open', function() {
    console.log('## DB connected.');
    console.log('## Path:', process.env.MONGO_DB);
});
db.on('error', function(err) {
    console.log('## DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({ secret: 'MySecret', resave: true, saveUninitialized: true }));
app.use(cors());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Logger
app.use(logger());

// Custom Middlewares
app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.util = util;
    next();
});

// Routes
app.use('/', require('./routes/home'));
app.use('/api/posts', util.getPostQueryString, require('./routes/posts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/comments', util.getPostQueryString, require('./routes/comments'));
app.use('/api/files', require('./routes/files'));
app.use('/api', require('./routes/kakao'));

/*
//kakao
app.use('/api', apiRouter);


apiRouter.post('/sayHello', function(req, res) {
  let responseBody = new kakaoEmbed();
  responseBody.addText('안녕하세요. 모두의 공모ZONE입니다 :)');
  res.status(200).send(responseBody.output());
});


apiRouter.post('/category', function(req, res) {

  let responseBody = new kakaoEmbed();
  responseBody
  .addText('원하시는 카테고리를 선택해주세요')
  .addQuickReplies('공모전', { action: 'message', messageText: '공모전'})
  .addQuickReplies('대외활동', { action: 'message', messageText: '대외활동'})
  .addQuickReplies('인턴', { action: 'message', messageText: '인턴'})
  .addQuickReplies('서포터즈', { action: 'message', messageText: '서포터즈'})
  res.status(200).send(responseBody.output());
});

//숭실대학교
apiRouter.post('/category1', function(req, res){
    let responseBody = new kakaoEmbed();
    Post.find({group:'숭실대학교'}).limit(3).exec((err, data)=>{
        responseBody
          .addCarousel({
              "type": "basicCard",
              "items": [
              {
                  "title": `${data[0].title}`,
                  "description": `${data[0].body}`,
                  "thumbnail": {
                  "imageUrl": "https://blog.kakaocdn.net/dn/bW0PQR/btqAUvYwr0Y/wkAY2HmxzFENkiIG0HEge1/img.jpg"
                  },
                  "buttons": [
                  {
                      "action":  "webLink",
                      "label": "자세히",
                      "webLinkUrl": "http://gonggam.toast.paas-ta.com/"
                  }
                  ]
              },
              {
                  "title": `${data[1].title}`,
                  "description": `${data[1].body}`,
                  "thumbnail": {
                      "imageUrl": "https://t1.daumcdn.net/cfile/tistory/9978AD415E09E29E35"
                  },
                  "buttons": [
                      {
                      "action":  "webLink",
                      "label": "자세히",
                      "webLinkUrl": "http://gonggam.toast.paas-ta.com/"
                      }
                  ]
                  },
                  {
                    "title": `${data[2].title}`,
                    "description": `${data[2].body}`,
                    "thumbnail": {
                        "imageUrl": "https://t1.daumcdn.net/cfile/tistory/9978AD415E09E29E35"
                    },
                    "buttons": [
                        {
                        "action":  "webLink",
                        "label": "자세히",
                        "webLinkUrl": "http://gonggam.toast.paas-ta.com/"
                        }
                    ]
                    },

              ]}
          )
          .addQuickReplies('메인으로', { action: 'message', messageText: '메인으로'})
          res.status(200).send(responseBody.output());
  });
  
  
  })
  
*/


// Port setting
var port = (process.env.PORT || 3000);
app.listen(port, function() {
    console.log('## Server ON');
    console.log('## URL: http://localhost:' + port);
});