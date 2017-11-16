const SMSClient = require('@alicloud/sms-sdk');
const accessKeyId = 'LTAI9xSnyWySKeN8'
const secretAccessKey = 'KW9D1AaynyhDUKNkT0ZwFLZOxm8qEB'
module.exports={
    SMS_test:function(PhoneN) {
    return new Promise((resolve,reject) => {
            var range=function(start,end)
               {
                    var array=[];
                    for(var i=start;i<end;++i) array.push(i);
                    return array;
                };
                var randomstr = range(0,6).map(function(x){
                        return Math.floor(Math.random()*10);
                                }).join('');
                        // console.log(randomstr);
                var SMS_Code={
                "code":randomstr
                    }
        
            var last=JSON.stringify(SMS_Code);
                // console.log(last)
            let smsClient = new SMSClient({accessKeyId, secretAccessKey})
            smsClient.sendSMS({
                PhoneNumbers: PhoneN,
                SignName: 'IT缘',
                TemplateCode: 'SMS_109465515',
                TemplateParam: last,
            }).then(function (res) {
                let {Code}=res
                if (Code === 'OK') {
                    //处理返回参数
                    console.log(res)
                    resolve(randomstr)
                }
            }, function (err) {
                console.log(err)
                reject(0)
            })
    });
}}