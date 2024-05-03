import React, { useContext, useEffect, useState } from 'react'
import { Home } from '../Pages/Home/Home'
import { Navigate, Route, Routes, json, useNavigate } from 'react-router-dom'
import { LogIn } from '../Pages/LogIn/LogIn'
import { SignIn } from '../Pages/SignIn/SignIn'
import { ShoppingHistory } from '../Pages/ShoppingHistory/ShoppingHistory'
import { Cart } from '../Pages/Cart/Cart'


export const RoutesApp = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem('user_token');
        setIsLoggedIn(user !== null);

        if (isLoggedIn) {
            navigate('/home');
        }else{
            navigate('/');
        }
    }, [isLoggedIn]);


    return (
        <Routes>

            {
                <>
                    <Route path="/home" element={<Home />} />
                    <Route path="/shoppingHistory" element={<ShoppingHistory />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/" element={<LogIn />} />
                    <Route path="/signIn" element={<SignIn />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </>
            }

        </Routes>
    )
}
