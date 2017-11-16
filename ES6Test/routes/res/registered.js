var OptPool = require('./mysqlDB/db'); 

var optPool = new OptPool(); 
var pool = optPool.getPool(); 
module.exports ={
    reg:function(phone,code){
        return new Promise((resolve,reject) => {
            pool.getConnection(function(err,conn){ 
                var userAddSql = 'insert into SMS_Code (phone_No,Code) values(?,?)';
                var param = [phone,code];
                conn.query(userAddSql,param,function(err,rs){
                    if(err){
                        console.log('insert err:',err.message);
                        // return;
                        reject(err)
                    }
                        // console.log('insert success');
                        resolve('1')
                });
                
              

            });        
        });
    }
}