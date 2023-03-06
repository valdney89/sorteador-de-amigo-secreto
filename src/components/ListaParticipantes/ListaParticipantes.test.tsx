import { render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes"
import ListaParticipantes from './index'

jest.mock('../../state/hooks/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

describe('ListaParticipantes', () => {

    describe('empty participants', () => {
        beforeEach(() => {
            (useListaDeParticipantes as jest.Mock).mockReturnValue([])
        })

        test('should not render the list when participants[] is empty', () => {
            render(
                <RecoilRoot>
                    <ListaParticipantes />
                </RecoilRoot>
            )
        
            const itens = screen.queryAllByRole('listitem')
            expect(itens).toHaveLength(0)
        })
    })

    describe('participants with values', () => {
        const participantesMock = ['Joao', 'Jose']

        beforeEach(() => {
            (useListaDeParticipantes as jest.Mock).mockReturnValue(participantesMock)
        })

        test('should render the list when participants[] has values', () => {
            render(
                <RecoilRoot>
                    <ListaParticipantes />
                </RecoilRoot>
            )
        
            const itens = screen.queryAllByRole('listitem')
            expect(itens).toHaveLength(participantesMock.length)
        })
    })
    
})