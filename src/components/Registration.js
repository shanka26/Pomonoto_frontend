import { Button, Grid, Link, TextField, Typography } from '@material-ui/core'
import { Box } from '@mui/system'
import {React, useEffect, useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Stack } from '@mui/material';
// import { useHistory } from 'react-router-dom';
import useAxios from '../utils/useAxios'
 

const Registration = () => {



  let [username,setUsername]= useState("")
  let [password,setPassword]= useState("")
  let [password2,setPassword2]= useState("")
  let  backend = useAxios()

  useEffect(() => {
    // getSession();
  },[])


  let navigate = useNavigate(); 


  let handlePasswordChange = (event) => {
    // this.setState({password: event.target.value});
    setPassword(event.target.value);
  }
  let handlePassword2Change = (event) => {
    // this.setState({password: event.target.value});
    setPassword2(event.target.value);
  }

  let handleUsernameChange = (event) => {
    // this.setState({username: event.target.value});
    setUsername(event.target.value);
  }


  

  let notePost=()=>{
    backend
  .post(`user/notes/`, {
            
    // 'Content-Type': 'application/json',
    Authorization: 'Bearer ' +String(localStorage.getItem('access_token')),
    email:username,
    note: " ",

  })
  .then((res) => {
    if(res.status===200){
                let obj= JSON.parse(localStorage.getItem('user'))
                localStorage.setItem('note'," ")
            }
  })};



	const handleSubmit = (e) => {
		// e.preventDefault();
		backend
			.post(`user/register/`, {
        
				email: username,
				password: password,
        password2: password2
			})
			.then((res) => {
        if(res.status === 201){
          notePost()
        }
        
				navigate('/');
				console.log(res);
				console.log(res.data);
			})};



  let registerPlease = async()=>{
    let respone = await fetch(`https://pomonoto-api.herokuapp.com/user/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify({email: username,
				password: password,
        password2: password2})
      
    });
    notePost()
    navigate('/login')


  }




  
      
  
  return (
    <Box alignItems='center' sx={{display:'flex' ,width:'100%',height:'100%', justifyContent: 'center', alignItems: 'flex_start'}}>
      <Box alignItems='center'  sx={{width:600,height:650, marginTop:{xs:4,lg:8,xl:12}, marginLeft:{xs:2,sm:8,lg:12},marginRight:{xs:2,sm:8,lg:12}, padding:2, backgroundColor:'#b2dfdb', borderRadius:3,alignItems:'center',justifyContent: 'center'}}>

        <Box mt={8}>
          
        <Box justifyContent='center' alignItems='center' sx={{display: 'flex',marginBottom:4}}>
          <Stack alignItems='center' spacing={1}>
            <LockOutlinedIcon/>
            <Typography variant="h5" >Sign up</Typography>
          </Stack>
          
        </Box>
        
        <Stack spacing={2} justifyContent='center' sx={{  marginLeft:{xs:1,sm:4,lg:8},marginRight:{xs:1,sm:4,lg:8},marginBottom:4 }}>
          
          
          
          <TextField required name="email" label="Email" variant="outlined" placeholder="Email" value={username} onChange={handleUsernameChange}/>
          
          <TextField required variant="outlined" name="password" type='password' label="Password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
          <TextField required variant="outlined" name="password2" type='password' label="Repeat password" placeholder="Repeat password" value={password2} onChange={handlePassword2Change}/>        
          <Button variant="contained" color='primary' onClick={registerPlease}>Create account</Button>
          
        </Stack>
          
          <Box>
            <Grid container item xs={12} justifyContent='center'>
              <Typography variant="p">Already have an account?</Typography>
            </Grid>

            <Grid container justifyContent='center' xs={12}>
              <Link component={NavLink} to="/login" >Sign in here</Link>
            </Grid>
          </Box>
      
            
          </Box>
      </Box>

      


    </Box>
    
  )
}

export default Registration