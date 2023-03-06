import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes"
import Rodape from './index'

jest.mock('../../state/hooks/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

const mockedUsedNavigate = jest.fn();
const mockedSorteio = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../state/hooks/useSorteador.ts', () => ({
    useSorteador: () => mockedSorteio,
}));

describe('when do not have participants', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue([])
    })
    
    test('should not init the draw when do not have a sufficient participants', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        )

        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
    })
})

describe('when have participants', () => {
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(['pessoa1', 'pessoa2', 'pessoa3', 'pessoa4'])
    })

    test('should init the draw when have a sufficient participants', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        )

        const button = screen.getByRole('button')
        expect(button).not.toBeDisabled()
    })

    test('should change to draw page when button is clicked', () => {
        render(
            <RecoilRoot>
                <Rodape />
            </RecoilRoot>
        )

        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/sorteio')
        expect(mockedSorteio).toHaveBeenCalledTimes(1)
    })
})