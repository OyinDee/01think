
import './App.css';
import './flex-slider.css'
import './bootstrap.min.css'
import './font-awesome.css'
import './templatemo-softy-pinko.css'
import { trackPromise } from 'react-promise-tracker';
import {useSelector, useDispatch} from "react-redux"
import {Routes, Route, useNavigate , Router, Link} from "react-router-dom"
import axios from 'axios'
import  {useEffect, useState, useRef} from 'react'
import Home from './components/Home'
import Chat from './components/Chatbox'
import Signup from './components/Signup'
import Login from './components/Login'
import IdeaContainer from './components/IdeaComponent'
import Homepage from './components/Homepage'
import TBA from './components/ToBeApproved'
import DevHome from './components/DevHome';
import socketClient from "socket.io-client";
import Profile from './components/myProfile';
import TheProfile from './components/EditProfile';
import PageNotFound from './components/PageNotFound';
function App() {
  const endpoint = "https://newsapp-dpv1.onrender.com/";
  const socket = useRef(socketClient(endpoint));
  useEffect(() => {
    axios.get('https://fonts.googleapis.com/css?family=Raleway:100,300,400,500,700,900', (response)=>{
      console.log(response)
    })
  }, [])
  const dispatch = useDispatch()
  // console.log(socket)
  return (
<>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/thinkers/home" element={<Homepage/>}/>
<Route path="/developers/home" element={<DevHome/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/onlyadmin/*" element={<TBA/>}/>
<Route path='/profile' element={<Profile/>}/>
<Route path='/editprofile' element={<TheProfile/>}/>
<Route path="/chat" element={<Chat socket={socket}/>}/>
<Route path="*" element={<PageNotFound/>} />
</Routes>
</>
  );
}

export default App;
