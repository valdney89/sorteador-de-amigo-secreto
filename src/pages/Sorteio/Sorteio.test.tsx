import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes"
import { useResultadoDoSorteio } from "../../state/hooks/useResultadoDoSorteio"
import Sorteio from "./index"

jest.mock('../../state/hooks/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

jest.mock('../../state/hooks/useResultadoDoSorteio', () => {
    return {
        useResultadoDoSorteio: jest.fn()
    }
})

describe('Sorteio', () => {
    const participants = ['joao', 'jose', 'maria']

    const resultado = new Map([
        ['joao', 'jose'],
        ['jose', 'maria'],
        ['maria', 'joao']
    ])
    
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participants);
        (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado);
    })

    test('should all participants show your secret friend', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        )

        const opcoes = screen.queryAllByRole('option')
        expect(opcoes).toHaveLength(participants.length + 1)
    })

    test('should show secret friend when requested', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        )

        const select = screen.getByPlaceholderText('Selecione o seu nome')
        
        fireEvent.change(select, {
            target: {
                value: participants[0]
            }
        })

        const button = screen.getByRole('button')

        fireEvent.click(button)

        const amigoSecreto = screen.getByRole('alert')

        expect(amigoSecreto).toBeInTheDocument()
    })
})