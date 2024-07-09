import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import MainApp from "./Pages/MainApp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import "./style.css";
import Footer from "./Pages/Footer";
import Header from "./Pages/Header";
import MiniProfile from "./Pages/Profile";
import AddDesignForm from "./Pages/AddDesign";

let loggedIn = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header to='/stealer' >Get Started</Header>
        <MainPage />
        <Footer />
      </>
    ),
  },
  {
    path: "stealer",
    element: (
      <>
        {loggedIn ? <Header to='/profile' navigation={true}><MiniProfile/></Header> : <Header to='/login' navigation={true}>Log In</Header>}
        <MainApp />
        <Footer />
      </>
    ),
  },
  {
    path: "add",
    element: (
      <>
        {loggedIn ? <Header to='/profile' navigation={true}><MiniProfile/></Header> : <Header to='/login' navigation={true}>Log In</Header>}
        <AddDesignForm/>
        <Footer />
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <RouterProvider router={router}></RouterProvider>
  </>
);
