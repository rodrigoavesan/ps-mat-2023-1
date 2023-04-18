import React from 'react'
import {Link} from 'react-router-dom'

export default function Home(){
    return(
        <>
            <h1>Página de Inicial</h1>
            <p>Ir para a <Link to="/login">Página de login</Link>.</p> 
        </>
    )
}