import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { HelmetProvider } from "react-helmet-async";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Authentication/Login/Login";
import Register from "./Components/Authentication/Register/Register";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import AuthContextProvider from "./Context/AuthContext";
import ConfirmEmail from "./Components/Authentication/ConfirmEmail/ConfirmEmail";
import RegisterAccountType from "./Components/Authentication/Register/RegisterAccountType";
import ForgetCode from "./Components/Authentication/ForgetPassword/ForgetCode";
import ResetPassword from "./Components/Authentication/ForgetPassword/ResetPassword";
import ProfileLayout from "./Components/Profile/ProfileLayout";
import ProfileContextProvider from "./Context/ProfileContext";
import VerifyAccount from "./Components/Profile/VerifyAccount/VerifyAccount";
import Setting from "./Components/Profile/Setting/Setting";
import Wishlist from "./Components/Profile/Wishlist/Wishlist";
import PersonalDetails from "./Components/Profile/PersonalDetails/PersonalDetails";
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard/AdminDashboard";
import Jobs from "./Components/Services/Jobs";
import Main from "./Components/Admin/Main/Main";
import AllUsers from "./Components/Admin/AllUsers/AllUsers";
import AllCraftsmen from "./Components/Admin/AllCraftsmen/AllCraftsmen";
import Applications from "./Components/Admin/Applications/Applications";
import VerifyCraftsmanAccount from "./Components/Admin/VerifyCraftsmanAccount/VerifyCraftsmanAccount";
import SupportRequests from "./Components/Admin/CustomerService/SupportRequests/SupportRequests";
import ChangePassword from "./Components/Admin/CustomerService/ChangePassword/ChangePassword";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import CreateAdmin from "./Components/Admin/CreateAdmin/CreateAdmin";
import AllAdmins from "./Components/Admin/AllAdmins/AllAdmins";
import Craftsmen from "./Components/Services/Craftsmen/Craftsmen";
import Profile from "./Components/Shared/Profile/Profile";
import Gallery from "./Components/Profile/Gallery/Gallery";
import Dashboard from "./Components/Shared/Dashboard/Dashboard";
import OrderDetailsPage from "./Components/Shared/Orders/OrderDetailsPage";
import OfferDetailsPage from "./Components/Shared/Offers/OfferDetailsPage";
import CSLogin from "./Components/CustomerSupport/CSLogin/CSLogin";
import Terms from "./Components/Terms/Terms";
import UpdateDetails from "./Components/Admin/UpdateDetails/UpdateDetails";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "forget-code",
        element: <ForgetCode />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "register-form",
        element: <Register />,
      },
      {
        path: "register",
        element: <RegisterAccountType />,
      },
      {
        path: "confirm-email",
        element: <ConfirmEmail />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "contact-us",
        element: <Contact />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "jobs/:category",
        element: <Jobs />,
      },
      {
        path: "craftsmen/:job",
        element: <Craftsmen />,
      },
      {
        path: "profile-details/:id",
        element: (
          <ProtectedRoute allowedRoles={["user", "craftsman"]}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["user", "craftsman"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "order-details/:orderID",
        element: (
          <ProtectedRoute allowedRoles={["craftsman", "user"]}>
            <OrderDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "offer-details/:offerID",
        element: (
          <ProtectedRoute allowedRoles={["user", "craftsman"]}>
            <OfferDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRoles={["user", "craftsman"]}>
            <ProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <PersonalDetails />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
          },
          {
            path: "verify-account",
            element: <VerifyAccount />,
          },
          {
            path: "gallery",
            element: <Gallery />,
          },
          {
            path: "setting",
            element: <Setting />,
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "admin-login",
    element: <AdminLogin />,
  },
  {
    path: "admin-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["rootAdmin", "subAdmin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-craftsmen",
        element: <AllCraftsmen />,
      },
      {
        path: "all-admins",
        element: (
          <ProtectedRoute allowedRoles={["rootAdmin"]}>
            <AllAdmins />
          </ProtectedRoute>
        ),
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "update-details/:role/:id",
        element: <UpdateDetails />,
      },
      {
        path: "create-admin",
        element: (
          <ProtectedRoute allowedRoles={["rootAdmin"]}>
            <CreateAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "verify-craftsman-account/:id",
        element: <VerifyCraftsmanAccount />,
      },
      {
        path: "support-requests",
        element: <SupportRequests />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "cs-login",
    element: <CSLogin />,
  },
]);

export default function App() {
  // const myClient = QueryClient();
  return (
    <>
      <HelmetProvider>
        {/* <QueryClientProvider client={myClient}> */}
        <AuthContextProvider>
          <ProfileContextProvider>
            <NextUIProvider>
              <RouterProvider router={myRouter} />
              <ToastContainer rtl />
            </NextUIProvider>
          </ProfileContextProvider>
        </AuthContextProvider>
        {/* </QueryClientProvider> */}
      </HelmetProvider>
    </>
  );
}
