import { realizarSorteio } from "./realizarSorteio"

describe('RealizarSorteio', () => {
    test('should each participant does not draw yourself', () => {

        const participantes = [
            'pessoa1',
            'pessoa2',
            'pessoa3',
            'pessoa4',
            'pessoa5',
        ]

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})