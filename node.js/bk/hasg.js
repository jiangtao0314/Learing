const bcrypt = require('bcrypt');

async function run(){
    let salt = await bcrypt.genSalt(10);
    console.log(salt);
    let pass = await bcrypt.hash('1234',salt)
    console.log(pass);
}
run();