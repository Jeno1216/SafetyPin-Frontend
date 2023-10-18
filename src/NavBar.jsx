import React from 'react'
import myImage from './assets/logo.png'; // Import the image

function NavBar() {
  return (
    <>
    <div className='w-100 d-flex justify-content-between align-items-center  gap-3' style={{height: '70px'}}>

        <div className=' d-flex p-3'>
        <img src={myImage} alt="" style={{width: '150px'}} />
        </div>

        <div className='d-flex  h-100 justify-content-center align-items-center gap-4 p-3'>

        <div className='' >
        <a href="#" style={{textDecoration: 'none', color: 'black'}}>Route</a>
        </div>

        <div>
        <a href="#" style={{textDecoration: 'none', color: 'black'}} >Heatmap</a>
        </div>
        </div>

    </div>
    </>
  )
}

export default NavBar