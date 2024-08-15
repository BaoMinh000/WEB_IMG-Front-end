import Home from "../../src/pages/Home";
import Page403 from "../pages/PageEROR/Page403";
import Paypage from "../../src/pages/Paypage";
import LoginPage from "../pages/PageLogin";
import UserProfilePage from "../pages/User/profile";
import Product from "../pages/Product";
import ProductDetail from "../Component/ProductDetail";
import PageListUser from "../pages/Admin/PageListUser";
import PageAdmin from "../pages/Admin/PageAdmin";

const publicRoute = [
    { path: "/", Component: Home , AdminOnly: false},
    { path: '/productDetail', Component: ProductDetail , AdminOnly: false},
    { path: "/page403", Component: Page403, layout: Page403 , AdminOnly: false},
    // { path: "/system/admin/userlist", Component: PageListUser , AdminOnly: false},
    { path: "/login", Component: LoginPage , AdminOnly: false},
];

const privateRoute = [
    { path: "/system/admin", Component: PageAdmin, AdminOnly: true },
    { path: "/user/profile", Component: UserProfilePage, AdminOnly: false },
    { path: "/paypage", Component: Paypage , AdminOnly: false},

];

export { publicRoute, privateRoute };
