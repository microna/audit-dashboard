import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React from "react";

import { Header } from "./components/Header/Header";
import { Home, FullPost, Registration, AddPost, Login, FullTag, PieChartWithNeedle, PieChartWithPaddingAngle } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {

  //проверим залогинен юзер или нет
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth); //проверит auth state на true иначе false если хоть один false
  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, []);
  

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts/:id" element={<FullPost/>}/>
          <Route path="/posts/:id/edit" element={<AddPost/>}/>
          <Route path="/add-post" element={<AddPost/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/pie-chart-with-needle" element={<PieChartWithNeedle/>}/>
          <Route path="/pie-chart-with-padding" element={<PieChartWithPaddingAngle/>}/>
          {/* <Route path="/tags/:name" element={<FullTag/>}/> */}
        </Routes>
       
      </Container>
    </>
  );
}

export default App;
