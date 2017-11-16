var OptPool = require('./mysqlDB/db'); 

var optPool = new OptPool(); 
var pool = optPool.getPool(); 
module.exports ={
    rdel:function(phone){
        return new Promise((resolve,reject) => {
                
            pool.getConnection(function(err,conn){ 
               
                // ----删除
                var userAddSql = 'delete from SMS_Code where phone_No=?';
                var param = [phone];
                conn.query(userAddSql,param,function(err,rs){
                    if(err){
                        console.log('insert err:',err.message);
                        // return;
                        reject(err)
                       
                    }
                        // console.log('insert success');
                        resolve('1');
                        conn.release();
                });  
            });
        });
    }
}