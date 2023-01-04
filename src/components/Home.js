import React from 'react'
import Notes from './Notes'

export default function Home(props) {
    const {SetAlert} = props;

    return (
        <div>
            <Notes SetAlert={SetAlert}/>
        </div>

    )
}
