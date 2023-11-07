import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import {UserController, PostController}  from './controllers/index.js'
import {handleValidationErorrs ,cheackAuth} from "./utils/index.js";

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.qztfr1k.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('connection failed', err))


const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads');
    },
    filename: (_, file, cb) =>{
        cb(null, file.originalname);
    },
})

const upload =  multer({storage})

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation,  handleValidationErorrs,UserController.login)
app.post('/auth/register', registerValidation, handleValidationErorrs,UserController.register);
app.get('/auth/me', cheackAuth, UserController.getMe )

app.post('/upload/',cheackAuth, upload.single('image'), (res, req) =>{
    res.json({
        url: `uploads/${req.file.originalname}`
    })
});

app.get('/tags', PostController.getLastTags )

app.get('/posts', PostController.getAll )
app.get('/posts/tags/',PostController.getLastTags )
app.get('/posts/:id', PostController.getOne )
app.post('/posts',cheackAuth, postCreateValidation,handleValidationErorrs, PostController.create )
app.delete('/posts/:id',cheackAuth, PostController.remove )
app.patch('/posts/:id',cheackAuth,postCreateValidation,handleValidationErorrs, PostController.update )


app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    } else {
        console.log('server ok')
    }
})