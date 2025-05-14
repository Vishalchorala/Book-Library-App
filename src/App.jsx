import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { paths } from "./constant/menuItems";
import Home from "./Pages/Home";
import Error from "./Error";
import AddBooks from "./Pages/Addbooks";
import BrowseBooks from "./Pages/BrowseBooks";
import CollectionView from "./Pages/CollectionView";
import { Toaster } from "react-hot-toast";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import MainLayout from "./Layout/MainLayout";
import AuthLayout from "./Layout/AuthLayout";
import Profile from "./Pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path={paths.login} element={<Login />} />
            <Route path={paths.signup} element={<Signup />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path={paths.home} element={<Home />} />
            <Route path={paths.addbooks} element={<AddBooks />} />
            <Route path={paths.browsebooks} element={<BrowseBooks />} />
            <Route path={paths.collectionview} element={<CollectionView />} />
            <Route path={paths.profile} element={<Profile />} />
          </Route>

          <Route path={paths.error} element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
