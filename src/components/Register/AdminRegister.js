import React, {useState} from 'react';
// import axios from 'axios';
import off_eye from '../Login/asset/visibility_off.png';
import on_eye from '../Login/asset/remove_red_eye.png';
import axios from 'axios';

function AdminRegister() {
    const [name , setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, SetShowPassword] = useState(false);
    const [message, setMessage] = useState(' ')

    const [errorMessage, setErrormessage] = useState('');

    const handleName = (e)=>{
        setName(e.target.value);
    }

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = {
            name:name,
            username: username,
            password: password
        }

        console.log(formData)
        try {
            const response = await axios.post('https://job-posting-eight.vercel.app/admin/register', formData);

            if (response.status === 200) { // Registration successful, you can handle the response here
                setMessage('Admin added successfully');
                setUsername('');
                setPassword('');
                setName('')
                
            }
        } catch (error) { 
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

    return (
        <>
            <section class="main-container 2xl:w-full">

                {/* Login form */}
                <div class="form-container">
                    <div class=" rounded-[16px] p-[40px] gap-[16px] bg-[#FBFBFB] shadow-[0_1px_3px_0px_rgba(0,0,0,0.08)]">
                        <h1 class="sign-header font-inter">Admin Registration</h1>

                        <form onSubmit={handleLogin}>

                        {/* name */}
                        <div className={
                                `common-container pt-[12px] pb-0 px-[16px] ${
                                    errorMessage ? 'ring-[#E21E1E] ring-[2px]' : ''
                                }`
                            }>
                                <div className="relative bg-inherit ">
                                    <input type="text" id="name" name="name" className="peer  font-inter  w-[344px] text-[#000] placeholder-transparent"
                                        onChange={handleName}
                                        value={name}
                                        placeholder="name"
                                        required/>
                                    <label htmlFor="name"
                                        className={`common-label font-inter left-0 -top-2 text-[12px] text-[#ECECEC] bg-inherit peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-0 peer-focus:-top-2 peer-focus:text-[12px] peer-focus:h-[15px] transition-all`}>name</label>
                                </div>
                            </div>

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
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminRegister
