import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./NavBar.tsx";
import BuscarTiempo from "./buscarTiempo.tsx";
import MostrarTiempo from "./mostrarTiempo.tsx";
import { useState } from "react";
import { CurrentWeather } from "../current.ts";
import MapaInteractivo from "./mapa.tsx";

export default function App() {
  const [clima, setClima] = useState<CurrentWeather | null>(null);
  const [codigoPostal, setCodigoPostal] = useState("");

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home setClima={setClima} codigoPostal={codigoPostal} setCodigoPostal={setCodigoPostal}/>} />
          <Route path={"/informacion"} element={<Informacion clima={clima} />} />
          <Route path={"/mapa"} element={<Mapa codigoPostal={codigoPostal} setCodigoPostal={setCodigoPostal}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


function Home({ setClima, codigoPostal, setCodigoPostal }: 
  {setClima: React.Dispatch<React.SetStateAction<CurrentWeather | null>>; codigoPostal: string; setCodigoPostal: (codigo: string) => void }) {
  return (
    <div className={"container m-5"}>
      <div className="row justify-content-center">
        <div className="col-5 shadow-sm p-1 border border-1 border-dark rounded-4">
          <h3 className="text-center text-dark">Buscador de clima por código postal</h3>
        </div>
      </div>

      <BuscarTiempo setClima={setClima} codigoPostal={codigoPostal} setCodigoPostal={setCodigoPostal} />
    </div>
  );
}

function Informacion({ clima }: { clima: CurrentWeather | null }) {
  if (!clima) {
    return (
      <div className={"container m-5"}>
        <p className="text-danger fs-5">No se han encontrado datos del clima. Intenta buscar uno.</p>
      </div>
    );
  }

  return (
    <div className={"container m-5"}>
      <div className="row justify-content-center">
        <MostrarTiempo clima={clima} />
      </div>
      
    </div>
  );
}

function Mapa({ codigoPostal, setCodigoPostal }: { codigoPostal: string; setCodigoPostal: (codigo: string) => void }) {
  return (
    <div>
      <MapaInteractivo codigoPostal={codigoPostal} setCodigoPostal={setCodigoPostal}/>
    </div>
  )
}









