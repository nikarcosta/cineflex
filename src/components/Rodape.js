export default function Rodape({titulo, poster}){
    console.log(titulo);
    return(
        <>
        <footer>
            <div className="info-footer">
                <div className="footer-capa-filme">
                        <img src={poster} alt="capa" />
                </div>  
                <div className="nome-filme"><span>{titulo}</span></div>
            </div>
        </footer>
        </>
    );
}