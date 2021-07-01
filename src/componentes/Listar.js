import React from 'react';
import { Link } from "react-router-dom";

import Api from "../servicios/api";



class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { datosCargados:false,
            empleados:[] //depositar todos los estados llegados de la URL  } //inicializar con falso
        
    }

}

   borrarRegistros = (id) =>{
       console.log(id);


             fetch(Api + "?borrar="+id) //obtener los datos    
                     .then(respuesta=>respuesta.json())    
                         .then((datosRespuesta)=>{
                            console.log(datosRespuesta); //imprimir datos de respuesta
                                this.cargarDatos();

    
    })

    .catch(console.log)

}

    cargarDatos(){

            fetch(Api) //obtener los datos    
                 .then(respuesta=>respuesta.json())    
                     .then((datosRespuesta)=>{
                         console.log(datosRespuesta);
                            this.setState({ datosCargados:true, empleados:datosRespuesta})
                         //cuando se cargan los datos se cambia a verdadero

        
        })

        .catch(console.log)

    }



componentDidMount(){
    this.cargarDatos();

}

    render() { 
        const{datosCargados, empleados}=this.state  //recupera todos los datos del estado

        if(!datosCargados){ return(<div>Cargando...</div>); } //si no hay datos mostrar cargando

        else{


        return (

            <div className="card">
                <div className="card-header">
                <Link className="btn btn-success" to={"/crear"} >Agregar nuevo empleado</Link>
               
                </div>
                <div className="card-body">
                    <h4 className="card-title"><h4>Lista de empleados</h4> </h4>
                 
                    <table className="table">
            <thead>
                <tr >
                    <th>ID</th>
                    <th>nombre</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {empleados.map(
                    (empleado)=>(
                        <tr key={empleado.id}>
                    <td>{empleado.id}</td>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.correo}</td>
                    <td>
<div className="btn-group" role="group" aria-label="">
    <Link className="btn btn-warning" 
    to={"/editar/"+empleado.id} > 
        Editar</Link>

    <button type="button" className="btn btn-danger"
    onClick={() => this.borrarRegistros(empleado.id)}
    
    >Borrar</button>
    
</div>

                    </td>
                </tr>

                    )
                )}


                
               
            </tbody>
        </table>



                </div>
                <div className="card-footer text-muted">
                    
                </div>
            </div>
            
           );
        }
    }
}
 
export default Listar;