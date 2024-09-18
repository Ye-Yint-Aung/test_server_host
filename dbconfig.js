
const config = {
    user :'sa',
    password :'sasql',
    server:'192.168.20.187',
    database:'MobileTesting',
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'SQLEXPRESS'
    },
    port : 50640
}

module.exports = config; 