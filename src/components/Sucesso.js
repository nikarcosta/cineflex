import Rodape from "./Rodape";

export default function Sucesso(){
    return(
        <>
        <div className="tela-sucesso">
            <div className="cabecario-tela-sucesso">Pedido feito <br /> com sucesso</div>
            <div className="dados-filme">
                <div>Filme e sessão</div>
                <span>Enola Holmes</span>
                <span>HORARIO</span>
            </div>
            <div className="ingressos">
                <div>Ingressos</div>
                <span>Assento</span>
                <span>Assento</span>
            </div>
            <div className="dados-comprador">
                <div>Comprador</div>
                <span>Nome: João da Silva Sauro</span>
                <span>CPF: 123.456.789-10</span>
            </div>
            <div className="container-botao-voltar"><button className="botao-voltar"><span>Voltar pra Home</span></button></div>
        </div>
        <Rodape />
        </>
    );
}