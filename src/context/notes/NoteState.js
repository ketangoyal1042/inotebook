import React, { useState } from "react"
import NoteContext from "./noteContext"

export default function NoteState(props){
    const s1 = {
        "name": "Ketan",
        "Class": "12"
    }

    const [state, setState] = useState(s1);
    const update = ()=>{
        console.log("fdsgdfg");
        setTimeout(() => {
            setState({
                "name": "wds",
                "Class": "sdsd12"
            });
        }, 1000);
    }

    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}