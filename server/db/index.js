const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'jobportal.cyardhhcokti.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'administrator',
    database: 'commondb',
    port: '3306'
});

let thingsdb = {};
thingsdb.all =  () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM things`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    })
};

thingsdb.one =  (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM things where id = ?`, [id] , (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    })
};

thingsdb.insert = (thing) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT into things values (0,?,?);`, [thing.title, thing.desc], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

thingsdb.delete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE from things where id = ?`, [id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};


thingsdb.update = (id, thing) => {
    console.log(`db. update ${id}, thing is `, thing  );
    return new Promise((resolve, reject) => {
        pool.query('UPDATE things SET `title` = ?, `desc` = ? WHERE id = ? ; ', [thing.title, thing.desc, Number(id)], (err, results) => {
            if(err) {
                return reject(err);
            }
            console.log('Rows affected:', results.affectedRows);
            return resolve(results);
        });
    });
};

module.exports = thingsdb;