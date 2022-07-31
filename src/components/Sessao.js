import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


function MontarAssentos({id, name, isAvailable}){
    
    return(
        <>
        {
            isAvailable === true? <div key={id} className="dot disponivel" onClick={SelecionarAssento}><span>{name}</span></div> :
            <div key={id} className="dot indisponivel"><span>{name}</span></div>
        }        
        </>
    );
}

function SelecionarAssento(){

}

export default function Sessao(){
    const {idSessao} = useParams();
    const [assentos, setAssentos] = useState(null);
    const [nome, setNome] =  useState("");
    const [cpf, setCpf] = useState("");
    console.log("ID SESSAO:" + idSessao);

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`;
        const promise = axios.get(URL);

        promise.then((response) => {
            const {data} = response;
            setAssentos(data);
            console.log(data);
        })
        .catch(err => alert(err.response.statusText));
    },[]);


    return(
        <>
            <div className="tela-sessao">
                <div className="titulo-sessao-assentos"><span>Selecione o(s) assento(s)</span></div>
                <div className="container-assentos">
                {
                    assentos === null ? <p>Carregando...</p>:
                    assentos.seats.map(assento => {
                        const {id, name, isAvailable} = assento;
                        console.log(assento);
                        console.log(id);
                        console.log("Name: " + name);
                        console.log(isAvailable);
                        return <MontarAssentos id={id} name={name} isAvailable={isAvailable}/>
                    })
                }
                    <div className="legenda">
                        <div className="cor-legenda"><div className="dot selecionado"></div><span>Selecionado</span></div>
                        <div className="cor-legenda"><div className="dot disponivel"></div><span>Disponível</span></div>
                        <div className="cor-legenda"><div className="dot indisponivel"></div><span>Indisponível</span></div>
                    </div>
                </div>
                <div className="formulario">
                    <div><span>Nome do comprador:</span></div>
                    <input type="text" placeholder="Digite seu nome......"/>
                    <div><span>CPF do comprador:</span></div>
                    <input type="text" placeholder="Digite seu CPF..."/>
                </div>
                <div className="reservar-assento">
                    <button className="botao-reservar"><span>Reservar assento(s)</span></button>
                </div>
            </div>
            {
                assentos === null? <p>Carregando...</p>:
                <footer>
                <div className="info-footer">
                    <div className="footer-capa-filme">
                        <img src={assentos.movie.posterURL} alt="capa" />
                    </div>  
                    <div className="nome-filme"><span>{assentos.movie.title}</span><span>{assentos.day.weekday} - {assentos.name}</span></div>
                </div>
                </footer>
            }  
        </>
    );
}