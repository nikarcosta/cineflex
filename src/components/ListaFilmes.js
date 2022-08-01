import { Link } from "react-router-dom";
import axios from "axios";
import React, {useState, useEffect} from "react";


function Poster({id, posterURL}){
    return(
        <div className="filme">
        <Link to={`/sessoes/${id}`}>
        <div>
            <img src={posterURL} alt="poster" />
        </div>            
        </Link>
    </div>
    );
}



export default function ListaFilmes(){
    const [listaFilmes, setListaFilmes] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v7/cineflex/movies");

        promise.then((response) => {
            setListaFilmes([...response.data]);
        });
    },[]);

   return(
    <>
        <main>
            <div className="nome-seccao"><span>Selecione o filme</span></div>
            <div className="lista-de-filmes">
                {
                    listaFilmes.length === 0 ? "Carregando" : 
                    listaFilmes.map(poster => <Poster key={poster.id} posterURL={poster.posterURL} id={poster.id} />)
                }
            </div>
        </main>
    </>
   ); 
}