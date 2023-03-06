import { errorState } from './../atom';
import { listaParticipantesState } from "../atom"
import { useSetRecoilState, useRecoilValue } from 'recoil'

export const useAdicionarParticipante = () => {
    const setLista = useSetRecoilState(listaParticipantesState)
    const lista = useRecoilValue(listaParticipantesState)
    const setError = useSetRecoilState(errorState)

    return (nomeDoParticipante: string) => {
        if(lista.includes(nomeDoParticipante)){
            setError('Nomes duplicados não são permitidos!')
            setTimeout(() => {
                setError('')
            }, 5000);
            return;
        }
        return setLista(listaAtual => [...listaAtual, nomeDoParticipante])
    }
}