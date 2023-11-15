import axios from "axios";




//сохраняем URL что бы каждый раз его не прописывать
const instance = axios.create({
    baseURL: 'http://localhost:4444',
    // timeout: 10000,
    // params: {}
});

//middleware - функция посредник 
//будет при каждом запросе (не важно каком) проверят авторизованы мы или нет
//и есть у нас токен в localStorage или нету и если он есть то отправлять его запрос
// instance.interceptors.request.use((config) => {//middleware на .request(запрос(любой запрос))
//     //config - в конфигурацию axios прикручиваем то что есть в localStorage
//     config.headers.Authorization = window.localstorage.getItem('token') //и вшиваем токен авторизации к Authorization
//     //то есть мы говорим axios'y при любом запросе всегда проверяей есть ли это в локалсторейдж и всегда сшивай эту инфу
//     //дальше бекенд решит можно нам доступ или нет
//     // console.log('config axios',config)
//     return config; //вернем конфиг axios'a
// })

//middleware - функция посредник 
//будет при каждом запросе (не важно каком) проверят авторизованы мы или нет
//и есть у нас токен в localStorage или нету и если он есть то отправлять его в req.headers.authorization
instance.interceptors.request.use(  (req) => {//middleware на .request(запрос(любой запрос))
    //     //config - в конфигурацию axios прикручиваем то что есть в localStorage
        req.headers.authorization = window.localStorage.getItem('token') //и вшиваем токен авторизации к Authorization
          //то есть мы говорим axios'y при любом запросе всегда проверяей есть ли это в локалсторейдж и всегда сшивай эту инфу
   //дальше бекенд решит можно нам доступ или нет

   return req;
   
  });

  


export default instance;