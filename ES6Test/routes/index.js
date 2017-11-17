var express = require('express');
var router = express.Router();
var ret = require('./res/esTest')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var SMS = require('./res/SMS_code');
var regist = require('./res/registered');
var zcreg = require('./res/zc/zc');
var cr = require('./res/zc/cr');
var dl = require('./res/dl/dl');
var del = require('./res/del');
var xgmm = require('./res/xgmm/xgmm');
var xgpn = require('./res/xgpn/xgpn');
var sczl = require('./res/sczl/sczl');
/* GET home page. */
var r_MSGFalse = {
  'code':'0',
  'msg':'失败'
}
router.get('/api', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/api/6', function(req, res) {
  res.send('hello word!');
});
router.get('/api/zc', function(req, res) {
  res.send('hello word!');
});
router.get('/api/s', function(req, res) {
  res.send('hello word!');
});
router.get('/api/dl', function(req, res) {
  res.send('hello word!');
});
router.get('/api/xgmm', function(req, res) {
  res.send('hello word!');
});
router.get('/api/xgpn', function(req, res) {
  res.send('hello word!');
});
router.get('/api/sczl', function(req, res) {
  res.send('hello word!');
});
// router.post('/zc',(req, res) => {
//   let hello = '';
//   let promise = ret.es(1, () =>{}).then((result) =>{
//       hello = result;
//       console.log(result)
//   }).catch((error) => {
//       console.log(error);
//   })
//   res.send(hello);
// });
router.post('/api/zc',multipartMiddleware,(req, res) => {
      let r_MSGTrue = {
        'code':'1',
        'msg':'成功'
    }
    let phoners = /^1[0-9]{10}$/
    console.log(req.body.phoneN)
    if(phoners.test(req.body.phoneN)){
        let promise = zcreg.regzc(req.body.phoneN,req.body.SMS_Code, () =>{}).then((result) =>{
            console.log(result)
            console.log(req.body.SMS_Code)
            if(result==req.body.SMS_Code){
              console.log('开始插入')
              let promise =  cr.regcr(req.body.phoneN,req.body.Password, () =>{}).then((result) =>{
                  console.log('插入成功')
                  console.log(result)
                    if(result=='1'){
                      let promise =  del.rdel(req.body.phoneN, () =>{}).then((result) =>{
                            if(result=='1'){
                              res.json(r_MSGTrue)
                              res.end();
                            }else{
                              res.json(r_MSGFalse);
                              res.end();
                            }
                        }).catch((error) => {
                          console.log(error);
                          res.json(r_MSGFalse);
                          res.end();
                        })
                    }else{
                      res.json(r_MSGFalse);
                      res.end();
                    }
                }).catch((error) => {
                  console.log(error);
                  res.json(r_MSGFalse);
                  res.end();
                })
            }else{
                res.json(r_MSGFalse)
                res.end();
            }
        }).catch((error) => {
            console.log(error);
            res.end();
        })
      }else{
        res.json(r_MSGFalse);
        res.end();
      }
});
router.post('/api/s',multipartMiddleware,(req, res) => {
  let phoners = /^1[0-9]{10}$/
  if(phoners.test(req.body.phoneN)){
      let promise = SMS.SMS_test(req.body.phoneN, () =>{}).then((result) =>{
        // console.log(req.body.phoneN)  
        // hello = result;
          console.log(result)
          let r_MSGTrue = {
              'code':'1',
              'msg':'成功'
          }
          if(result!=''){
            // res.json(r_MSGTrue)
            let promise = regist.reg(req.body.phoneN,result, () =>{}).then((result) =>{
              console.log(req.body.phoneN)  
            
                console.log(result)
                if(result=='1'){
                  res.json(r_MSGTrue)
                  res.end();
                }else{
                  res.json(r_MSGFalse);
                  res.end();
                }
            }).catch((error) => {
                console.log(error);
                res.json(r_MSGFalse);
                res.end();
            })
          }
      }).catch((error) => {
          console.log(error);
          res.json(r_MSGFalse);
          res.end();
      })
  }else{
    res.json(r_MSGFalse);
    res.end();
  }
  // res.json(req.body);
});
router.post('/api/dl',multipartMiddleware,(req, res) => {
        let r_MSGTrue = {
          'code':'1',
          'msg':'成功'
        }
        let phoners = /^1[0-9]{10}$/
  if(phoners.test(req.body.phoneN)){
  
      let promise = dl.dlj(req.body.phoneN,req.body.Password, () =>{}).then((result) =>{
          // hello = result;
          // console.log(result)
          if(result==req.body.Password){
            res.json(r_MSGTrue);
            res.end();
          }else{
            res.json(r_MSGFalse);
            res.end();
          }
      }).catch((error) => {
          console.log(error);
          res.json(r_MSGFalse);
          res.end();
      })
  }else{
          res.json(r_MSGFalse);
          res.end();
  }
  
  
});
router.post('/api/xgmm',multipartMiddleware,(req, res) => {
        let r_MSGTrue = {
          'code':'1',
          'msg':'成功'
        }
    
        let phoners = /^1[0-9]{10}$/
  if(phoners.test(req.body.phoneN)){
     console.log('开始对比验证码')
      let promise = zcreg.regzc(req.body.phoneN,req.body.SMS_Code, () =>{}).then((result) =>{//对比验证码
            console.log(result)
            // console.log(req.body)
            // console.log(req.body.SMS_Code)
            if(result==req.body.SMS_Code){
              console.log('验证码匹配成功')
                let promise = xgmm.xgmmr(req.body.phoneN,req.body.NewPassword, () =>{}).then((result) =>{//修改密码
                  console.log('密码修改成功')
                  console.log(result)
                      if(result=='1'){
                        console.log('开始删除验证码')
                        let promise =  del.rdel(req.body.phoneN, () =>{}).then((result) =>{//删除验证码
                              if(result=='1'){
                                res.json(r_MSGTrue)
                                res.end();
                              }else{
                                res.json(r_MSGFalse);
                                res.end();
                              }
                          }).catch((error) => {
                            console.log(error);
                            res.json(r_MSGFalse);
                            res.end();
                          })
                      }else{
                        res.json(r_MSGFalse);
                        res.end();
                      }
                   
                }).catch((error) => {
                    console.log(error);
                    res.end();
                })
            }else{
                res.json(r_MSGFalse)
                res.end();
            }
        }).catch((error) => {
            console.log(error);
            res.end();
        })
  }else{
          res.json(r_MSGFalse);
          res.end();
  }
  
  
});
router.post('/api/xgpn',multipartMiddleware,(req, res) => {
        let r_MSGTrue = {
          'code':'1',
          'msg':'成功'
        }
    
        let phoners = /^1[0-9]{10}$/
  if(phoners.test(req.body.phoneN)){
     console.log('开始对比验证码')
      let promise = zcreg.regzc(req.body.NewPhoneN,req.body.SMS_Code, () =>{}).then((result) =>{//对比验证码
            console.log(result)
            // console.log(req.body)
            // console.log(req.body.SMS_Code)
            if(result==req.body.SMS_Code){
              console.log('验证码匹配成功')
                let promise = xgpn.xgpnr(req.body.phoneN,req.body.NewPhoneN, () =>{}).then((result) =>{//修改密码
                  console.log('手机号码修改成功')
                  console.log(result)
                      if(result=='1'){
                        console.log('开始删除验证码')
                        let promise =  del.rdel(req.body.NewPhoneN, () =>{}).then((result) =>{//删除验证码
                              if(result=='1'){
                                res.json(r_MSGTrue)
                                res.end();
                              }else{
                                res.json(r_MSGFalse);
                                res.end();
                              }
                          }).catch((error) => {
                            console.log(error);
                            res.json(r_MSGFalse);
                            res.end();
                          })
                      }else{
                        res.json(r_MSGFalse);
                        res.end();
                      }
                   
                }).catch((error) => {
                    console.log(error);
                    res.end();
                })
            }else{
                res.json(r_MSGFalse)
                res.end();
            }
        }).catch((error) => {
            console.log(error);
            res.end();
        })
  }else{
          res.json(r_MSGFalse);
          res.end();
  }
  
  
});
router.post('/api/sczl',multipartMiddleware,(req, res) => {
      let r_MSGTrue = {
        'code':'1',
        'msg':'成功'
    }
    let phoners = /^1[0-9]{10}$/
    console.log(req.body.phoneN)
    if(phoners.test(req.body.phoneN)){
            let promise = sczl.sczlr(req.body, () =>{}).then((result) =>{//修改密码

              // console.log(result)
              res.json(r_MSGTrue);
              res.end();
            }).catch((error) => {
              console.log(error);
              res.json(r_MSGFalse);
              res.end();
            })   
        
      }else{
        res.json(r_MSGFalse);
        res.end();
      }
});


module.exports = router;
