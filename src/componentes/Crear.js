import React from 'react';
import { Link } from "react-router-dom";
import Api from "../servicios/api";


class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
               nombre:"", 
               correo:"",
                errores:[]  //validar


         }
    } class

cambioValor = (e) =>{ //obtener el valor que el usuario ingreso
   const state  =this.state;
   state[e.target.name] = e.target.value
   this.setState({ state, errores: [] });
}
verificarError(elemento){
    return this.state.errores.indexOf(elemento) !==-1;//verificar si ese campo existe
}



enviarDatos = (e) => {
            e.preventDefault(); //detener todo lo que esta sucediendo, independiente de lo que fue enviado
            console.log("Formulario fue enviado...");

             const{nombre,correo}=this.state; //recuperar y hacer referencia
             console.log(nombre);
             console.log(correo); //imprimir en consola


        var errores=[];
        if(!nombre)errores.push("error_nombre");
        if(!correo)errores.push("error_correo");

        this.setState({errores:errores});
    if(errores.length>0) return false;




var datosEnviar={nombre:nombre, correo:correo}





fetch(Api + "?insertar=1", {
        method:"POST",
        body:JSON.stringify(datosEnviar)

}) //obtener los datos    
.then(respuesta=>respuesta.json())    
.then((datosRespuesta)=>{
      console.log(datosRespuesta);
      this.props.history.push("/"); //props regresar al enlace anterior     


})

.catch(console.log)
} //interaccion los datos del formulario


    render(){ 

        const{nombre,correo}=this.state; //recuperar y hacer referencia


        return ( 
            <div className="card">
                <div className="card-header">
                    Empleados
                </div>
                <div className="card-body"> 
                    <form onSubmit= {this.enviarDatos} >  
            <div className="form-group">
            <label htmlFor="">Nombre: </label>
            <input type="text" required name="nombre" id="nombre" onChange={this.cambioValor} value={nombre} className={ ((this.verificarError("error_nombre"))?"is-invalid":"")+  " form-control"} placeholder="" aria-describedby="helpId" />
            <small id="helpId" className="invalid-feedback">Escribe el nombre del empleado</small>
                        </div>

                        <div className="form-group">
            <label htmlFor="">Correo: </label>
            <input type="text" required name="correo" id="correo" onChange={this.cambioValor}  className={((this.verificarError("error_correo"))?"is-invalid":"")+  " form-control"}  placeholder="" aria-describedby="helpId" value={correo} />
            <small id="helpId" className="invalid-feedback">Escribe el correo del empleado</small>
                        </div>

                <div className="btn-group" role="group" aria-label="">

                    <button type="submit" className="btn btn-success">Agregar nuevo empleado</button>
                    <Link to={"/"} className="btn btn-danger">Cancelar</Link>

                </div>


                    </form>
                    
                </div>
                <div className="card-footer text-muted">
                   
                </div>
            </div>
         );
    }
}
 
export default Crear;