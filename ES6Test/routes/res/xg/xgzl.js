var OptPool = require('../mysqlDB/db');

var optPool = new OptPool();
var pool = optPool.getPool();
module.exports = {
    xgzlr: function (table, obj) {
        return new Promise((resolve, reject) => {

            pool.getConnection(function (err, conn) {

                // ----插入
                let clumTable = [table];
                let key = obj.Key
                let clumKey = [key];
                let param = [obj.Value];
                let paramNo = [obj.phoneN];
                var userAddSql = 'UPDATE ?? SET ??=? WHERE phone_No=?';

                conn.query(userAddSql, [clumTable, clumKey, param, paramNo], function (err, rs) {
                    if (err) {
                        console.log('insert err:', err.message);
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