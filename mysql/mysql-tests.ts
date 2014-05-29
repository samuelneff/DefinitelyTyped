///<reference path="../node/node.d.ts"/>
///<reference path="mysql.d.ts"/>

// Sample test code adapted from readme: https://github.com/felixge/node-mysql/blob/master/Readme.md



//
//
// Introduction
//
//

import mysql = require('mysql');
import stream = require('stream');

var q:mysql.Query;
var p:mysql.ConnectionPool;
var cc:mysql.ConnectionConfig;
cc.user = "me";


var c:mysql.Connection;
c.createQuery("");
c.createQuery("", (a,b,c) => {});

var connection:mysql.Connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution');

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});

connection.end();


//
//
// Establishing connections
//
//


var connection = mysql.createConnection({
    host     : 'example.org',
    user     : 'bob',
    password : 'secret'
});

connection.connect(function(err) {
    if (err)
    {
        console.log("Connected!");
    }
    else
    {
        console.log("Did not connect, error " + err.name + ": " + err.message);
    }
});



connection.query('SELECT 1', function(err, rows) {
    // connected! (unless `err` is set)
});

var connection = mysql.createConnection('mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');

connection.end(function(err) {
    // The connection is terminated now
});

connection.destroy();


//
//
// Pooling connections
//
//


var pool  = mysql.createPool({
    host     : 'example.org',
    user     : 'bob',
    password : 'secret'
});

pool.getConnection(function(err, connection) {
    // connected! (unless `err` is set)
});

pool.on('connection', function(connection) {
    connection.query('SET SESSION auto_increment_increment=1')
});


var pool  = mysql.createPool({});

pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query( 'SELECT SomeThing FROM SomeTable', function(err, rows) {
        // And done with the connection.
        connection.release();

        // Don't use the connection here, it has been returned to the pool.
    });
});



//
//
// PoolCluster
//
//

// create
var poolCluster = mysql.createPoolCluster({host: "mysql-master"});

poolCluster.add({host: "mysql-slave3"}); // anonymous group
poolCluster.add('MASTER', {host: "mysql-master"});
poolCluster.add('SLAVE1', {host: "mysql-slave1"});
poolCluster.add('SLAVE2', {host: "mysql-slave2"});

// Target Group : ALL(anonymous, MASTER, SLAVE1-2), Selector : round-robin(default)
poolCluster.getConnection(function (err, connection) {});

// Target Group : MASTER, Selector : round-robin
poolCluster.getConnection('MASTER', function (err, connection) {});

// Target Group : SLAVE1-2, Selector : order
// If can't connect to SLAVE1, return SLAVE2. (remove SLAVE1 in the cluster)
poolCluster.on('remove', function (nodeId) {
    console.log('REMOVED NODE : ' + nodeId); // nodeId = SLAVE1
});

poolCluster.getConnection('SLAVE*', 'ORDER', function (err, connection) {});

// of namespace : of(pattern, selector)
poolCluster.of('*').getConnection(function (err, connection) {});

var p2 = poolCluster.of('SLAVE*', 'RANDOM');
p2.getConnection(function (err, connection) {});
p2.getConnection(function (err, connection) {});

// destroy
poolCluster.end();

var clusterConfig = {
    removeNodeErrorCount: 1, // Remove the node immediately when connection fails.
    defaultSelector: 'ORDER'
};

var poolCluster = mysql.createPoolCluster(clusterConfig);

//
//
// Switching users / altering connection
//
//

connection.changeUser({user : 'john'}, function(err) {
    if (err) throw err;
});

//
//
// Server disconnects
//
//

var db_config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'example'
};

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();


//
//
// Escaping query values
//
//

var userId = 'some user provided value';
var sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
connection.query(sql, function(err, results) {
    // ...
});

connection.query('SELECT * FROM users WHERE id = ?', [userId], function(err, results) {
    // ...
});

var post  = [{id: 1, title: 'Hello MySQL'}];
var q1 = connection.query('INSERT INTO posts SET ?', post, function(err, result,f) {
    // Neat!
});

