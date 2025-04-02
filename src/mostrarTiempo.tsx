import { CurrentWeather } from "../current";


export default function MostrarTiempo({ clima }: { clima: CurrentWeather | null }) {
    if (!clima) {
      return <div>Cargando...</div>;
    }
  
    // Elegir imagen en función de la temperatura
    let fondo = "";
    if (clima.temperature > 30) {
      fondo = "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";  // Imagen de clima soleado
    } else if (clima.temperature <= 30 && clima.temperature > 15) {
      fondo = "https://images.unsplash.com/photo-1728164643005-409ef2ea542c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";  // Imagen de clima nublado
    } else if (clima.temperature <= 15 && clima.temperature > 8) {
        fondo = "https://plus.unsplash.com/premium_photo-1710011850786-85eb679110bb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";  // Imagen de clima nublado
    } else{
      fondo = "https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2108&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";  // Imagen de clima frío
    }
  
    return (
      <div className="container" style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="card shadow-lg p-4 rounded-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <h2 className="text-center mb-5">Información Meteorológica</h2>
  
              <div className="d-flex justify-content-around">

                <div className="text-center">
                  <h4>Temperatura</h4>
                  <p className="h5">{clima.temperature} °C</p>
                </div>

                <div className="text-center">
                  <h4>Velocidad del Viento</h4>
                  <p className="h5">{clima.windspeed} km/h</p>
                </div>

                <div className="text-center">
                  <h4>Dirección del Viento</h4>
                  <p className="h5">{clima.winddirection}°</p> 
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}