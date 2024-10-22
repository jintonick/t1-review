import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import DefaultPage from "@app/pages/default-page";
import LoginPage from "@app/pages/authtorization/login.page";
import Layout from "@app/layout/layout";
import ProjectsPage from "@app/pages/projects-page/projects.page";
import RequiredAuth from "@app/routes/required-auth.route";
import MyMeet from "@app/pages/my-meetings/my-meet";
import Artifacts from "@app/pages/artifacts/artifacts";
import ProtectedRoute from "@app/routes/protected-route";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequiredAuth>
            <Layout />
          </RequiredAuth>
        }
      >
        <Route
          index
          element={
            <RequiredAuth>
              <DefaultPage />
            </RequiredAuth>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute allowedUserTypes={["user", "client"]}>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-meet"
          element={
            <ProtectedRoute allowedUserTypes={["expert","client", "user"]}>
              <MyMeet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artifacts"
          element={
            <ProtectedRoute allowedUserTypes={["expert", "client", "user"]}>
              <Artifacts />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

