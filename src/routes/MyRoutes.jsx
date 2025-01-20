import React from 'react';

import { Navigate, Outlet, Route, Routes, BrowserRouter } from 'react-router-dom';

import { getUser } from "../helpers/utils.js";

import NotFoundPage from '../pages/not_found/404';
import MainFramLayout from '../pages/MainFramLayout';

import OverviewPage from '../pages/dashboard/OverviewPage';
import EventListPage from '../pages/event/list/EventListPage';
import EventEditPage from '../pages/event/edit/EventEditPage';
import EventDetailPage from '../pages/event/detail/EvenDetailPage';


const PrivateRoutes = ({ children }) => {
    const token = localStorage.getItem("user")
    return (
        token ? children : <Navigate to="/login" />
    )
}

const PublicRoutes = () => {
    const user = getUser()
    return (
        user ? <Navigate to="/" /> : <Outlet />
    )
}

const Index = () => {
    return (
        <>
            <Routes>
                <Route path="/login" Component={() => {
                    console.log("asd")

                    return <div>Login</div>
                }} />
                <Route path="/register" element={<OverviewPage />} />

                {/* <Route element={<PrivateRoutes />}>
                    <Route path="/dashboard" element={<OverviewPage />} />
                    <Route path="/dashboard/event" element={<EventListPage />} />
                    <Route path="/dashboard/new-event-track" element={<OverviewPage />} />
                    <Route path="/dashboard/edit-event-track/:id" element={<OverviewPage />} />
                    <Route path="/dashboard/new-venue" element={<OverviewPage />} />
                    <Route path="/dashboard/my-events" element={<OverviewPage />} />
                    <Route path="/dashboard/registered-events" element={<OverviewPage />} />
                    <Route path="/dashboard/my-events/:id" element={<OverviewPage />} />
                </Route> */}

                <Route element={<PrivateRoutes><MainFramLayout /></PrivateRoutes>}>
                    <Route path="/" index element={<OverviewPage />} />
                    <Route path="/event" element={<EventListPage />} />
                    <Route path="/event/edit/:id" element={<EventEditPage />} />
                    <Route path="/event/preview/:id" element={<EventDetailPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </>
    );
};


export default Index;
