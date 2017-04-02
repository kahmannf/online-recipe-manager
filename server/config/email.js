module.exports = {
    user: process.env.SMPTUSERNAME,
    password: process.env.SMPTPASSWORD,
    host: process.env.SMPTHOST,
    ssl: process.env.SMPTUSESSL == 1
}