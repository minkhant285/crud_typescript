import http from 'http';
import express, { Express } from 'express';
import { envData } from './utils/environment';
import routes from './routes/user.routes';
import "reflect-metadata"
import { AppDataSource } from './db/data-source';
import path from 'path';

const router: Express = express();

/** Parse the request */
router.use(express.urlencoded({ extended: false }));
router.use('/static', express.static(path.join(__dirname, '../assets')))

/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {

    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');

    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-	Type,Accept, Authorization');

    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/api', routes);
/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
/** Server */

const httpServer = http.createServer(router);
const PORT: any = envData.app_port;
AppDataSource.initialize().then(() => console.log("DB initialized!!")).catch((err) => console.log(err));
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));