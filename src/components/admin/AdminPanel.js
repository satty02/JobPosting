// in this component called the course form and instructor 

import React from 'react'
import JobForm from './JobForm';
import JobList from './JobList';
import SendStatus from './SendStatus';
import { useUser } from '../../userData';


function AdminPanel() {
    const {userData} = useUser();

    let user = userData && userData.instructor ? userData.instructor.name : '';

    return (
        <>
            <h1 className='border text-center bg-gray-200 text-3xl p-2'>Welcome to Admin Panel {user}</h1><br/>
            <div className='flex justify-between  w-full'>
                <JobForm/>
                <JobList/>
                <SendStatus/>
            </div>
        </>
    )
}

export default AdminPanel
