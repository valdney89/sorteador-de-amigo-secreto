import { fireEvent, render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { RecoilRoot } from "recoil"
import Form from './index'

describe('Form', () => {
    test('news participants should not be added when the input is empty', () => {
        render(
            <RecoilRoot>
                <Form />
            </RecoilRoot>
        )
    
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const button = screen.getByRole('button')
    
        expect(input).toBeInTheDocument()
        expect(button).toBeDisabled()
    })
    
    test('news participants should be added when the input is filled', () => {
        render(
            <RecoilRoot>
                <Form />
            </RecoilRoot>
        )
    
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const button = screen.getByRole('button')
    
        fireEvent.change(input, {
            target: {
                value: 'Valdney Nogueira'
            }
        })
    
        fireEvent.click(button)
    
        expect(input).toHaveFocus()
    
        expect(input).toHaveValue('')
    })
    
    test('duplicated names should not be added in the list', () => {
        render(
            <RecoilRoot>
                <Form />
            </RecoilRoot>
        )
    
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const button = screen.getByRole('button')
    
        fireEvent.change(input, {
            target: {
                value: 'Valdney Nogueira'
            }
        })
    
        fireEvent.click(button)
    
        fireEvent.change(input, {
            target: {
                value: 'Valdney Nogueira'
            }
        })
    
        fireEvent.click(button)
    
        const msgError = screen.getByRole('alert')
    
        expect(msgError.textContent).toBe('Nomes duplicados não são permitidos!')
    })
    
    test('msg error should disappear after 5 seconds', () => {
        jest.useFakeTimers()
        render(
            <RecoilRoot>
                <Form />
            </RecoilRoot>
        )
    
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        const button = screen.getByRole('button')
    
        fireEvent.change(input, {
            target: {
                value: 'Valdney Nogueira'
            }
        })
    
        fireEvent.click(button)
    
        fireEvent.change(input, {
            target: {
                value: 'Valdney Nogueira'
            }
        })
    
        fireEvent.click(button)
    
        let msgError = screen.queryByRole('alert')
    
        expect(msgError).toBeInTheDocument()        
    
        act(() => {
            jest.runAllTimers()
        })

        msgError = screen.queryByRole('alert')
    
        expect(msgError).toBeNull()
    })
})
