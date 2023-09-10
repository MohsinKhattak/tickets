import React, { useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

// Import your components and pages
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Auth/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Receiver from "./pages/Receiver/Receiver";
import Settings from "./components/EditProfile/EditProfile";
import Ticket from "./pages/Ticket/Ticket";
import NotFound from "./pages/NotFound/NotFound";
import PrivateRoutes from "./routes/PrivateRoutes";
import EditTicket from "./pages/Ticket/EditTicket";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<RootLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="receiver" element={<Receiver />} />
          <Route path="ticket" element={<Ticket />} />
          <Route path="editTicket/:ticketId" element={<EditTicket />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
