import { Map, Marker } from "pigeon-maps";
import { useState } from "react";
import { Link } from "react-router";

export default function MapaInteractivo({ codigoPostal, setCodigoPostal }: { codigoPostal: string; setCodigoPostal: (codigo: string) => void }) {
  const [ubicacion, setUbicacion] = useState<[number, number]>([41.3874, 2.1686]); // Barcelona por defecto

  // Función para obtener el código postal usando la API de OpenStreetMap (Nominatim)
  const obtenerCodigoPostal = async (lat: number, lon: number) => {
    try {
      const respuesta = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const datos = await respuesta.json();
      if (datos.address && datos.address.postcode) {
        setCodigoPostal(datos.address.postcode);
        
      } else {
        setCodigoPostal("No encontrado");
      }
    } catch (error) {
      console.error("Error obteniendo el código postal:", error);
      setCodigoPostal("Error");
    }
  };

  // Cuando el usuario haga clic en el mapa, se actualiza la ubicación y se obtiene el código postal
  const handleMapClick = ({ latLng }: { latLng: [number, number] }) => {
    setUbicacion(latLng);
    obtenerCodigoPostal(latLng[0], latLng[1]);
  };

  return (
    <div>
      <div className="container m-5">
        <h3 className="text-center text-dark">Selecciona una ubicación en el mapa para conocer su codigo postal</h3>
        <p>Codigo postal: <Link to={"/"} className="link text-center fw-bold">{codigoPostal}</Link></p>
      
        <Map height={400} defaultCenter={ubicacion} defaultZoom={6} onClick={handleMapClick}>
          <Marker width={50} anchor={ubicacion} />
        </Map>
      </div>
      
    </div>
  );
}