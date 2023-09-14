import React, {useState} from 'react';
// import axios from 'axios';
import off_eye from '../Login/asset/visibility_off.png';
import on_eye from '../Login/asset/remove_red_eye.png';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useUser } from '../../userData';

function CandidateLogin() {

    const {setUserData} = useUser();
    // to navigate to dashboard page after authenticating;

    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, SetShowPassword] = useState(false);
    const [message, setMessage] = useState(' ');
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [recoveryPassword, setRecoveryPassword] = useState('');
    const [errorRecovery , setErrorRecovery] = useState('');

    const [forgetPassword, setForgetPassword] = useState(false);

    const [errorMessage, setErrormessage] = useState('');
    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = {
            username: username,
            password: password
        }
        try {
            const response = await axios.post('http://localhost:8080/instructor/login', formData);

            if (response.status === 200) { // Login successful, you can handle the response here
                setUserData(response.data);
                setMessage('Login successful');
                setTimeout(() => {
                    navigate('/instructor')
                }, 3000)
            }
        } catch (error) { // Handle login error
            console.error(error)
            if (error.response) {
                setErrormessage(error.response.data.message); // Display the error message sent from the server
            } else {
                setMessage('An error occurred while logging in'); // Handle network or other errors
            }
        }
    }

    const handleEye = (e) => {
        e.preventDefault();
        SetShowPassword(!showPassword);
    };

    const handleForget =(e)=>{
        setRecoveryEmail('')
        setErrorRecovery('')
        setForgetPassword(!forgetPassword);
    };

    const handleRecovery = (e)=>{
        setRecoveryEmail(e.target.value);
    }

    const getPassword = async(e)=>{
        e.preventDefault();
        setErrorRecovery('')

        const sentEmail = await recoveryEmail;
        try {
            const response = await axios.get(`http://localhost:8080/candidate/find-candidate/${sentEmail}`);

            if (response.status === 200) { // Login successful, you can handle the response here
                setRecoveryPassword(response.data);
                setRecoveryEmail('');
            }
        } catch (error) {
            console.error(error)
            setErrorRecovery(error.response.data.message)
        }
        
    }

    return (
        <>
        <div className='flex'>
            <section class="main-container 2xl:w-full">
                {/* Login form */}
                <div class="form-container">
                    <div class=" rounded-[16px] p-[40px] gap-[16px] bg-[#FBFBFB] shadow-[0_1px_3px_0px_rgba(0,0,0,0.08)]">
                        <h1 class="sign-header font-inter">Candidate Login</h1>

                        <form onSubmit={handleLogin}>

                            {/*Email Input  */}
                            <div className={
                                `common-container pt-[12px] pb-0 px-[16px] ${
                                    errorMessage ? 'ring-[#E21E1E] ring-[2px]' : ''
                                }`
                            }>
                                <div className="relative bg-inherit ">
                                    <input type="text" id="username" name="username" className="peer  font-inter  w-[344px] text-[#000] placeholder-transparent"
                                        onChange={handleChange}
                                        value={username}
                                        placeholder="User name"
                                        required/>
                                    <label htmlFor="username"
                                        className={`common-label font-inter left-0 -top-2 text-[12px] text-[#ECECEC] bg-inherit peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-0 peer-focus:-top-2 peer-focus:text-[12px] peer-focus:h-[15px] transition-all`}>User name</label>
                                </div>
                            </div>


                            {/* Password Input */}
                            <div className={
                                `common-container ${
                                    errorMessage ? 'ring-[#E21E1E] ring-[2px]' : ''
                                }`
                            }>
                                <div className="relative bg-inherit ">
                                    <input type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="password"
                                        name="password"
                                        className=" font-inter peer  w-[316px] placeholder-transparent"
                                        placeholder="Password"
                                        onChange={handlePassword}
                                        value={password}
                                        required/>
                                    <label for="password"
                                        className={`common-label font-inter left-0 -top-2 text-[12px] text-[#ECECEC] bg-inherit peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-0 peer-focus:-top-2 peer-focus:text-[12px] peer-focus:h-[15px] transition-all`}>Password</label>
                                </div>
                                <button onClick={handleEye}
                                    className="relative w-[20px] h-[20px] mt-[-12px]  py-[10px] px-[10px]  overflow-hidden">
                                    <img src={
                                            showPassword ? on_eye : off_eye
                                        }
                                        alt="eye"
                                        className="absolute top-0 left-0 w-[20px] h-[20px] opacity-70 pointer-events-none"/>
                                </button>
                            </div>
                            <p className={`error-msg font-inter mt-[-15px] ${errorMessage?'text-red-500':'' || message?'text-green-500':''}`}>{errorMessage?errorMessage:null || message?message:null}</p>
                            


                            <button type="submit" class="w-full mt-[0px] bg-blue-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                        </form>
                            <div className="flex justify-end my-[16px]">
                                <button onClick={handleForget} className="font-inter leading-normal underline text-right text-[16px] font-medium text-[#000] opacity-[0.8999999761581421]">Forgot password?</button>
                            </div>
                    </div>
                </div>
            </section>
            <div>
            {
                forgetPassword && (
                    <div className='mt-[100px]'>
                        <label className='border p-2 m-2 bg-gray-200 rounded-lg'>Recover Password</label>
                        <input type='email' className='border p-2 m-2 bg-white rounded-lg' placeholder='Enter Email' onChange={handleRecovery} value={recoveryEmail} required/>
                        <button onClick={getPassword} type="submit" class="mt-[0px] bg-blue-700 text-white p-2 m-2 rounded-lg text-sm">get password</button>
                        <p className='border text-center bg-white m-2 p-2 rounded-lg'>Password is : {recoveryPassword.password}</p>
                        <p className='border text-center bg-white m-2 p-2 rounded-lg text-red-500'>{errorRecovery?errorRecovery:''}</p>
                        
                    </div>
                )
            }
            </div>
            </div>
            
        </>
    )
}

export default CandidateLogin;
