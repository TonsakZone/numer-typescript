const app = require('express')()
require("dotenv").config();
const express = require('express');
const bp = require('body-parser');
const cors = require("cors");
const corsOptions = { origin: '*' }

const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(express.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const uri = `mongodb+srv://tonsak2:1234@cluster0.oig7p.mongodb.net/Numerical`;
// const uri = 'mongodb://tonsak2:1234@127.0.0.1:27017/Numerical'
async function connectDB() {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, bufferCommands: false })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));
}

connectDB()



function authenticate(req, res, next) {
    // console.log(req.headers.authorization);
    const authHeader = req.body.headers['authorization'];
    // const authHeader = req.headers['authorization'];
    // const authHeader = req.headers.authorization
    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).send('Missing authorization header');
    }

    const token = authHeader

    try {
        const decoded = jwt.verify(token, 'tonsak5343');
        if (decoded.apiKey !== '5343') {
            throw new Error('Invalid API key');
        }
        next();
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
}

function generateToken(req, res) {
    const payload = {
        apiKey: '5343'
    };

    const token = jwt.sign(payload, 'tonsak5343');
    console.log(token);
    res.json({
        token: token
    });
}

app.post('/token', generateToken);

app.post('/methods', authenticate, async (req, res) => {
    let page = req.body.pages;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    if (page == "bisections") {
        let fx = req.body.Equation;
        let query = await client.db("Numerical").collection(page).findOne({ Equation : fx  })
        console.log(fx);
        let obj = {
            Equation: query.Equation,
            XL: query.XL,
            XR: query.XR
        }
        res.send(obj)
        // const BisectionSchema = new mongoose.Schema({
        //     Equation: {
        //         type: String,
        //         required: true,
        //     },
        //     XL: {
        //         type: Number,
        //         required: true,
        //     },
        //     XR: {
        //         type: Number,
        //         required: true,
        //     },
        // });
        // Bisection = mongoose.models.bisections || mongoose.model('bisections', BisectionSchema);
        // console.log(`Using collection: ${Bisection.collection.name}`);
        // try {
        //     let bisecExample = await Bisection.find({ Equation: fx });
        //     console.log(bisecExample[0]);
        //     let data = [{
        //         Equation: bisecExample[0].Equation,
        //         XL: bisecExample[0].XL,
        //         XR: bisecExample[0].XR
        //     }]
        //     res.send(data);
        // } catch (err) {
        //     console.error(err);
        //     res.status(500).send('Internal server error');
        // }
    } else if (page == 'onepoints') {
        let fx = req.body.Equation;
        let query = await client.db("Numerical").collection(page).findOne({ Equation : fx  })
        console.log(fx);
        let obj = {
            Equation: query.Equation,
            X: query.X,
        }
        res.send(obj)
        // const OnepointSchema = new mongoose.Schema({
        //     Equation: {
        //         type: String,
        //         required: true,
        //     },
        //     X: {
        //         type: Number,
        //         required: true,
        //     },
        // });
        // Onepoint = mongoose.models.onepoints || mongoose.model('onepoints', OnepointSchema);
        // console.log(`Using collection: ${Onepoint.collection.name}`);
        // try {
        //     let onepointExample = await Onepoint.find({ Equation: fx });
        //     console.log(onepointExample[0]);
        //     let data = [{
        //         Equation: onepointExample[0].Equation,
        //         X: onepointExample[0].X,
        //     }]
        //     res.send(data);
        // } catch (err) {
        //     console.error(err);
        //     res.status(500).send('Internal server error');
        // }
    } else if (page == 'linearregressions') {
        let option = req.body.Equation
        let X_in, N_in
        if (option == 'option1') {
            X_in = 65;
            N_in = 9;
            let query = await client.db("Numerical").collection(page).findOne({ Nsize : N_in, X: X_in  })
            let obj = {
                Nsize: query.Nsize,
                X: query.X,
                Matrix: query.Matrix
            }
            res.send(obj)
        } else if (option == 'option2') {
            X_in = 25;
            N_in = 6;
            let query = await client.db("Numerical").collection(page).findOne({ Nsize : N_in, X: X_in  })
            let obj = {
                Nsize: query.Nsize,
                X: query.X,
                Matrix: query.Matrix
            }
            res.send(obj)
        }
        // const dataSchema = new mongoose.Schema({
        //     Nsize: {
        //         type: Number,
        //         required: true
        //     },
        //     X: {
        //         type: Number,
        //         required: true
        //     },
        //     Matrix: {
        //         type: [[Number]],
        //         required: true
        //     }
        // });

        // Linear = mongoose.models.linearregressions || mongoose.model('linearregressions', dataSchema);
        // console.log(`Using collection: ${Linear.collection.name}`);
        // try {
        //     let linearExample = await Linear.find({ X: X_in, Nsize: N_in });
        //     console.log(linearExample[0]);
        //     let data = [{
        //         NSize: linearExample[0].Nsize,
        //         Xval: linearExample[0].X,
        //         Matrix: linearExample[0].Matrix
        //     }]
        //     res.send(data);
        // } catch (err) {
        //     console.error(err);
        //     res.status(500).send('Internal server error');
        // }
    }

})

app.get('/hello', (req, res) => (
    res.send("Hello world")
))

module.exports = app

