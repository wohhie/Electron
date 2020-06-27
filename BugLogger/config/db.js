const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb+srv://jewel:jewel1234>@cluster0-buruj.mongodb.net/buglogger?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })

        console.log('MongoDB Connected')
    }catch( err){
        console.log(err)
        process.exit(1)
    }
}


module.exports = connectDB