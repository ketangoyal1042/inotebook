import React from 'react'

export default function Alert(props) {
   const Alerrwarn = (warn)=>{
    if (warn==="danger") {
        return "Warning";
    }
    else{
        return "Success";
    }
   }
  return (
    
    props.Alert && <div className={`alert alert-${props.Alert.Type}`} role="alert">
    <b>{Alerrwarn(props.Alert.Type)}!</b>  {props.Alert.Message}
    </div>
  )
}
