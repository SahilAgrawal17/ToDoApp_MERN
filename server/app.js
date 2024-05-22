require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const noteRouter = require('./routes/noteRouter')

const app = express();
app.use(express.json())
app.use(cors())

app.use("/user", userRouter)
app.use("/api/notes", noteRouter)

const PORT = process.env.PORT
const DBURL = process.env.MONGODB_URL

app.listen(PORT, ()=> {
    console.log(`Connected to port: ${PORT}`);
})

mongoose.connect(DBURL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log('Connected to DB');
});


