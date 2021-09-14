import React,{useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Profile} from './Profile/Profile'

import Getstart from './Getstart/Getstart'
import {Login} from './Login/Login'
import {Signin} from './Signin/Signin'

export const Page = ({colors}) => {
    const [userAuth, setUserAuth] = useState(false)
    localStorage.clear();
    return (
        <>
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Getstart colors={colors} />
                </Route>
                <Route path='/log-in'>
                    <Login colors={colors} setToken={setUserAuth} userAuth={userAuth}/>
                </Route>
                <Route path='/:userName'>
                    <Profile colors={colors} setToken={setUserAuth} auth={userAuth} />
            </Route>
            </Switch>
        </Router>

        </>
    )
}