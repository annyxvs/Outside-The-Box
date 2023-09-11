import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from '../pages/Home/index';
import { LoginCliente } from "../pages/Auth-Pages/Login-Cliente";
import { CadastroCliente } from "../pages/Auth-Pages/Cadastro-Cliente";
import { LoginAdmin } from "../pages/Auth-Pages/Login-Admin";
import { Cart } from "../pages/Cart";
import { CompraFinalizada } from "../pages/Finish/Compra-Finalizada";

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<LoginCliente />} />
                <Route path="/cadastro" element={<CadastroCliente />} />
                <Route path="/admin" element={<LoginAdmin />} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/finish" element={<CompraFinalizada/>} />
            </Routes>
        </BrowserRouter>
    );
}
