import { useNavigate } from "react-router-dom"
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes"
import { useSorteador } from "../../state/hooks/useSorteador"
import './Rodape.css'


export default function Rodape() {
    const participantes = useListaDeParticipantes()
    const navigate = useNavigate()
    const sortear = useSorteador()

    const moveToDraw = () => {
        sortear()
        navigate('/sorteio')
    }

    return (
        <footer className="rodape-configuracoes">
            <button 
                className="botao"
                disabled={ participantes.length < 3}
                onClick={moveToDraw}
            >Iniciar brincadeira</button>
            <img src="/images/sacolas.png" alt="Sacolas de compras" />
        </footer>
    )
}
