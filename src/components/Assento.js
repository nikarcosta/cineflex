export default function Assento(props) {
    const {id, numero, disponivel, selecionado, aoSelecionar} = props;
    
    function selecionarAssento() {
      if(!disponivel) alert("Esse assento não está disponível");
      else aoSelecionar(id, numero);
    }
  
    if(selecionado){
      return (
        <div className="dot selecionado"
          disponivel={disponivel} 
          selecionado={selecionado}
          onClick={selecionarAssento}
        >
          {numero}
        </div>
      );
    } else if(disponivel){
      return (
        <div className="dot disponivel"
        disponivel={disponivel} 
        selecionado={selecionado}
        onClick={selecionarAssento}
      >
        {numero}
      </div>
      );
    } else {
      return (
        <div className="dot indisponivel"
        disponivel={disponivel} 
        selecionado={selecionado}
        onClick={selecionarAssento}
      >
        {numero}
      </div>
      );
    }
    
    
  };
  
  