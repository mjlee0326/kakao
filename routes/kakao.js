var express = require('express');
const kakaoEmbed = require('../lib/kakaoEmbed');
const apiRouter = express.Router();


var Post=require('../models/Post');
var User=require('../models/User');

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
                    "imageUrl": "../dummy/1.png"
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
    
  
  
module.exports = apiRouter;