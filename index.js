const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cluster = require('cluster');
const mongoose = require('mongoose');

// Connect to Database here
 const connectDb = () => {
    
    const URI = `mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@ds341557.mlab.com:41557/ninjascrolls`
    mongoose.connect(URI).then(() => {
        console.log('Connected to DB');
    })

 }

 // Initialize routes here 
 const initRoute = (app) => {
    //...
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', (req,res) => {
        res.status(400).json({
            code: 400,
            message: `You have hit the wrong URL `
        });
    })
 }

const init = () => {
    // Check if the cluster active is master 
    if(cluster.isMaster) {

        const numCPUs = require('os').cpus().length | 1;
        console.log(`Master ${process.pid} is running...`);

        // Fork Workers 
        for(let i = 0; i<numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal ) => {
            console.log(` Worker ${worker.process.pid} died. `)
        });

    } else {
        const app = express();
        connectDb();
        initRoute(app);
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server listening to port ${PORT}.`);
        })
    }
}

init();
