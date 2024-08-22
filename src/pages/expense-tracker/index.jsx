import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransactions";
import { useGetTransactions } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import NumberCounter from "../../components/NumberCounter";

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
    <div className="expense-tracker mx-auto  lg:w-[900px] md:w-[600px] sm:w-[300px]" >
  
    <div className="container">
     
        <h1 className="font-bold text-[40px]" > { name }'s Expense Tracker</h1>
        <div className="border-black border-2 p-7 border-opacity-10 rounded-3xl mt-[20px]">
        <div className="balance">
            <h3 className="text-lg font-bold">Your Balance🏦</h3>
            {balance>=0? <h2 className="text-3xl">${balance}</h2>:<h2>-${-balance}</h2>}
            
        </div>
        <div className="summary">
            <div className="income">
             <h4 className="text-green-700 text-lg font-bold">Income 💹</h4>
             
             {/* <p className="text-3xl">${income}</p> */}
             <NumberCounter start={0} end={income} duration={2000} />
            </div>
            <div className="expenses">
            <h4 className="text-red-500 text-lg font-bold">Expenses💸</h4>
            <NumberCounter start={0} end={expense} duration={2000} />
            </div>
        </div>
        </div>
        

        <form className="add-transaction my-[40px]" onSubmit={onSubmit}>
             <label for="desc" className="block  text-xl font-medium text-gray-900 ">Description</label><br/>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2" id="desc" placeholder="Description" required onChange={(e)=>setDescription(e.target.value)}/><br/>
            <label  for="amount" className="block text-xl font-medium text-gray-900 ">Amount</label><br/>
            <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 " id="amount" placeholder="Amount" required onChange={(e)=>setTransactionAmount(e.target.value)}/><br/>
            <input type="radio"  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2  my-[8px] " id="expense" value="expense" checked={transactionType==="expense"} onChange={(e)=>setTransactionType(e.target.value)}/>
            <label  htmlFor="expense" className="ms-2 text-sm font-medium text-gray-900  mx-[12px]">Expense</label>
            <input type="radio" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2 my-[8px]" id="income" value="income" checked={transactionType==="income"} onChange={(e)=>setTransactionType(e.target.value)}/>
            <label htmlFor="income" className="ms-2 text-sm font-medium text-gray-900  mx-[12px]">Income</label><br/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5" type="Submit">Add Transaction</button>
        </form>
    </div>

   {profilePhoto&&<div className="profile my-[20px]"><img className="profile-photo" src={profilePhoto}/>
   <button className="sign-out-button" onClick={signUserOut}>Sign Out</button>
   </div>}
    </div>

    <div className="transactions text-center text-xl shadow-[45px_15px_40px_45px_rgba(0,0,0,0.3)] lg:w-[900px] md:w-[600px] sm:w-[300px] rounded-lg overflow-y-scroll scrollbar-hide my-[80px] mx-auto ">
        <h3 className="font-bold text-3xl pt-[20px] mb-[40px] h-[80px] shadow-2xl  ">Transactions</h3>
        <ul class="grid lg:grid-cols-4 md:grid-cols:2 sm:grid-cols-1 gap-4 ">{transactions.map((trans)=>{
            const {description,transactionAmount,transactionType}=trans;
            return (
                <li className=" w-[200px] mx-auto my-5 rounded-lg h-[100px] shadow-[10px_10px_2px_2px_rgba(0,0,0,0.2)]"><h4 className="font-bold text-3xl">{description}</h4>
                <p className="mt-[32px]">${transactionAmount}</p></li>
            )
        })}</ul>
    </div>
    </>


    
    );

}