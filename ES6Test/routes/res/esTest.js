// export const ES6Test =(bool) => {
//     return new Promise((resolve,reject) => {
//              if(bool==1){
//                  resolve('hello');
//              }else{
//                  reject(err)
//              }           
//     });   
// }
module.exports={
    es:(bool)=>{
        return new Promise((resolve,reject) => {
            if(bool==1){
                resolve('hello');
            }else{
                reject('word!')
            }           
        });   
    }
}