
import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";

//создаем store через reduxjs/toolkit
const store = configureStore ({
    reducer: {
        posts: postsReducer,
        auth: authReducer
    }
})

export default store; 