
var OptPool = require('../mysqlDB/db'); 

var optPool = new OptPool(); 
var pool = optPool.getPool(); 
module.exports ={
    regzc:function(phone,code){
        return new Promise((resolve,reject) => {
                
            pool.getConnection(function(err,conn){ 
                  
                //查询
                conn.query('SELECT * from SMS_Code where phone_No=?',[phone], function(err, rs) {  
                    if (err) {  
                        console.log('[query] - :'+err);  
                        reject(err);
                        
                    }else{  
                        console.log('查找成功')
                        
                        var _start = async function(){
                            let SCode = ''
                             for(var i=0;i<rs.length;i++){
                                // console.log('The solution is: ', rs[i].Code); 
                                        SCode = rs[i].Code;
                                    }
                            console.log(rs)
                            // await console.log('开始返回');
                            // await console.log(SCode);
                            await resolve(SCode);
                            // await console.log(SCode);
                            await conn.release();
                            
                        }    
                        _start();
                        
                            
                        }
                });   
               
            });
               
             
        });
    }
}