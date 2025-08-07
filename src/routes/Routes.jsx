import { Routes, Route } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import PrivateRoute from "./PrivateRoute";
import AllGroups from "../pages/AllGroups";
import CreateGroup from "../pages/CreateGroup";
import MyGroups from "../pages/MyGroups";
import GroupDetails from "../pages/GroupDetails";
import UpdateGroup from "../pages/UpdateGroup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Private Routes */}
        <Route
          path="createGroup"
          element={
            <PrivateRoute>
              <CreateGroup />
            </PrivateRoute>
          }
        />
        <Route path="groups" element={<AllGroups />} />
        <Route
          path="myGroups"
          element={
            <PrivateRoute>
              <MyGroups />
            </PrivateRoute>
          }
        />
        <Route
          path="group/:id"
          element={
            <PrivateRoute>
              <GroupDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="updateGroup/:id"
          element={
            <PrivateRoute>
              <UpdateGroup />
            </PrivateRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
