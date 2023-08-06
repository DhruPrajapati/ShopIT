const momgoose  = require("mongoose")

const connectDatabase = () => {
    momgoose.connect(process.env.DB_LOCAL_URI,{
        userNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}

module.exports = connectDatabases