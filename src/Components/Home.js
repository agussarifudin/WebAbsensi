import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { Paper,Button, Tab } from '@mui/material';
import firebase from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import {collection,getDocs,addDoc} from 'firebase/firestore'
import Karyawan from './Karyawan';
import Swal from "sweetalert2"

const Home = () => {

    const [newName,setNewName]=useState('')
    const [newJabatan,setNewJabatan]=useState('')
    const [email,setEmail]=useState('')
    const [users,setUsers]=useState([])
    const [nip,setNip]=useState()
    const [name,setName]=useState('')
    const [jabatan,setJabatan]=useState('')
    const usersCollectionRef = collection(db,'users')
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
   
  
    const createUser= async (keterlambatan)=>{
        localStorage.setItem("absen","false");
        const jam = date.getHours()
        const menit = date.getMinutes()
        const waktu = `${jam}:${menit}`
       localStorage.setItem("kehadiran",waktu)
       localStorage.setItem("keterlambatan",keterlambatan)
       localStorage.setItem("progress",name)

Swal.fire(
    `Selamat ${name}`,
    `Kehadiranmu Sudah Tercatat pada  ${jam}:${menit} keterlambatan ${keterlambatan}`,
    'success'
  )
        
    }
    function refreshClock() { 
        setDate(new Date()); 
      }
    useEffect(()=>{

        const timerId = setInterval(refreshClock, 1000); 
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
            if (user) {
                // ...your code to handle authenticated users. 
                const getUsers = async()=>{
                    const data = await getDocs(usersCollectionRef);
                    setUsers(data.docs.map((doc)=>({...doc.data()})))
                }
                getUsers()
                const before_ = user.multiFactor.user.email.substring(0, user.multiFactor.user.email.indexOf('@'));
                setEmail(user.multiFactor.user.email)
                if(user.multiFactor.user.email==="admin@demo.com"){
                    setNip(322312)
                    const before_ = user.multiFactor.user.email.substring(0, user.multiFactor.user.email.indexOf('@'));
                    setName(before_)
                    setJabatan("Backend")
                    localStorage.setItem("name",before_)
                    
                }else{
                    setNip(992233)
                    const before_ = user.multiFactor.user.email.substring(0, user.multiFactor.user.email.indexOf('@'));
                    setName(before_)
                    setJabatan("Backend")
                    localStorage.setItem("name",before_)
                } 
              
            } else {
                navigate("/login");
                console.log("dsdasa")
            }
        });
        return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting.
    }, [])

    
    const handleLogout = () => {   
                   
        firebase.auth().signOut();
    }

    const handlePulang = async (pulang_cepat,lembur)=>{
        Swal.fire({
            title: 'Apa Anda yakin ?',
            text: "Data akan dikirim dan tidak bisa di ubah",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Saya ingin pulang'
          }).then(async (result) => {
            if (result.isConfirmed) {
                localStorage.setItem("absen","true")
                const jam = date.getHours()
                const menit = date.getMinutes()
                const jam_pulang = `${jam}:${menit}`
                await addDoc(usersCollectionRef,{nip:nip,name: name, jabatan: "Backend",waktu:localStorage.getItem("kehadiran"),pulang:jam_pulang,keterlambatan:localStorage.getItem("keterlambatan"),pulang_cepat:pulang_cepat,lembur:lembur})
             
                    
                  Swal.fire({
                    title: `Selamat ${name}`,
                    text: `Kepulanganmu sudah tercatat pada ${jam}:${menit}, lembur ${lembur} menit`,
                    icon:    'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if (result.isConfirmed) {
                       
                        window.location.reload(true)
                    }
                  })
                  
            }
          })
       
    }
  return (
    <Container>
        <Paper style={{textAlign:"right",paddingTop:20}}>
        <Button onClick={handleLogout} variant='contained'>Logout</Button>

            <h1 style={{fontSize:"100%",textAlign:"center"}} >Selamat Datang {email}</h1>
           <h4 style={{textAlign:"center"}}>Jam kerja 08:00 - 17:00</h4>
            <h1 style={{textAlign:"center"}}>{date.toLocaleTimeString()}</h1>
            <div className='app'>

            {/* <input placeholder='Name....' onChange={(event)=>{setNewName(event.target.value)}}/>
            <input placeholder='Jabatan...' onChange={(event)=>{setNewJabatan(event.target.value)}}/>
            <button onClick={createUser}>Create User</button> */}

            {/* {users.map((user)=>{return(<div>
                <h1>Name : {user.name}</h1>
                <h1>Jabatan : {user.jabatan}</h1>
            </div>)})} */}
        </div>
        <div style={{textAlign:"center",paddingBottom:20}}>


{localStorage.getItem("name")===localStorage.getItem("progress")?
localStorage.getItem("absen")==="true"? <Button variant='contained' onClick={()=>createUser(
    date.getHours()>=8>0?(((date.getHours()-8)*60)+date.getMinutes()):0
    )}>ABSEN SEKARANG</Button>
    :
    <Button variant="outlined" color="error" onClick={()=>handlePulang(
    date.getHours()<=17&&date.getHours()>=8?(((17-date.getHours())*60)+date.getMinutes()):0,
    date.getHours()>=17?(((date.getHours()-17)*60)+date.getMinutes()):0
    )}>
        PULANG ?
    </Button> 
    : 
    <Button variant='contained' onClick={()=>createUser(
        date.getHours()>=8>0?(((date.getHours()-8)*60)+date.getMinutes()):0
        )}>ABSEN SEKARANG</Button>
    }


       
        </div>
        
                <Karyawan users= {users} />
                
       </Paper>
    </Container>
  )
}

export default Home