import { useNavigate } from "react-router-dom";

export default function Sucesso(props){
    const navigate = useNavigate();
    const {reserva, novaReserva} = props;
    const {filme, dia, horario, assentos, comprador} = reserva;

    function voltarParaHome(){
        novaReserva();
        navigate("/");
    }  

    return(
        <>
        <div className="tela-sucesso">
            <div className="cabecario-tela-sucesso">Pedido feito <br /> com sucesso</div>
            <div className="dados-filme">
                <div>Filme e sessão</div>
                <span>{filme}</span>
                <span>{dia} {horario}</span>
            </div>
            <div className="ingressos">
                <div>Ingressos</div>
                {
                    assentos.map(({numero}) => {
                        return <span key={numero}>Assento {numero}</span>
                    })
                }
            </div>
            <div className="dados-comprador">
                <div>Comprador</div>
                <span>Nome: {comprador.nome}</span>
                <span>CPF: {comprador.cpf}</span>
            </div>
            <div className="container-botao-voltar"><button className="botao-voltar" onClick={voltarParaHome}><span>Voltar pra Home</span></button></div>
        </div>
        </>
    );
}