import { useEffect, useState } from 'react';
import jst_decode from "jwt-decode"
import Dashboard from './Dashboard';


function LandingPage() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWr ID token" + response.credential);
    var userObject = jst_decode(response.credential)
    console.log(userObject);
    setUser(userObject)
    document.getElementById("signInDiv").hidden = true
    
    console.log('Signed in');

  }

  function handleSignOut (event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id : "1015448099214-b7orlcan6srq2763cidi5tmukhpaoa0k.apps.googleusercontent.com",
      callback : handleCallbackResponse
      

    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme : "outline", size : "medium"}
    )
    

      google.accounts.id.prompt()

  },[])


  return (

    <div className='landing-page-container'>

      <div id='signInDiv'></div>
       { Object.keys(user).length != 0 && 
        <button className='btn btn-danger' onClick={(e) => handleSignOut(e)}> Sign out </button>
       }

      
      { user && 
      <div> 
        <img src= {user.picture} /> 
        <h3> {user.name} </h3>
      </div>
      
      }
      {/* <button className='btn btn-primary' id='signInDiv'> Join Now</button> */}
      

      {/* Modal */}
      
      {/* <div class="modal-dialog modal-dialog-scrollable">
        ...
      </div> */}


      
    </div>
  );
}

export default LandingPage;
