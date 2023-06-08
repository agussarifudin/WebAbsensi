import { TextField,Grid ,Button, Card} from '@mui/material'
import React,{useState,useEffect} from 'react'
import Container from '@mui/material/Container';
import { auth } from '../config/firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import {  signInWithEmailAndPassword   } from 'firebase/auth';

const Login = () => {
  const [date, setDate] = useState(new Date()); 
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function refreshClock() { 
      setDate(new Date()); 
    }
    useEffect(() => { 
      const timerId = setInterval(refreshClock, 1000); 
     
    }, []);
    const onLogin = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          navigate("/home")
          
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
      });
     
      {localStorage.getItem("name")?localStorage.setItem("absen",localStorage.getItem("absen")):localStorage.setItem("absen","true")}

  }
  return (
  <Container maxWidth="xs">
    

 <Card style={{width:300,paddingLeft:20,paddingBottom:20,paddingRight:20}}>
        
      
         
        <h1 style={{textAlign:"center"}}>LOGIN ABSENSI</h1>
        <h1 style={{textAlign:"center"}}>{date.toLocaleTimeString()}</h1>
        <form>
<TextField fullWidth margin="dense"variant="outlined" label="Email" required    onChange={(e)=>setEmail(e.target.value)}/>
<TextField fullWidth margin="dense"variant="outlined"label="Password" required  onChange={(e)=>setPassword(e.target.value)}/>
<Button fullWidth margin="dense"variant="contained"  onClick={onLogin}           >Login</Button>
</form>



</Card>

</Container>


  )
}

export default Login