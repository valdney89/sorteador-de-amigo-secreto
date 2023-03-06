import { useState } from "react";
import Card from "../../components/Card";
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes"
import { useResultadoDoSorteio } from "../../state/hooks/useResultadoDoSorteio";
import './Sorteio.css'


export default function Sorteio() {

    const [participanteDaVez, setParticipanteDaVez] = useState('')
    const [amigoSecreto, setAmigoSecreto] = useState('')

    const participantes = useListaDeParticipantes()

    const resultado = useResultadoDoSorteio()

    const sortear = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(resultado.has(participanteDaVez)){
            setAmigoSecreto(resultado.get(participanteDaVez)!)
        }
    }

    return (
        <Card>
            <section className="sorteio">
                <h2>Quem vai tirar o papelzinho?</h2>
                <form onSubmit={event => sortear(event)}>
                    <select
                        required
                        name="participanteDaVez"
                        id="participanteDaVez"
                        placeholder="Selecione o seu nome"
                        value={participanteDaVez}
                        onChange={event => setParticipanteDaVez(event.target.value)}
                    >
                        <option>Selecione seu nome</option>
                        {
                            participantes.map(participante => 
                                <option key={participante}>
                                    {participante}
                                </option>
                            )
                        }
                    </select>
                    <p>Clique em em sortear para ver quem é seu amigo secreto!</p>
                    <button className="botao-sortear">Sortear</button>
                </form>
                {amigoSecreto && <p className="resultado" role="alert">{amigoSecreto}</p>}
                <footer className="sorteio">
                    <img src="/images/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
                </footer>
            </section>
        </Card>
    )
}
