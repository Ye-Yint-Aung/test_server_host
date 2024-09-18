var config = require('./dbconfig');
const sql = require('mssql');


async function getUsers() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * from Users");
        return users.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function addUser(user) {

    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
           // .input('Id', sql.Int, order.Id)
            .input('UserName', sql.NVarChar, user.UserName)
            .input('Email', sql.NVarChar, user.Email)
            .input('Age', sql.Int, user.Age)
            .input('City', sql.NVarChar, user.City)
            .execute('InsertUsers');
        return insertUser.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function getSignInUser(userName,email) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('input_parameter_userName', sql.NVarChar, userName)
            .input('input_parameter_email', sql.NVarChar, email)
            .query("select * From users  where  UserName=@input_parameter_userName and Email = @input_parameter_email");   
        return user.recordset;
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = {
    getUsers: getUsers,
    addUser: addUser,
    getSignInUser : getSignInUser,

}