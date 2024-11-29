import React, { Suspense, useState } from 'react'
import './App.css'
import Mfe from 'app2/App'
function App() {
  return (
         <Suspense fallback={"loading..."}>
<div style={{backgroundColor:"yellow", padding:"10px"}}>hello world 1</div>
   <Mfe/>
         </Suspense>
  )
}

export default App
