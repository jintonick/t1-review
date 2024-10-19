import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import LoginPage from "@app/pages/authtorization/login.page";
import RegistrationPage from "@app/pages/authtorization/registration.page";
import Layout from "@app/layout/layout";
import ProjectsPage from "@app/pages/projects-page/projects.page";
import RequiredAuth from "@app/routes/required-auth.route";
import ForgotEmailPage from "@app/pages/authtorization/forgot-email.page";
import ForgotPasswordPage from "@app/pages/authtorization/forgot-password.page";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forgot-email" element={<ForgotEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route
        path="/"
        element={
          <RequiredAuth>
            <Layout />
          </RequiredAuth>
        }
      >
        <Route index element={<ProjectsPage />} />
      </Route>
    </>
  )
);
