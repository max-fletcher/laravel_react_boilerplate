import { Navigate, createBrowserRouter } from "react-router-dom";
import Error from "./views/Error";
import Dashboard from "./views/Dashboard";
// import Surveys from "./views/Surveys";
// import SurveyView from "./views/SurveyView";
import Login from "./views/Login";
import Signup from "./views/Signup";
import GuestLayout from "./layouts/GuestLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import EditPost from "./views/EditPost";
import CreatePost from "./views/CreatePost";

const router = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout />,
      children: [
         {
            path: '/dashboard',
            element: <Navigate to="/" />
         },
         {
            path: '/',
            element: <Dashboard />
         },
         {
            path: '/create',
            element: <CreatePost />
         },
         {
            path: '/edit',
            element: <EditPost />
         },
         // {
         //    path: '/surveys',
         //    element: <Surveys />
         // },
         // {
         //    path: '/surveys/create',
         //    element: <SurveyView />
         // },
      ]
   },
   {
      path: '/',
      element: <GuestLayout />,
      children: [
         {
            path: 'login',
            element: <Login />
         },
         {
            path: '/signup',
            element: <Signup />
         },
      ]
   },
   {
      path: '/*',
      element: <Error />
   },
])

export default router