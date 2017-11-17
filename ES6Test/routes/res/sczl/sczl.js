var OptPool = require('../mysqlDB/db'); 

var optPool = new OptPool(); 
var pool = optPool.getPool(); 
module.exports ={
    sczlr:function(obj){
        return new Promise((resolve,reject) => {
                console.log(obj)
            pool.getConnection(function(err,conn){ 
                 
                // ----插入
                var userAddSql = 'UPDATE IT_Test SET Sex=?,Birthday=?,HeadImg=?,PetName=?,Income=?,WorkingAddress=?,MaritalStatus=?,Education=?,Height=? WHERE phone_No=?';
                var param = [obj.Sex,obj.Birthday,obj.HeadImg,obj.PetName,obj.Income,obj.WorkingAddress,obj.MaritalStatus,obj.Education,obj.Height,obj.phoneN];
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