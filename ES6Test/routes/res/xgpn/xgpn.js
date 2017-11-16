var OptPool = require('../mysqlDB/db'); 

var optPool = new OptPool(); 
var pool = optPool.getPool(); 
module.exports ={
    xgpnr:function(phone,NewPhone){
        return new Promise((resolve,reject) => {
                
            pool.getConnection(function(err,conn){ 
               
                // ----插入
                var userAddSql = 'UPDATE IT_Test SET phone_No=? WHERE phone_No=?';
                var param = [NewPhone,phone];
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