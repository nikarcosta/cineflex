import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/css/reset.css";
import "../assets/css/styles.css";
import Topbar from "./Topbar";
import ListaFilmes from "./ListaFilmes";
import Filme from "./FIlme";
import Sessao from "./Sessao";
import Sucesso from "./Sucesso";



export default function App(){
    const [reserva, setReserva] = useState(null);
    return(
        <>
        <BrowserRouter>
            <Topbar />
            <Routes>
            <Route path="/" element={<ListaFilmes />} />
            <Route path="/sessoes/:idFIlme" element={<Filme />} />
            <Route path="/assentos/:idSessao" element={<Sessao finalizar={(reserva) => setReserva(reserva)}/>} />
            <Route path="/sucesso" element={<Sucesso reserva={reserva} novaReserva={() => setReserva(null)}/>} />
            </Routes>
        </BrowserRouter>
        </>
        
    );
}