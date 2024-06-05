import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Problem from "./Pages/Admin/Problem";
import NotFound from "./libs/NotFound";
import Test from "./Pages/Exam/Test";
import Test_Home from "./Pages/Exam/Test/Test_Home";
import Test_Main from "./Pages/Exam/Test/Test_Main";
import Header from "./Components/Header";
import { Container } from "@chakra-ui/react";

const App = () => {
  return (
    <Container maxW="8xl">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test/home" element={<Test_Home />} />
        <Route path="/test/main" element={<Test_Main />} />
        <Route component={NotFound} />
      </Routes>
    </Container>
  );
};

export default App;
