import axios from 'axios';
import React, {useEffect, useState} from 'react'

function JobList() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => { // Fetch jobs data from the backend when the component mounts
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/get-jobs'); // Replace with your backend API endpoint
            setJobs(response.data); // Set the retrieved jobs data in the state
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    return (
        <div className='bg-slate-50'>
            <h2 className=' rounded-md p-1 px-2 bg-gray-300 font-semibold m-3 text-center text-xl'>List of Jobs</h2>
            <ul className='flex flex-wrap  justify-center  w-[500px]'>
                {
                jobs.map((job , index) => (
                    <div key={index} className=' m-3 bg-gray-100 rounded-lg text-center w-[200px]'>No: {index+1}
                        <li key={
                            job._id
                        }><h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>Job Category: {
                            job.jobCategory
                        }</h3>
                            <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>Job type: {
                                job.jobType
                            }</h3>
                            <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>Title: {
                                job.title
                            }</h3>
                            <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>companyDetail: {
                                job.companyDetail
                            }</h3>
                            <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>tags: {
                                job.tags
                            }</h3>
                            <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>skills: {
                                job.skills
                            }</h3>
                            <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>experience: {
                                job.experience
                            }</h3>
                            <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>description: {
                                job.description
                            }</h3>
                            <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>salary: {
                                job.salary
                            }</h3>
                            <h3 className='border rounded-md p-1 px-2 bg-gray-300 font-semibold m-1'>additional: {
                                job.additional
                            }</h3>
                            </li>
                        </div>
                ))
            } </ul>
        </div>
    )
}

export default JobList
