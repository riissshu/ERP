import React from 'react'
import Layouts from './Layouts'

function DisplayLayout({children}) {
  return (
    <>
        <Layouts></Layouts>
        <div>{children}</div>
    </> 
  );
}

export default DisplayLayout
