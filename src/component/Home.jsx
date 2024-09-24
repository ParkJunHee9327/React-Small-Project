import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ConsteMain from './ConsteMain';
import ConsteAdd from './ConsteAdd';
import ConsteModify from './ConsteModify';
import Administrator from './Administrator';
import LogIn from './LogIn';
import SignUp from './SignUp';

const Home = () => {
    return (
        <div className='Home'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ConsteMain />} />
                    <Route path='/main' element={<ConsteMain />} />
                    <Route path='/add' element={<ConsteAdd />} />
                    <Route path='/modify' element={<ConsteModify />} />
                    <Route path='/admin' element={<Administrator />} />
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/signup' element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Home;