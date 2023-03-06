import { useRef, useState } from "react"
import { useAdicionarParticipante } from "../../state/hooks/useAdicionarParticipante"
import { useMensagemDeErro } from "../../state/hooks/useMensagemDeErro"
import './Form.css'


export default function Form() {

    const [nome, setNome] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    const adicionarNaLista = useAdicionarParticipante()

    const msgError = useMensagemDeErro()

    const adicionarParticipante = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        adicionarNaLista(nome)

        setNome('')
        inputRef?.current?.focus()
    }

    return (
        <form onSubmit={event => adicionarParticipante(event)}>
            <div className="grupo-input-btn">
                <input
                    ref={inputRef}
                    value={nome}
                    onChange={event => setNome(event.target.value)}
                    type="text"
                    placeholder="Insira os nomes dos participantes" 
                />
                <button disabled={!nome}>Adicionar</button>
            </div>
            {msgError && <p className="alerta erro" role="alert">{ msgError }</p>}
        </form>
    )
}
