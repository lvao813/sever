var OptPool = require('../mysqlDB/db'); 

var optPool = new OptPool(); 
var pool = optPool.getPool(); 
module.exports ={
    regcr:function(phone,password){
        return new Promise((resolve,reject) => {
                
            pool.getConnection(function(err,conn){ 
               
                // ----插入
                var userAddSql = 'insert into IT_Test (phone_No,Password) values(?,?)';
                var param = [phone,password];
                conn.query(userAddSql,param,function(err,rs){
                    if(err){
                        console.log('insert err:',err.message);
                        // return;
                        reject(err)
                       
                    }
                        console.log('insert success');
                        resolve('1');
                        conn.release();
                });  
            });
        });
    }
}