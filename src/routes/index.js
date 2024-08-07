//Page
import Home from "../../src/pages/Home";
// import Product from 'src/pages/Product';
import Profile from "../../src/pages/Profile";
// import UploadProduct from 'src/pages/UploadProduct';
import Page403 from "../pages/PageEROR/Page403";
//Layout
// import { UploadLayout } from 'src/Component/Layout';
import Paypage from "../../src/pages/Paypage";
import PageListUser from "../pages/Admin/PageListUser";
import LoginPage from "../pages/PageLogin";
import UserProfilePage from "../pages/User/profile";
import testpage from "../pages/testpage";
import Product from "../pages/Product";
//Pubic Route
const publicRoute = [
    { path: "/", Component: Home },
    { path: '/product', Component: Product },
    { path: "/page403", Component: Page403, layout: Page403 },
    { path: "/paypage", Component: Paypage },
    { path: "/admin/userlist", Component: PageListUser },
    { path: "/login", Component: LoginPage },
    { path: "/user/profile", Component: UserProfilePage },
    { path: "/profile", Component: Profile },
    { path: "/testpage", Component: testpage },
];
const privateRoute = [];

export { publicRoute, privateRoute };
