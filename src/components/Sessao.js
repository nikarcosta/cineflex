import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Assento from "./Assento";

export default function Sessao(props){
    const {idSessao} = useParams();
    const navigate = useNavigate();
    const {finalizar} = props;
    const [sessao, setSessao] = useState(null);
    const [assentosSelecionados, setAssentosSelecionados] = useState([]);
    const [dadosCompra, setDadosCompra] = useState({nome:"", cpf:""});

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao}/seats`;
        const promise = axios.get(URL);

        promise.then((response) => {
            const {data} = response;
            setSessao(data);
        })
        .catch(err => alert(err.response.statusText));
    },[]);

    function confirmarCompra(event) {
        event.preventDefault();
        if(assentos.length > 0) {
            const URL = `https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many`;
            const promise = axios.post(URL, {
            ids: assentosSelecionados.map(assento => assento.id),
            name: dadosCompra.nome,
            cpf: dadosCompra.cpf
            });
      
            promise.then((response) => {
                finalizar({
                filme: sessao.movie.title,
                dia: sessao.day.date,
                horario: sessao.name,
                assentos: assentosSelecionados,
                comprador: dadosCompra
            });
      
            navigate("/sucesso");
            });
            promise.catch(err => alert(err.response.statusText));
      
        } else {
            alert("Selecione pelo menos um assento!")
        }
    }
      
    function toggle(id, numero) {
        const jaSelecionado = assentosSelecionados.some(assento => assento.id === id);
        if(!jaSelecionado) {
            setAssentosSelecionados([...assentosSelecionados, {id, numero}]);
        } else {
            const novosAssentos = assentosSelecionados.filter(assento => assento.id !== id);
            setAssentosSelecionados(novosAssentos);
        }
    }
      
    function montarAssentos() {
        if(sessao !== null) {
            return sessao.seats.map(seat => {
              const {id, name, isAvailable} = seat;
              const selecionado = assentosSelecionados.some(assento => assento.id === id);
              return (
                <Assento 
                  key={id} 
                  id={id} 
                  numero={name} 
                  disponivel={isAvailable} 
                  selecionado={selecionado}
                  aoSelecionar={(id, numero) => toggle(id, numero)}
                />
              )
            })
          } else {
            <p>Carregando...</p>;
          }
        }
      
        function montarFooter() {
          if(sessao !== null) {
            return <>
            <div className="footer-capa-filme">
              <img src={sessao.movie.posterURL} alt={sessao.movie.title} />
            </div>
              <div className="nome-filme">
                <p>{sessao.movie.title}</p>
                <p>{sessao.day.weekday} - {sessao.name}</p>
              </div>
            </>
          } else {
            return <p>Carregando...</p>;
          }
        }
      
        function montarLegenda() {
          return (
            <>
              <div className="legenda">
                <div className="cor-legenda"><div className="dot selecionado"></div><span>Selecionado</span></div>
                <div className="cor-legenda"><div className="dot disponivel"></div><span>Disponível</span></div>
                <div className="cor-legenda"><div className="dot indisponivel"></div><span>Indisponível</span></div>
              </div>
            </>
          )
        }
      
        function montarFormularioCompra() {
          return (
            <>
              <form>
              <label htmlFor="nome">Nome do comprador:</label>
              <input type="text" id="nome" value={dadosCompra.nome} placeholder="Digite seu nome..." required
                onChange={(e) => setDadosCompra({...dadosCompra, nome: e.target.value })}
              />
              <label htmlFor="cpf">CPF do comprador:</label>
              <input type="text" id="cpf" value={dadosCompra.cpf} placeholder="Digite seu CPF..." required
                onChange={(e) => setDadosCompra({...dadosCompra, cpf: e.target.value })}
              />
              <div className="reservar-assento">
                <button className="botao-reservar">Reservar assento(s)</button>
              </div>
              </form>
            </>
          )
        }
      
        const assentos = montarAssentos();
        const footer = montarFooter();
        const legenda = montarLegenda();
        const formularioCompra = montarFormularioCompra();



    return(
        <>
            <div className="tela-sessao">
                <div className="titulo-sessao-assentos"><span>Selecione o(s) assento(s)</span></div>
                <div className="container-assentos">
                    {assentos}
                    {legenda}
                </div>
                <div className="formulario" onSubmit={confirmarCompra}>
                    {formularioCompra}
                </div>
                <footer>
                <div className="info-footer">{footer}</div>
                </footer>
            </div>
        </>
    );
}