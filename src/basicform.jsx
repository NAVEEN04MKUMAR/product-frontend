



import React ,{useState} from 'react';
import axios from "axios";



const Registerform=()=>{
    const [username,setusername]=useState('');
    const [email,setemail]=useState('');
    const [errormessage,seterrormessage]=useState('');
    const [successmessage,setsuccessmessage]=useState('');
    const [password,setpassword]=useState('');
    const [confirmpassword,setconfirmpassword]=useState('');



    const handlesubmit=async(e)=>{
        e.preventDefault();
        const newerrors={};
        seterrormessage('');
        setsuccessmessage('');


        if(!email.includes('@')){
            seterrormessage('invalid email format');
            return;
        }

        
        if(password.length<6){
            seterrormessage('password must be 6 letter long');
            return;
        }
        if(password!==confirmpassword){
            seterrormessage('given password and conform password did not match');
            return;
        }

    try{
        console.log("Sending files to backend...");
        // const apiUrl = import.meta.env.VITE_BACKEND_URL;

          const res=await axios.post('https://form-backend-pagn.onrender.com/register',{username,email,password,confirmpassword},{
              headers:{
                'Content-Type': 'application/json',
              }
          });
          console.log('register response',res.data)
           // Assuming the response contains a token
           const { token,username1,email1 } = res.data;
                
           localStorage.setItem('username', username1);
           localStorage.setItem('email', email1);


           // Store the token in local storage
           if (token) {
               localStorage.setItem('token', token);
               console.log('Token saved in local storage:', token);
           }

          if(res.status === 200){
            setsuccessmessage('user register successfully');
          }else{
seterrormessage('failed to connect the server');
          }

}catch(error){
    seterrormessage('failed to connect the server');
    console.log('error for the registration form',error);
}


    }


return (
    <div>
        <h1>Register</h1>
        {errormessage&&<p style={{color:'red'}}>{errormessage}</p>}
        {successmessage&&<p style={{color:'green'}}>{successmessage}</p>}
        <form onSubmit={handlesubmit}>

        <div>
                <label>Username:</label>
                <input type="text"
                value={username}
                onChange={(e)=>setusername(e.target.value)}
                required
                />
            </div>


            <div>
                <label>Email:</label>
                <input type="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                required
                />
            </div>

            <div>
                <label>password:</label>
                <input type="password"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                required
                />
            </div>

            <div>
                <label>confirmpassword:</label>
                <input type="password"
                value={confirmpassword}
                onChange={(e)=>setconfirmpassword(e.target.value)}
                required
                />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
)
    
}

export default Registerform;