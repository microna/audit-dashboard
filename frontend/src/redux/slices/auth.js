
//redux state для auth

//reducer назв slice в reduxjs/toolkit
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit"; //для async запроса action
import axios from "../../axios"; 


//делаем запрос на redux, и сказать, что когда сделался запрос
//получаем инфу и сохраняем в redux. Информацию из логин меню
//(логин и пасс) передавать в функцию fetchUserData и мы его 
//будем постить в бекенд, бекенд вернет нам ответ с нашей инфой
//если пошлок ок и мы уже это сохраним в redux
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params); //делаем пост к бекенду с логином и пассом
    
    return data  //тут получим если все ок с бекенда ответ
})


//запрос на проверку авторизирован ли пользователь
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me'); //axios автоматически вытащит токен из localStorage и его передаст (так как мы создали middleWare в axios.js и всем запросам он создает Autorization)
    
    return data  //тут получим если все ок с бекенда ответ
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params); //делаем пост к бекенду с логином и пассом

    return data  //тут получим если все ок с бекенда ответ
})


const initialState = {
    data: null, //информация о юзере
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => { //для логаута
            state.data = null
            
        }
    },
    extraReducers: {//обрабатываем 3 actions (посколько ассинхронный экшн всегда обрабатывается 3мя частями загрузка/загружено/ошибка)
        [fetchAuth.pending]: (state) => { //если .pending (загрузка)
            state.status = 'loading' //то статус loading
            state.data = null;

        },
        [fetchAuth.fulfilled]: (state, action) => { //если .fulfilled (загружено)
            state.data = action.payload //передаем данные (массив данных)
            state.status = 'loaded' //то статус loaded (загружено)
        },
        [fetchAuth.rejected]: (state) => { //если .rejected (ошибка)
            state.items = null //то передадим пустой массив
            state.status = 'error' //то статус error (error)
        },
        [fetchAuthMe.pending]: (state) => { //если .pending (загрузка)
            state.status = 'loading' //то статус loading
            state.data = null;

        },
        [fetchAuthMe.fulfilled]: (state, action) => { //если .fulfilled (загружено)
            state.data = action.payload //передаем данные (массив данных)
            state.status = 'loaded' //то статус loaded (загружено)
        },
        [fetchAuthMe.rejected]: (state) => { //если .rejected (ошибка)
            state.items = null //то передадим пустой массив
            state.status = 'error' //то статус error (error)
        },
        [fetchRegister.pending]: (state) => { //если .pending (загрузка)
            state.status = 'loading' //то статус loading
            state.data = null;

        },
        [fetchRegister.fulfilled]: (state, action) => { //если .fulfilled (загружено)
            state.data = action.payload //передаем данные (массив данных)
            state.status = 'loaded' //то статус loaded (загружено)
        },
        [fetchRegister.rejected]: (state) => { //если .rejected (ошибка)
            state.items = null //то передадим пустой массив
            state.status = 'error' //то статус error (error)
        },
    
    }
})


export const selectIsAuth = state => Boolean(state.auth.data) //проверит есть ли логин //проверит есть ли auth дата в логине

  

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;