import { useState } from "react";
import { Link } from "react-router"
import { validateCurrentWeather } from "../current"; // Importa la función de validación
import { CurrentWeather } from "../current"; // Importa el tipo para la respuesta

export default function BuscarTiempo({ setClima, codigoPostal, setCodigoPostal }: 
  {setClima: React.Dispatch<React.SetStateAction<CurrentWeather | null>>; codigoPostal: string; setCodigoPostal: (codigo: string) => void }) {
  const [localidad, setLocalidad] = useState<String | null>();
  const [busqueda, setBusqueda ] = useState(false)
  const [error, setError] = useState<string>("");

  // Función para obtener las coordenadas a partir del código postal
  const obtenerCoordenadas = async (codigo: string): Promise<{ lat: number; lon: number } | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${codigo}&country=Spain&format=json`
      );
      const data = await response.json();
      if (data.length === 0) {
        throw new Error("Código postal no encontrado");
      }
      setLocalidad(data[0].display_name)
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } catch (error) {
      setError((error as Error).message);
      return null;
    }
  };

  // Función para obtener el clima a partir de las coordenadas
  const obtenerClima = async (lat: number, lon: number): Promise<CurrentWeather | null> => {
    setClima(null)
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      current_weather: 'true', 
      timezone: 'Europe/Berlin', 
    });

    // Creación de la url completa a la que le hacemos las peticiones
    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      /* El tipo de dato 'date-time' de la propiedad time necessita tener los segundos, pero el fichero json que devuelve la API no los
      incluye, así que se los añado para que la fecha esté en el formato correcto (ISO 8601 con segundos)*/
      const currentWeather = data.current_weather;
      currentWeather.time += ":00Z"; // Agregar los segundos

      // Validamos los datos con el esquema
      if (!validateCurrentWeather(data)) {
        setError("Datos de la API no válidos");
        return null;
      }

      return data.current_weather as CurrentWeather; // Si los datos son válidos, los devolvemos

    } catch (error) {
        setError("Error al obtener el clima");
        return null;
    }
  };


  // Función que maneja la búsqueda cuando el usuario ingresa el código postal
  const handleBuscar = async () => {
    //Reseteo todas las variables de estado
    setError("");
    setClima(null);
    setBusqueda(false)

    //Ejecuto la búsqueda
    const coords = await obtenerCoordenadas(codigoPostal);
    if (coords) {
      const climaData = await obtenerClima(coords.lat, coords.lon);
      setClima(climaData);
      setBusqueda(true)
    }
    
  };

  return (
      <div className="container mt-4">
        <div className="card p-4 shadow-sm">
          <p>Si no conoces el codigo postal de la ubicación que deseas, dirigete <Link to={"/mapa"} className="link">aquí</Link> para encontrarlo en el mapa</p>
          <div className="mb-1 row">
            <div className="col-9">
                <input
                  type="text"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  placeholder="Ingresar código postal"
                  className="form-control"
                />
            </div>
            <div className="col-3">
              <button onClick={handleBuscar} className="btn btn-primary w-100">
                Buscar
              </button>
            </div>
            
            
          </div>
        </div>
          
          {error && <p className="text-danger mt-2">{error}</p>}

          {busqueda && (
            <div className="row mt-3 justify-content-evenly">
              <p className="text-center fw-bold">{localidad}</p>
              <div className="col-4 m-1 alert alert-warning text-center justify-content-center">
                <Link to={"/informacion"} className="link text-center">
                  Información meteorologica 
                </Link>
              </div>
            </div>
        )}
      
    </div>
        
  );
}