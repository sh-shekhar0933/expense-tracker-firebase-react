import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransactions";
import { useGetTransactions } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import "./styles.css";


export const ExpenseTracker=()=>{
  const {addTransaction}=useAddTransaction();
 const {transactions}=useGetTransactions();

 const {name,profilePhoto}=useGetUserInfo();
const navigate=useNavigate();
  const [description,setDescription]=useState("");
  const [transactionAmount,setTransactionAmount]=useState(0);
  const [transactionType,setTransactionType]=useState('expense');

  const onSubmit=async (e)=>{
    e.preventDefault();
    addTransaction({description,transactionAmount,transactionType});
 
  }

  

  const signUserOut=async()=>{
  try{
    await signOut(auth);
    localStorage.clear();
    navigate("/")
  
  }
  catch(e){
    console.error(e);
  }


  }

  let income=0;
  let expense=0;
  let balance=0;

  transactions.map((trans)=>{
   
    if (trans.transactionType==='expense'){
        expense+=parseFloat(trans.transactionAmount);
        balance-=parseFloat(trans.transactionAmount);
    }
    else {
        income+=parseFloat(trans.transactionAmount);
        balance+=parseFloat(trans.transactionAmount);
    }
  })
    return (
    <>
    <div className="expense-tracker mx-[200px] " >

    <div className="container">
        <h1 > { name }'s Expense Tracker</h1>
        <div className="balance">
            <h3>Your Balance</h3>
            {balance>=0? <h2>${balance}</h2>:<h2>-${-balance}</h2>}
            
        </div>
        <div className="summary">
            <div className="income">
             <h4>Income</h4>
             <p>${income}</p>
            </div>
            <div className="expenses">
            <h4>Expenses</h4>
            <p>${expense}</p>
            </div>
        </div>

        <form className="add-transaction" onSubmit={onSubmit}>
            <input type="text" placeholder="Description" required onChange={(e)=>setDescription(e.target.value)}/>
            <input type="number" placeholder="Amount" required onChange={(e)=>setTransactionAmount(e.target.value)}/>
            <input type="radio" id="expense" value="expense" checked={transactionType==="expense"} onChange={(e)=>setTransactionType(e.target.value)}/>
            <label htmlFor="expense">Expense</label>
            <input type="radio" id="income" value="income" checked={transactionType==="income"} onChange={(e)=>setTransactionType(e.target.value)}/>
            <label htmlFor="income">Income</label>
            <button type="Submit">Add Transaction</button>
        </form>
    </div>

   {profilePhoto&&<div className="profile my-[20px]"><img className="profile-photo" src={profilePhoto}/>
   <button className="sign-out-button" onClick={signUserOut}>Sign Out</button>
   </div>}
    </div>

    <div className="transactions text-center text-xl shadow-2xl w-[900px]">
        <h3 className="font-bold text-3xl my-[40px]">Transactions</h3>
        <ul>{transactions.map((trans)=>{
            const {description,transactionAmount,transactionType}=trans;
            return (
                <li><h4 className="font-bold text-xl">{description}</h4>
                <p className={"text-"+(transactionType==="expense"? "red":"green")+"-500"}>${transactionAmount}</p></li>
            )
        })}</ul>
    </div>
    </>


    
    );

}