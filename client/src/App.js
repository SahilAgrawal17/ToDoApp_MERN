import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Login from './components/Login';
import Notes from './components/Notes';

function App() {
  const [isLogin, setIsLogin] = useState(false)

useEffect(()=>{
  const checklogin = async () =>{
    const token = localStorage.getItem('tokenStore')
    console.log(token)
    if(token){
      const verified = await axios.get('http://localhost:5000/user/verify', {
        headers:{Authorization: token}
      })
      setIsLogin(verified.data)
      if(verified.data === false) return localStorage.clear()
    } else{
      setIsLogin(false)
    }
  }
  checklogin()
}, [])

  return (
    <div className="App">
      {
        isLogin ? <Notes setIsLogin={setIsLogin}/>
         : <Login setIsLogin={setIsLogin}/>
      }
    </div>
  );
}

export default App;
