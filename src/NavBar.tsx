import {NavLink} from "react-router"

export default function Navbar() {
    return(
      <div className={"container m-5"}>
        
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid justify-content-evenly">
                
                <NavLink className="navbar-brand" to="/">Buscador del tiempo</NavLink>
                <NavLink className="navbar-brand" to="/mapa">Buscador de codigo</NavLink>
                <NavLink className="navbar-brand" to="/informacion">Información Meteorológica</NavLink>
                
                
            </div>
            
        </nav>
      </div>
  
    )
  }