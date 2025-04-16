import { useState, useEffect } from 'react'

export interface ChargingPoint {
  id: number
  nome: string
  endereco: string
  tipoRecarga: string
  status: boolean
  horarioFuncionamento: string
  responsavelNome: string
  responsavelContato: string
  createdAt: string
  updatedAt: string
}

export type ChargedPoint = ChargingPoint & {
  position: google.maps.LatLngLiteral
}

const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY!

async function geocodeAddressHttp(address: string) {
  const params = new URLSearchParams({
    address,
    key: KEY,
    components: 'country:BR',
  })
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`)
  const data = await res.json()
  if (data.status !== 'OK' || data.results.length === 0) {
    throw new Error(data.error_message ?? data.status)
  }
  const { lat, lng } = data.results[0].geometry.location
  return { lat, lng }
}

export function useChargingPoints(isLoaded: boolean) {
  const [points, setPoints] = useState<ChargedPoint[]>([])

  useEffect(() => {
    if (!isLoaded) return
    ;(async () => {
      try {
        const res = await fetch('https://api-tecsomobi.onrender.com/chargingPoints')
        const raw: ChargingPoint[] = await res.json()

        const mapped = await Promise.all(
          raw.map(async p => {
            try {
              const pos = await geocodeAddressHttp(p.endereco)
              return { ...p, position: pos }
            } catch (err) {
              console.warn(`Falha ao geocodar "${p.endereco}":`, err)
              return null
            }
          })
        )

        setPoints(mapped.filter((p): p is ChargedPoint => !!p))
      } catch (err) {
        console.error('Erro ao buscar ou geocodar:', err)
      }
    })()
  }, [isLoaded])

  return points
}
