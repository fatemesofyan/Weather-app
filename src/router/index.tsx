import { ReactNode } from "react";
import { ROUTES } from "./routes";
import SignupPage from "../pages/signup/signupPage";
import LoginPage from "../pages/login/loginPage";
import HomePage from "../pages/home/homePage";

interface RoutesType {
  path: string;
  element: ReactNode;
}

export const routesArray: RoutesType[] = [
  {
    path: ROUTES.home,
    element: <HomePage />,
  },
  {
    path: ROUTES.signup,
    element: <SignupPage />,
  },
  {
    path: ROUTES.login,
    element: <LoginPage />,
  },
];