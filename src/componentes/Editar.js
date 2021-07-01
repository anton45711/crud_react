import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/api";

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                datosCargados:false, 
                empleado:[]


         }
    }
    cambioValor = (e) =>{ //obtener el valor que el usuario ingreso

        const state=this.state.empleado;

        state[e.target.name] = e.target.value;
        this.setState({ empleado:state});

       
        

     }
     enviarDatos = (e) => {
        e.preventDefault(); //detener todo lo que esta sucediendo, independiente de lo que fue enviado
        console.log("Formulario fue enviado...");
        const{id,nombre,correo}= this.state.empleado;//recoleccion de datos
        console.log(id);
        console.log(nombre);
        console.log(correo);

        var datosEnviar={id:id, nombre:nombre, correo:correo}





fetch(Api + "?actualizar=1", {
        method:"POST",
        body:JSON.stringify(datosEnviar)

}) //obtener los datos    
.then(respuesta=>respuesta.json())    
.then((datosRespuesta)=>{
      console.log(datosRespuesta);
      this.props.history.push("/"); //props regresar al enlace anterior     


})

.catch(console.log)

     }

    componentDidMount(){ //componente para guardar informacion
        console.log(this.props.match.params.id); //propiedad que recibe de la URL

        fetch(Api + "?consultar="+this.props.match.params.id) //obtener los datos    
        .then(respuesta=>respuesta.json())    
            .then((datosRespuesta)=>{
                console.log("=>"+datosRespuesta);
                   this.setState({ 
                       datosCargados:true, 
                       empleado:datosRespuesta [0]
                    })
                //cuando se cargan los datos se cambia a verdadero


})

.catch(console.log)




      

    }


    render() { 
        const{datosCargados, empleado}=this.state  //recupera todos los datos del estado

        if(!datosCargados){ return(<div>Cargando...</div>); } //si no hay datos mostrar cargando

        else{

        
        return ( <div className="card">
            <div className="card-header">
                editar empleados
            </div>
            <div className="card-body">
               
           
               <form onSubmit= {this.enviarDatos} >  
              

               <div className="form-group">
                 <label  htmlFor="">Clave: </label>
                 <input type="text" readOnly className="form-control" onChange={this.cambioValor}  value= {empleado.id} name="id" id="id" aria-describedby="helpId" placeholder=""/>
                 <small id="helpId" className="form-text text-muted">Clave</small>
               </div>

            <div className="form-group">
            <label htmlFor="">Nombre: </label>
            <input type="text" name="nombre" id="nombre" onChange={this.cambioValor} value={empleado.nombre} className="form-control" placeholder="" aria-describedby="helpId" />
            <small id="helpId" className="text-muted">Escribe el nombre del empleado</small>
                        </div>

                        <div className="form-group">
            <label htmlFor="">Correo: </label>
            <input type="text" name="correo" id="correo" onChange={this.cambioValor}  className="form-control" placeholder="" aria-describedby="helpId" value={empleado.correo} />
            <small id="helpId" className="text-muted">Escribe el correo del empleado</small>
                        </div>

                <div className="btn-group" role="group" aria-label="">

                    <button type="submit" className="btn btn-success">Actualizar empleado</button>
                    <Link to={"/"} className="btn btn-danger">Cancelar</Link>

                </div>


                    </form>




            </div>
            <div className="card-footer text-muted">
           
            </div>
        </div> );
         }
    }
}
 
export default Editar;