import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import DashboardGeral from "./pages/DashboardGeral/DashboardGeral";
import Teste from "./pages/test";
import DashboardColaboradores from "./pages/DashboardColaboradores/DashboardColaboradores";

function Rotas() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/dashboardGeral"} element={<DashboardGeral />} />
                    <Route path={"/DashboardColaboradores"} element={<DashboardColaboradores />} />
                    <Route path="/test" element={<Teste/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;
