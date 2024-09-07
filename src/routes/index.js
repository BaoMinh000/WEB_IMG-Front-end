import Home from "../../src/pages/Home";
import Page403 from "../pages/PageEROR/Page403";
import Paypage from "../../src/pages/Paypage";
import LoginPage from "../pages/PageLogin";
import UserProfilePage from "../pages/User/profile";
import ProductDetail from "../pages/ProductDetail/index";
import PageAdmin from "../pages/Admin/PageAdmin";
import SearchResultsPage from "../pages/SearchResultsPage";
import Checkout from '../pages/CheckoutPage'
import SuccessPage from "../pages/SuccesPage";
const publicRoute = [
    { path: "/", Component: Home , AdminOnly: false},
    { path: '/product-detail', Component: ProductDetail , AdminOnly: false},
    { path: "/page403", Component: Page403, layout: Page403 , AdminOnly: false},
    // { path: "/system/admin/userlist", Component: PageListUser , AdminOnly: false},
    { path: "/login", Component: LoginPage , AdminOnly: false},
    { path: "/search-results", Component: SearchResultsPage , AdminOnly: false},
    { path: "/checkout", Component: Checkout , AdminOnly: false},
    { path: "/payPlans", Component: Paypage , AdminOnly: false},
    { path: "/success", Component: SuccessPage , AdminOnly: false},

];
const privateRoute = [
    { path: "/system/admin", Component: PageAdmin, AdminOnly: true },
    { path: "/user/profile", Component: UserProfilePage, AdminOnly: false },
];

export { publicRoute, privateRoute };
