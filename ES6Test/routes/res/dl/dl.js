
var OptPool = require('../mysqlDB/db'); 

var optPool = new OptPool(); 
var pool = optPool.getPool();
module.exports ={
    dlj:function(phone,Password){
        return new Promise((resolve,reject) => {
                
            pool.getConnection(function(err,conn){ 
                //查询
                conn.query('SELECT Password from IT_Test where phone_No=?',[phone], function(err, rs) {  
                    if (err) {  
                        // console.log('[query] - :'+err);  
                        reject(err);
                    }else{  
                        var _start = async function(){
                            let Password = ''
                             for(var i=0;i<rs.length;i++){
                                console.log('The solution is: ', rs[i].Password); 
                                        Password = rs[i].Password;
                                    }
                            await resolve(Password);
                            await conn.release();
                        }    
                        _start()
                            
                        }
                });   
            });    
        });
    }
}