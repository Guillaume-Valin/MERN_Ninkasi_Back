const mongoose = require('mongoose')

mongoose
.connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.cweb1.mongodb.net/bastide_ninkasi_mern',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
)
.then(() => console.log('Connected to mongoDB'))
.catch((err) => console.log('Failed to connect to mongoDB', err));