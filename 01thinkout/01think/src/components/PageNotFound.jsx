import React from 'react'
import anim from '../images/no.gif'
import '../notFound.css'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'
export default function PageNotFound() {
    const navigate= useNavigate()
  return (
    <>
<div className="cover">
        <div className='allinnotfound'>
        <h1 className="firstText">
        I'm sorry to break your heart Luv...
        </h1>
        <br />
        <h6>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat vitae culpa voluptate accusantium excepturi provident illo alias nesciunt doloremque harum at aperiam, voluptates tempora! At laborum nobis distinctio expedita earum.
        Nostrum eveniet debitis magni. Sequi ipsam modi quibusdam quo nesciunt vitae autem iste enim. Libero at amet ducimus accusantium placeat ullam vel dolor, accusamus repellat, sunt, eos unde quia dolore?
        Cum nesciunt distinctio consectetur ipsum mollitia dolore? Aperiam doloribus alias in voluptatem, excepturi sed nam deserunt, quisquam, quam asperiores aliquam assumenda sint doloremque illo dolor praesentium quidem tempore culpa suscipit.
        </h6>
        <br /><br /><br />
        <h2>
        All you read in conclusion is...
        </h2><br />
        <h1>
        You're lost in the Krusty Krab, find the secret ingredient or go back to the <button className='btn btn-dark col-lg-3' onClick={()=>{navigate('/')}}>Homepage</button></h1>
        </div>
</div>
    
    </>

  )
}

