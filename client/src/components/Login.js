import axios from "axios";
import React, {useState} from "react";

export default function Login({setIsLogin}){
    const [user, setUser] = useState({ username: '', email: '', password: ''})
    const [err, setErr] = useState('')

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({...user, [name]:value})
        setErr('')
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/user/login', {
                username: user.username,
                password: user.password
            })
            setUser({email:'', username:'', password: ''})
            localStorage.setItem('tokenStore', res.data.token)
            setIsLogin(true)
        } catch (err) {
            console.log(err.message)
        }        
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/user/register', {
                username: user.username,
                email: user.email,
                password: user.password
            })
            setUser({email:'', username:'', password: ''})
            setErr(res.data.message)
        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }
    }

    const loginPage = () =>{
        document.getElementById('login').style.display='flex';
        document.getElementById('register').style.display='none';
    }

    const registerPage = () =>{
        document.getElementById('login').style.display='none';
        document.getElementById('register').style.display='flex';
    }

    return (
        <section>
            <div className="login" id="login">
                <h1>To Do App</h1>
                <h2>Login</h2>
                <form onSubmit={loginSubmit}>
                    <input type="text" name="username" id="login-username" placeholder="Username" required
                    value={user.username} onChange={onChangeInput}/>

                    <input type="password" name="password" id="login-password" placeholder="Password" required
                    value={user.password} autoComplete="true" onChange={onChangeInput}/>

                    <button type="submit">Login</button>
                    <p>Don't have an account?
                         Register an account <span onClick={registerPage}>here </span>
                    </p>
                    <h3>{err}</h3>
                </form>
            </div>
            <div className="register" id="register">
            <h1>To Do App</h1>
            <h2>Register</h2>
                <form onSubmit={registerSubmit}>
                    <input type="email" name="email" id="register-email" placeholder="Your Email Id" required
                    value={user.email} onChange={onChangeInput}/>

                    <input type="text" name="username" id="register-username" placeholder="Username" required
                    value={user.username} onChange={onChangeInput}/>

                    <input type="password" name="password" id="register-password" placeholder="Password" required
                    value={user.password} autoComplete="true" onChange={onChangeInput}/>

                    <button type="submit">Register</button>
                    <p className="here">Already have an account? 
                         Login <span onClick={loginPage}> here </span>
                    </p>
                    <h3>{err}</h3>
                </form>
            </div>
        </section>
    )
}