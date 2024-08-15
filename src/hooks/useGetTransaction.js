import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { query,collection,where,orderBy, onSnapshot} from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo"; 

export const useGetTransactions=()=>{
     const [transactions,setTransactions]=useState([]);
     const transactionCollectionRef=collection(db,"Transactions");
     const {userID}=useGetUserInfo();
     const getTransactions=async()=>{
 let unsubsribe;
      try{
      const queryTrans=query(transactionCollectionRef,where("userID","==",userID),
      orderBy("createdAt"))

     unsubsribe= onSnapshot(queryTrans,(snapshot)=>{
        let docs=[]
        snapshot.forEach((doc)=>{
          const data =doc.data();
          const id=doc.id;
           docs.push({...data,id})

        })
        setTransactions(docs);
      })
      } catch (e){
        console.error(e)
      }
      return ()=>unsubsribe();
     }

     useEffect(()=>{
        getTransactions()
     },[])

    return {transactions}
}