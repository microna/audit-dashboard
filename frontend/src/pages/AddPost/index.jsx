import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import SimpleMDE from "react-simplemde-editor"; //для редактора текста в html
import "easymde/dist/easymde.min.css";
import { useDispatch } from "react-redux"; //для отправки async action от сюда
import { useSelector } from "react-redux"; //вытаскиваем state
import { useNavigate, Navigate, useParams } from "react-router-dom"; //тоже самое что Link только сделает автопереход (а не по клику)
import axios from "../../axios";
import { Link } from "react-router-dom";

import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";

export const AddPost = () => {
  const { id } = useParams(); //узнаем id какой пост пришел на редактирование

  const navigate = useNavigate(); //хук для автонавигации
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");

  const inputFileRef = React.useRef(null); //переключили (action) загрузку файла с невидимого инпута на кнопку

  //Добавим bool проверим есть ли id что изменить кнопку "Опобликоват" на "Сохранить". Также нужно и для post/patch запроса
  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    // console.log(event.target.files) //доступ к файлу

    //далее отправляем на бекенд
    try {
      const formData = new FormData(); //формат позволит отправлять файл на бекенд
      const file = event.target.files[0]; //доступ к файлу
      formData.append("image", file); //вшили картинку в формДата
      const { data } = await axios.post("/upload", formData); //data это вернется ответ
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
      alert("error upload image", error);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl(""); //delete image
  };

  //сохранили то что ввели в редакторе (каждый введенный символ будет передавать)
  const onChange = React.useCallback((text) => {
    // useCallback необходим библиотеке SimpleMDE

    setText(text);
  }, []);

  const onSubmit = async () => {
    //будем от сюда отправлять, а не глобально со стора так как нету смысла вытаскивать глобально
    try {
      setIsLoading(true);

      const fields = {
        title,
        imageUrl,
        tags, //: tags.split(','), //конвертнули в массив,
        text,
      };

      const { data } = isEditing 
          ? await axios.patch(`/posts/${id}`, fields) 
          : await axios.post("/posts", fields); //закинули в бекенд

        //с patch ответ не вернется с сервера. По этому берем либо id с которого прши, либо id которое вернется после post запроса
      const _id = isEditing ? id : data._id; //вытащили _id этой статьи

      navigate(`/posts/${_id}`); //перейдем на саму статью
    } catch (error) {
      console.warn("Post didnt add post", error);
      alert("error adding post. Need minimum 3 symbols");
    }
  };

  React.useEffect(() => {
    if (id) {
      //если к нам пришло id значит мы режиме редактирования
      axios
        .get(`/posts/${id}`)
        .then((res) => {
          //делаем запрос какие текста у нас по этому id
          //и вобьем в state
          setTitle(res.data.title);
          setText(res.data.text);
          setTags(res.data.tags.join(",")); //в стрингу переделываем
          setImageUrl(res.data.imageUrl);
        })
        .catch((err) => console.log("change post error", err));
    }
  }, []);

  const options = React.useMemo(
    // useMemo необходим для настроек SimpleMDE
    () => ({
      spellChecker: false,
      maxHeight: "200px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  //если нет токена и не авторизован то на главную
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }



  return (
    <Paper elevation={0} style={{ padding: 30 }}>
      <div className="addImage">

      
     {
      !imageUrl && (
        <>
          <Typography>
         <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
       Load preview
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      </Typography>
      </>
      )
     }
      {imageUrl && (
        <>

          <Button
            variant="contained"
            style={{margin: 'auto -75px', position: 'absolute'}}
            size="small"
            color="error"
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      </div>

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Post title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
         <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Save" : "Post"}
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};
