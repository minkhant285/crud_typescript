import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/users', (req: Request, res: Response) => {
    return res.status(200).json({
        data: 'getallusers',
        status: res.statusCode
    });
});

router.get('/users/:id', (req: Request, res: Response) => {
    return res.status(200).json({
        data: 'getUserById',
        status: res.statusCode
    });
});

router.put('/users/:id', (req: Request, res: Response) => {
    return res.status(200).json({
        data: 'updated',
        status: res.statusCode
    });
});

router.delete('/users/:id', (req: Request, res: Response) => {
    return res.status(200).json({
        data: 'deleted',
        status: res.statusCode
    });
});

router.post('/users', (req: Request, res: Response) => {
    let body = req.body;
    return res.status(200).json({
        body
    });
});

export = router;