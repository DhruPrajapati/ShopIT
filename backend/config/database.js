const momgoose  = require("mongoose")

const connectDatabase = () => {
    momgoose.connect(process.env.DB_LOCAL_URI,{
        //userNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB Database connected with Host: ${con.connection.host}`)
    })
}

module.exports = connectDatabase