import Router from "next/router";
import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router';
import AppContext from "../../../components/context";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mighty-book-0c254df7cc.strapiapp.com";

const GoogleLogin = () => {
  const [ statusText, setStatusText ] = useState();
  const { setCurrentUser, setViewMode } = useContext(AppContext)
  const router = useRouter();            
  
  useEffect(() => {
    const accessToken = router.query['access_token'];
    
    if (!accessToken) return;

    // Successfully logged with the provider        
    fetch(`${API_URL}/api/auth/google/callback?access_token=${encodeURIComponent(accessToken)}`)
      .then(res => {
        if (res.status !== 200) {
          setStatusText('Could not log in')
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {        
        console.log(res);

        localStorage.setItem('jwt', res.jwt);        
        localStorage.setItem('username', res.user.username);
        setCurrentUser(res.user.username);
        setViewMode("restaurant");
        setStatusText(`You have been successfully logged in as ${res.user.username}. You will be redirected in a few seconds...`);
        setTimeout(() => router.push('/'), 3000); // Redirect to homepage after 3 sec
      })
      .catch(err => {
        console.log(err);        
      });      
  }, [router]);
  
  return (
    <div className="card mb-3 forms">
      <h1 className="card-header">{statusText}</h1>
        <div className="card-body">
          {<>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => Router.push('/')}
            >Start Shopping</button>
            <br></br>
            <br></br>
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={() => Router.push('/login')}
            >Log Out</button>
          </> }
        </div>
    </div>  
  )
};

  export default GoogleLogin;