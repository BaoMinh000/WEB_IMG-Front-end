import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { publicRoute, privateRoute } from './routes';
import { DefaultLayout } from '../src/Component/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuthenticatedRoute from '../src/Component/AuthenticatedRoute';

function App() {
    return (
        <Router>
            <div className="App" style={{ height: '100vh' }}>
                <Routes>
                    {/* Render public routes */}
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
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* Render private routes */}
                    {privateRoute.map((route, index) => {
                        const Page = route.Component;
                        const isAdminOnly = route.AdminOnly;
                        
                        
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <AuthenticatedRoute element={Page} adminOnly={isAdminOnly}/>
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
