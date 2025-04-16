import { useState, FormEvent } from 'react'
import { FiCrosshair } from 'react-icons/fi'

interface Props {
  onLocate: (pos: google.maps.LatLngLiteral) => void
}

export default function LocationModal({ onLocate }: Props) {
  const [askCep, setAskCep] = useState(false)
  const [cep, setCep] = useState('')

  const handleGps = () => {
    if (!navigator.geolocation) return alert('GPS indisponível')
    navigator.geolocation.getCurrentPosition(
      p => onLocate({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => alert('Falha ao obter GPS')
    )
  }

  const handleCep = async (e: FormEvent) => {
    e.preventDefault()
    const codigo = cep.replace(/\D/g, '')
    if (codigo.length !== 8) return alert('CEP inválido')
    const via = await fetch(`https://viacep.com.br/ws/${codigo}/json/`)
    const data = await via.json()
    if (data.erro) return alert('CEP não encontrado')
    const addr = `${data.logradouro || ''}, ${data.localidade}, ${data.uf}`
    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ address: addr }, (r, s) => {
      if (s === 'OK' && r?.[0]) {
        onLocate({
          lat: r[0].geometry.location.lat(),
          lng: r[0].geometry.location.lng(),
        })
      } else alert('Falha ao geocodificar CEP')
    })
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-30 font-[Poppins]">
      <div className="w-11/12 max-w-xl rounded-lg p-8 text-center bg-gradient-to-b from-blue-600 to-blue-800 shadow-xl">
        <h2 className="text-white text-2xl font-normal mb-8 leading-relaxed">
          Prefere usar sua localização atual<br />ou pesquisar um outro lugar?
        </h2>

        <button
          onClick={handleGps}
          className="w-2/3 mx-auto py-4 mb-4 rounded-md bg-gradient-to-b from-white to-gray-300 text-blue-800 font-medium flex items-center justify-center gap-2 hover:brightness-95"
        >
          <FiCrosshair /> Usar minha localização
        </button>

        {!askCep ? (
          <button
            onClick={() => setAskCep(true)}
            className="w-2/3 mx-auto py-4 rounded-md bg-gradient-to-b from-white to-gray-300 text-blue-800 font-medium hover:brightness-95"
          >
            Pesquisar local
          </button>
        ) : (
          <form onSubmit={handleCep} className="flex flex-col w-2/3 mx-auto gap-4">
            <input
              value={cep}
              onChange={e => setCep(e.target.value)}
              placeholder="Digite o CEP"
              className="p-3 rounded-md text-gray-800 bg-gray-100"
            />
            <button
              type="submit"
              className="py-3 rounded-md bg-white text-blue-800 font-semibold hover:brightness-95"
            >
              Confirmar
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
