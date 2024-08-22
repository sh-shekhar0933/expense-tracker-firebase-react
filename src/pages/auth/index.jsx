import { signInWithPopup } from "firebase/auth";
import { auth ,provider} from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useEffect } from "react";





export const Auth=()=>{

    let navigate=useNavigate();

    const {isAuth}=useGetUserInfo();

  const signInwithGoogle=async ()=>{
   const result=await signInWithPopup(auth,provider);
   const authInfo={
    userID:result.user.uid,
    name:result.user.displayName,
    profilePhoto:result.user.photoURL,
    isAuth:true,

   }
   

   localStorage.setItem("auth",JSON.stringify(authInfo));
   navigate("/expense-tracker");

  }

  useEffect(()=>{
    if (isAuth){
      navigate("/expense-tracker");
    }
  })
    return (<div className="login-page">
    <p> Sign In with google to continue</p>
    <button className="login-with-google-btn text-black font-bold m-[40px]" onClick={signInwithGoogle}>Sign IN</button> </div>
    );
}