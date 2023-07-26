import {useState} from 'react';
import "../App.css"
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Auth = ()=>{
    return(
        <div className="auth">
        <Login/>
        <Register/>
        </div>
    )
}

const Login = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", { username, password });
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }
    return(
        <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label={"Login"} style={"login"} handleSubmit={onSubmit}/>
    )
}


const Register = ({ setRegUsername, setRegPassword }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post("http://localhost:3001/auth/register", { username, password });
    } catch (error) {
        alert("Registration Successful");
        console.error(error);
      }
    };
  
    return (
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label={"Register"}
        style={"register"}
        handleSubmit={handleSubmit}
      />
    );
  };
  


const Form = ({username, setUsername, password, setPassword, label, style, handleSubmit})=>{

    return(<div className={style}>
        <form onSubmit={handleSubmit}>
        <h2>{label}</h2>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit'>{label}</button>
            </div>
        </form>
        </div>)
}