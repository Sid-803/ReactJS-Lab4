import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddDataForm from './component/AddDataForm';
import DisplayData from './component/DisplayData';
import Headers from './component/ListHeaders';
const App=()=>{
    return(
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<DisplayData/>} />
                <Route path="/add" element={<AddDataForm onTrue={undefined} onClose={undefined}/>} />
            </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