console.log(q1.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

var q2 = "SELECT * FROM posts WHERE title=" + mysql.escape("Hello MySQL");

console.log(q2); // SELECT * FROM posts WHERE title='Hello MySQL'


//
//
// Escaping query identifiers
//
//

var sorter = 'date';
var q3 = 'SELECT * FROM posts ORDER BY ' + mysql.escapeId(sorter);

console.log(q3); // SELECT * FROM posts ORDER BY `date`


var sorter = 'date';
var q4 = 'SELECT * FROM posts ORDER BY ' + mysql.escapeId('posts.' + sorter);

console.log(q4); // SELECT * FROM posts ORDER BY `posts`.`date`


var id = 1;
var columns = ['username', 'email'];
var q5 = connection.query('SELECT ?? FROM ?? WHERE id = ?', [columns, 'users', id], function(err, results) {
    // ...
});

console.log(q5.sql); // SELECT `username`, `email` FROM `users` WHERE id = 1


//
//
// Preparing Queries
//
//

var sql = "SELECT * FROM ?? WHERE ?? = ?";
var inserts = ['users', 'id', userId];
sql = mysql.format(sql, inserts);


//
//
// Custom format
//
//

connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

connection.query("UPDATE posts SET title = :title", [{ title: "Hello MySQL" }]);


//
//
//  Getting the id of an inserted row
//
//

connection.query('INSERT INTO posts SET ?', [{title: 'test'}], function(err, result) {
    if (err) throw err;

    console.log(result.insertId);
});


//
//
// Streaming query rows
//
//

function processRow(row, cb) {}

var q6 = connection.query('SELECT * FROM posts');
q6
    .on('error', function(err) {
        // Handle error, an 'end' event will be emitted after this as well
    })
    .on('fields', function(fields) {
        // the field packets for the rows to follow
    })
    .on('result', function(row) {
        // Pausing the connnection is useful if your processing involves I/O
        connection.pause();

        processRow(row, function() {
            connection.resume();
        });
    })
    .on('end', function() {
        // all rows have been received
    });



//
//
//  Piping results with Streams2
//
//

var target:stream.Writable;

connection.query('SELECT * FROM posts')
    .stream({highWaterMark: 5})
    .pipe(target);


//
//
//  Multiple statement queries
//
//

var connection = mysql.createConnection({multipleStatements: true});

connection.query('SELECT 1; SELECT 2', function(err, results) {
    if (err) throw err;

    // `results` is an array with one element for every statement in the query:
    console.log(results[0]); // [{1: 1}]
    console.log(results[1]); // [{2: 2}]
});

var q7 = connection.query('SELECT 1; SELECT 2');

q7
    .on('fields', function(fields, index) {
        // the fields for the result rows that follow
    })
    .on('result', function(row, index) {
        // index refers to the statement this result belongs to (starts at 0)
    });


//
//
// Joins with overlapping column names
//
//

var options = {sql: '...', nestTables: true};
connection.query(options, function(err, results) {
    /* results will be an array like this now:
     [{
     table1: {
     fieldA: '...',
     fieldB: '...',
     },
     table2: {
     fieldA: '...',
     fieldB: '...',
     },
     }, ...]
     */
});

var o2 = {sql: '...', nestTables: '_'};
connection.query(o2, function(err, results) {
    /* results will be an array like this now:
     [{
     table1_fieldA: '...',
     table1_fieldB: '...',
     table2_fieldA: '...',
     table2_fieldB: '...',
     }, ...]
     */
});



//
//
// Transactions
//
//

connection.beginTransaction(function(err) {
    if (err) { throw err; }

    var title = "Intro";
    connection.query('INSERT INTO posts SET title=?', title, function(err, result) {
        if (err) {
            connection.rollback(function() {
                throw err;
            });
        }

        var log = 'Post ' + result.insertId + ' added';

        connection.query('INSERT INTO log SET data=?', log, function(err, result) {
            if (err) {
                connection.rollback(function() {
                    throw err;
                });
            }
            connection.commit(function(err) {
                if (err) {
                    connection.rollback(function() {
                        throw err;
                    });
                }
                console.log('success!');
            });
        });
    });
});


//
//
//  Error handling
//
//

connection = mysql.createConnection({
    port: 84943 // WRONG PORT
});

connection.connect(function(err) {
    console.log(err.code); // 'ECONNREFUSED'
    console.log(err.fatal); // true
});

connection.query('SELECT 1', function(err) {
    console.log(err.code); // 'ECONNREFUSED'
    console.log(err.fatal); // true
});

connection.query('USE name_of_db_that_does_not_exist', function(err, rows) {
    console.log(err.code); // 'ER_BAD_DB_ERROR'
});

connection.query('SELECT 1', function(err, rows) {
    console.log(err); // null
    console.log(rows.length); // 1
});

connection.on('error', function(err) {
    console.log(err.code); // 'ER_BAD_DB_ERROR'
});

connection.query('USE name_of_db_that_does_not_exist');


connection.on('error', function() {});


//
//
// Type casting
//
//


var connection = mysql.createConnection({typeCast: false});

var o3 = {sql: '...', typeCast: false};
var q8 = connection.query(o3, function(err, results) {

});

connection.query({
    sql: '...',
    typeCast: function (field, next) {
        if (field.type == 'TINY' && field.length == 1) {
            return (field.string() == '1'); // 1 = true, 0 = false
        }
        return next();
    }
});


//
//
//  Debugging and reporting problems
//
//

var connection = mysql.createConnection({debug: true});

var connection = mysql.createConnection({debug: ['ComQueryPacket', 'RowDataPacket']});





