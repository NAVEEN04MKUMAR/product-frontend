



import React ,{useState,useEffect} from 'react';
import axios from "axios";



const Userdetails=()=>{
    // const [username,setusername]=useState('');
    // const [email,setemail]=useState('');
    const [userinfo,setuserinfo]=useState({email:'',username:''});
    const [errormessage,seterrormessage]=useState('');
    const [successmessage,setsuccessmessage]=useState('');
    const [token,settoken]=useState(null);


    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            settoken(savedToken);
            console.log('Token retrieved from local storage:', savedToken);
        }
    }, []);



    useEffect(() => {
        console.log("Fetching user details...");
        // Fetch user details on component mount
        if (token) {
            console.log("Sending files to backend...");

          axios
            .get('http://localhost:5003/userdetails', {
              headers: { Authorization: token },
            })
            .then((res) => {
              setuserinfo(res.data);
              console.log('Fetched user info:', res.data);
            })
            .catch((err) => {
                seterrormessage('Failed to load user info');
                console.error('Error fetching user info:', err);
            });
        }
      }, [token]);

      const handleinputchange = (e) => {
        const { name, value } = e.target;
        console.log(`Input changed - Name: ${name}, Value: ${value}`);
        setuserinfo({ ...userinfo, [name]: value });
      };


    const handlesubmit=async(e)=>{
        e.preventDefault();
        seterrormessage('');
        setsuccessmessage('');

    try{console.log("Submitting user details...", userinfo);
        console.log("Sending files to backend...");
        // const apiUrl = import.meta.env.VITE_BACKEND_URL;

          const res=await axios.put('https://form-backend-pagn.onrender.com/modifydetails',userinfo,{
            headers: { Authorization: token },
          });
          console.log('modiyu user details response',res.data)

          if(res.status === 200){
            setsuccessmessage('user modified successfully');
          }else{
seterrormessage('failed to connect the server');
          }

}catch(error){
    seterrormessage('failed to connect the server');
    console.log('error for the modify the user details form',error);
}


    }


return (
    <div>
        <h1>Modify user details</h1>
        {errormessage&&<p style={{color:'red'}}>{errormessage}</p>}
        {successmessage&&<p style={{color:'green'}}>{successmessage}</p>}
        <form onSubmit={handlesubmit}>

    

            <div>
                <label>Email:</label>
                <input type="email"
                name="email"
                value={userinfo.email}
                onChange={ handleinputchange }
                required
                />
            </div>

            <div>
                <label>username:</label>
                <input type="text"
                name="username"
                value={userinfo.username}
                onChange={ handleinputchange }
                required
                />
            </div>
            <button type="submit">Modify user details</button>
        </form>
    </div>
)
    
}

export default Userdetails;