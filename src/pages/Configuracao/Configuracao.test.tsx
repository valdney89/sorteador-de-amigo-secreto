import { render } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import Configuracao from "./index"

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Configuracao', () => {
    test('should create', () => {
        const { container } = render(
            <RecoilRoot>
                <Configuracao />
            </RecoilRoot>
        )

        expect(container).toMatchSnapshot()
    })
})