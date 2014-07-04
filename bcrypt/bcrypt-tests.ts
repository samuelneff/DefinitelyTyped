
// async (recommended)

// To hash a password:

import bcrypt = require('bcrypt');
bcrypt.genSalt(10, function(err:Error, salt:bcrypt.ISalt) {
    bcrypt.hash("B4c0/\/", salt, function(err:Error, hash:string) {
        console.log(hash);
    });
});

// To check a password:
// Load hash from your password DB.

bcrypt.compare("B4c0/\/", "1209480190198401298", function(err:Error, res:boolean) {
    console.log(res ? "Correct" : "Wrong");
});
bcrypt.compare("not_bacon", "1209480190198401298", function(err:Error, res:boolean) {
    console.log(res ? "Correct" : "Wrong");
});


//Auto-gen a salt and hash:

bcrypt.hash('bacon', 8, function(err:Error, hash:string) {
});


// sync

// To hash a password:

var salt:bcrypt.ISalt = bcrypt.genSaltSync(10);
var hash2:string = bcrypt.hashSync("B4c0/\/", salt);

// Store hash in your password DB.
// To check a password:

// Load hash from your password DB.
bcrypt.compareSync("B4c0/\/", hash2); // true
bcrypt.compareSync("not_bacon", hash2); // false

// Auto-gen a salt and hash:

var hash3:string = bcrypt.hashSync('bacon', 8);
