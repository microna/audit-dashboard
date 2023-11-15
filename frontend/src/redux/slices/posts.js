//redux state для постов

//reducer назв slice в reduxjs/toolkit
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit"; //для async запроса action
import axios from "../../axios";

//создаем async запрос на получение постов
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts"); //делаем запрос к бекенду
  return data;
});

//создаем async запрос на получение тегов
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags"); //делаем запрос к бекенду
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => axios.delete(`/posts/${id}`) //делаем запрос к бекенду
);


export const fetchAddComment = createAsyncThunk(
  "posts/fetchAddComment",
  async (obj) => {

    console.log('fetchAddComment',obj.id, obj.userData, obj.text)
    const { data } = await axios.patch(`/comment/${obj.id}`, {'user': obj.userData, 'text' : obj.text}) 
    
    return data
});





const initialState = {
  posts: {
    //для статей
    items: [],
    status: "loading",
  },
  tags: {
    //для тэгов
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // postsSortsDate: (state) => {

    //      state.posts.items = state.posts.items.sort((newDate, lastDate) => { 
    //     return (
    //       Math.floor(new Date(lastDate.updatedAt).getTime() / 1000) -
    //       Math.floor(new Date(newDate.updatedAt).getTime() / 1000)
    //     );
    //   }) 
    // },
    // postsSortsPopulare: (state) => {
    //     state.posts.items = state.posts.items.sort((lowPopular,topPopulare ) => topPopulare.viewsCount - lowPopular.viewsCount)
    // },
  },
  extraReducers: {
    //обрабатываем 3 actions (посколько ассинхронный экшн всегда обрабатывается 3мя частями загрузка/загружено/ошибка)
    //get posts
    [fetchPosts.pending]: (state) => {
      //если .pending (загрузка)
      state.posts.items = []; //то пока передадим пустой массив
      state.posts.status = "loading"; //то статус loading
    },
    [fetchPosts.fulfilled]: (state, action) => {
      //если .fulfilled (загружено)
      state.posts.items = action.payload; //передаем данные (массив данных)
      state.posts.status = "loaded"; //то статус loaded (загружено)
    },
    [fetchPosts.rejected]: (state) => {
      //если .rejected (ошибка)
      state.posts.items = []; //то передадим пустой массив
      state.posts.status = "error"; //то статус error (error)
    },
    //get tags
    [fetchTags.pending]: (state) => {
      //если .pending (загрузка)
      state.tags.items = []; //то пока передадим пустой массив
      state.tags.status = "loading"; //то статус loading
    },
    [fetchTags.fulfilled]: (state, action) => {
      //если .fulfilled (загружено)
      state.tags.items = action.payload; //передаем данные (массив данных)
      state.tags.status = "loaded"; //то статус loaded (загружено)
    },
    [fetchTags.rejected]: (state) => {
      //если .rejected (ошибка)
      state.tags.items = []; //то передадим пустой массив
      state.tags.status = "error"; //то статус error (error)
    },
    //remove posts
    [fetchRemovePost.pending]: (state, action) => {
      //если .pending (загрузка)
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      ); //не дожидаясь ответа удаляем статью
    }, 

    //add comment
    [fetchAddComment.pending]: (state, action) => {
        //если .pending (загрузка)
    
        state.posts.status = "loading"; //то статус loading
      },
      [fetchAddComment.fulfilled]: (state, action) => {
        //если .fulfilled (загружено)
        // state.posts.items = state.posts.items.push(action.meta.arg) ; //передаем данные (массив данных)
        state.posts.status = "loaded"; //то статус loaded (загружено)
      },
      [fetchAddComment.rejected]: (state) => {
        //если .rejected (ошибка)
      
        state.posts.status = "error"; //то статус error (error)
    },
   


  },
});

export const postsReducer = postsSlice.reducer;

//export const { postsSortsDate, postsSortsPopulare } = postsSlice.actions;
