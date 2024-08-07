// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { publicRoute } from "./routes";
import { DefaultLayout } from "./Component/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';// Thư viện css của bootstrap
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App" style={{ height: "100vh" }}>
                <Routes>
                    {publicRoute.map((route, index) => {
                        const Page = route.Component;

                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                        {/* <h1>{greeting}</h1> */}
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
