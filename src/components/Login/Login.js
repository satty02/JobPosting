// this components having admin login component and instructor login component

import React, {useState} from 'react'
import AdminLogin from './AdminLogin'
import CandidateLogin from './CandidateLogin';
import AdminRegister from '../Register/AdminRegister';
import CandidateRegister from '../Register/CandidateRegister'

function Login() {
    const [adminLogin, setAdminLogin] = useState(false);
    const [candidateLogin, setCandidateLogin] = useState(false);
    const [adminRegister, setAdminRegister] = useState(false);
    const [candidateRegister, setCandidateRegister] = useState(false);


    const handleAdmin = () => {
        setAdminLogin(true);
        setCandidateLogin(false);
        setAdminRegister(false)
        setCandidateRegister(false)
    };
    const handleCandidate = () => {
        setAdminLogin(false);
        setCandidateLogin(true);
        setAdminRegister(false)
        setCandidateRegister(false)
    }
    const handleAdminRegister = () => {
        setAdminLogin(false);
        setCandidateLogin(false);
        setAdminRegister(true)
        setCandidateRegister(false)
    }

    const handleCandidateRegister =()=>{
        setAdminLogin(false);
        setCandidateLogin(false);
        setAdminRegister(false)
        setCandidateRegister(true)
    }

    return (
        <>
            <div className='flex flex-col w-full bg-blue-50 items-center gap-2'>
                <div className=' content-center items-center text-2xl bg-slate-300 p-2 m-5 rounded-lg'>Job Posting WebApplication</div>
                <div className='flex flex-row justify-center align-middle items-center'>
                    <button className='bg-blue-500 p-1 px-2 rounded-md mt-5 ml-2'
                        onClick={handleAdmin}>Admin Login</button>
                    <button className='bg-blue-500 p-1 px-2 rounded-md mt-5 ml-2'
                        onClick={handleCandidate}>CandidateLogin</button>
                    <button className='bg-blue-500 p-1 px-2 rounded-md mt-5 ml-2'
                        onClick={handleAdminRegister}>Admin Registration</button>
                    <button className='bg-blue-500 p-1 px-2 rounded-md mt-5 ml-2'
                        onClick={handleCandidateRegister}>Candidate Registration</button>
                </div>
                <div> {
                    adminLogin && <AdminLogin/>
                }
                    {
                    candidateLogin && <CandidateLogin/>
                } 
                {
                    adminRegister && <AdminRegister/>
                }
                {
                    candidateRegister && <CandidateRegister/>
                }
                
                </div>

            </div>


        </>
    )
}

export default Login
