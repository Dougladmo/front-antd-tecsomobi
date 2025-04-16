import { GoogleMap, MarkerF, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import { ChargedPoint } from "../hooks/useChargingPoints";

interface MapViewProps {
  center: google.maps.LatLngLiteral;
  points: ChargedPoint[];
}

export default function MapView({ center, points }: MapViewProps) {
  const [selected, setSelected] = useState<ChargedPoint | null>(null);

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={14}
      options={{ disableDefaultUI: true }}
      onClick={() => setSelected(null)}
    >
      {points.map((p) => (
        <MarkerF
          key={p.id}
          position={p.position}
          title={p.nome}
          onClick={() => setSelected(p)}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 4.25 7 11 7 11s7-6.75 7-11c0-3.87-3.13-7-7-7z M12 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
            fillColor: p.status ? "#FF5627" : "#c0392b",
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 2,
            scale: 3, 
            anchor: new window.google.maps.Point(12, 24),
          }}
        />
      ))}

      {selected && (
        <InfoWindow
          position={selected.position}
          onCloseClick={() => setSelected(null)}
        >
          <div className="w-[280px] font-[Poppins]">
            <div className="h-[6px] bg-cyan-600 rounded-t-md mb-2" />

            <h3 className="font-semibold text-lg mb-1">{selected.nome}</h3>

            <p className="text-xs text-gray-500 uppercase mb-1">
              {selected.tipoRecarga === "cartao"
                ? "POSTO DE RECARGA – BR"
                : selected.tipoRecarga.toUpperCase()}
            </p>

            <p
              className={`text-sm font-medium mb-2 ${
                selected.status ? "text-green-600" : "text-red-600"
              }`}
            >
              {selected.status ? "Aberto" : "Fechado"}
            </p>

            <p className="text-sm mb-2">{selected.endereco}</p>

            <div className="text-xs leading-5 mb-3">
              <div>
                <span className="font-semibold text-red-500">Dom</span> –{" "}
                {selected.horarioFuncionamento}
              </div>
              <div>
                <span className="font-semibold text-pink-500">Seg/Sex</span> –{" "}
                {selected.horarioFuncionamento}
              </div>
              <div>
                <span className="font-semibold text-purple-600">Sab</span> –{" "}
                {selected.horarioFuncionamento}
              </div>
            </div>

            <p className="text-xs mb-4">
              👤 {selected.responsavelNome} – {selected.responsavelContato}
            </p>

            <div className="flex gap-2">
              <button
                className="flex-1 border border-red-500 text-red-600 py-2 cursor-pointer rounded-md text-sm hover:bg-red-50"
                onClick={() =>
                  navigator.share?.({
                    title: selected.nome,
                    text: selected.endereco,
                    url: window.location.href,
                  })
                }
              >
                Compartilhar
              </button>

              <button
                className="flex-1 bg-red-600 text-white py-2 rounded-md text-sm cursor-pointer hover:brightness-110"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${selected.position.lat},${selected.position.lng}`,
                    "_blank"
                  )
                }
              >
                Rota&nbsp;<span className="inline-block rotate-45">➜</span>
              </button>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
