import { useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'
import LocationModal from '../../components/LocationModel'
import MapView from '../../components/MapView'
import { useChargingPoints } from '../../hooks/useChargingPoints'

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export default function MapPage() {
  const navigate = useNavigate()
  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: GOOGLE_KEY })
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null)
  const [showModal, setShowModal] = useState(true)
  const points = useChargingPoints(isLoaded)

  if (loadError) return <p>Falha ao carregar o mapa.</p>
  if (!isLoaded) return <p>Carregando mapa…</p>

  return (
    <div className="w-full h-screen relative flex justify-center">
      <div className="fixed z-20 top-5 bg-gray-300/70 rounded-2xl flex items-center justify-center w-80 pointer-events-none">
        <img
          src="/logo2.png"
          alt="logo"
          className="w-72 cursor-pointer pointer-events-auto"
          onClick={() => navigate('/')}
        />
      </div>

      <MapView
        center={center ?? { lat: -14.235004, lng: -51.92528 }}
        points={points}
      />

      {showModal && (
        <LocationModal
          onLocate={(pos) => {
            setCenter(pos)
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}
