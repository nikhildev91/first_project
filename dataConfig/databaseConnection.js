const MongodbClient = require('mongodb').MongoClient;
const state ={
    db:null
}

module.exports.connect = (callback)=>{
    // const url = 'mongodb://localhost:27017'
    const url = 'mongodb+srv://nikhil:nikhil123@cluster0.r8ds8.mongodb.net/footprint?retryWrites=true&w=majority'
    const dbname = 'FootPrint'

    MongodbClient.connect(url, {useUnifiedTopology: true}, (err, data)=>{
        if (err){
            return callback(err)
        }
        state.db = data.db(dbname)
        callback()
    })
}

module.exports.get = ()=>{
    return state.db
}