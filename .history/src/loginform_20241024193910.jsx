



import React ,{useState} from 'react';
import axios from "axios";








const Loginform=()=>{
    const [email,setemail]=useState('');
    const [errormessage,seterrormessage]=useState('');
    const [successmessage,setsuccessmessage]=useState('');
    const [password,setpassword]=useState('');



    const handlesubmit=async(e)=>{
        e.preventDefault();
        seterrormessage('');
        setsuccessmessage('');

    try{
        console.log("Sending files to backend...");
        // const apiUrl = import.meta.env.VITE_BACKEND_URL;

          const res=await axios.post('http://localhost:5003/login',{email,password},{
              headers:{
                'Content-Type': 'application/json',
              }
          });
          console.log('register response',res.data)

          if(res.status === 200){
            setsuccessmessage('user register successfully');
          }else{
seterrormessage('failed to connect the server');
          }

}catch(error){
    seterrormessage('failed to connect the server');
    console.log('error for the login form',error);
}


    }


return (
    <div>
        <h1>Login</h1>
        {errormessage&&<p style={{color:'red'}}>{errormessage}</p>}
        {successmessage&&<p style={{color:'green'}}>{successmessage}</p>}
        <form onSubmit={handlesubmit}>

     


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
            <button type="submit">Register</button>
        </form>
    </div>
)
    
}

export default Loginform;