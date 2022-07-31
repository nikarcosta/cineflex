import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Rodape from "./Rodape";

function MontarSessoes({dia, data, sessoes}){
 
    return(
    <div className="sessoes-filme">
        <span>{dia} - {data}</span>
        <div className="container-horarios">
          <Horarios sessoes={sessoes}/>
        </div>
    </div>
    );
}

function Horarios({sessoes}){

  return sessoes.map((horario) => {
    const {name, id} = horario;
  
    return <div className="horario">
              <Link to={`/assentos/${id}`}>
              <span>{name}</span>
              </Link>
          </div>
  }) 
}


export default function Filme(){
    const {idFIlme} = useParams();
    const [filme, setFilme] = useState(null);
  
    useEffect(() => {
      const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFIlme}/showtimes`;
      const promise = axios.get(URL);
      promise.then((response) => {
        //const {data} = response;
        //setFilme(data);
        setFilme(response.data);
        console.log(response.data);
      });
      promise.catch(err => alert(err.response.statusText));
    },[]);

    

  return(
        <>
        <div className="tela-filme">
            <div className="titulo-sessao-filme"><span>Selecione o horário</span></div>
            {
                filme === null ? <p>Carregando...</p>:
                filme.days.map(dia => {
                    const {weekday, date, showtimes, id} = dia;
                         return <MontarSessoes key={id} dia={weekday} data={date} sessoes={showtimes} />
                  })
            }
        </div>
        {
          filme === null? <p>Carregando...</p>:
          <Rodape titulo={filme.title} poster={filme.posterURL}/>
        }        
        </>
    );

}