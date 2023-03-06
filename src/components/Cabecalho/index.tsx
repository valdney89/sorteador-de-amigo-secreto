import './Cabecalho.css'

export default function Cabecalho() {
  return (
    <header className="cabecalho">
        <div className="imagem-logo" role="img" aria-label='Logo do Sorteador'></div>
        <img className='participante' src="/images/participante.png" alt="Participante com um presente na mão" />
    </header>
  )
}
