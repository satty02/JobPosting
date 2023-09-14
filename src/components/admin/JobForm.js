import axios from 'axios';
import React, {useState} from 'react'

function JobForm() {

    const [openForm, setOpenForm] = useState(false);

    const [formData, setFormData] = useState({
        jobCategory: '',
        jobType: '',
        title: '',
        companyDetail: '',
        tags: '',
        skills: '',
        experience: '',
        description: '',
        salary: '',
        additionalFields: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleCreateForm = () => {
        setOpenForm(!openForm)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try { // Send a POST request to your backend API to add the job data to the database
            const response = await axios.post('https://job-posting-eight.vercel.app/admin/add-jobs', formData);

            // Handle the response as needed (e.g., show a success message)
            console.log('Job created successfully:', response.data);

            // Reset the form
            setFormData({
                jobCategory:'',
                jobType: '',
                title: '',
                companyDetail: '',
                tags: '',
                skills: '',
                experience: '',
                description: '',
                salary: '',
                additionalField1: '',
                additionalField2: ''
            });
        } catch (error) { // Handle errors (e.g., show an error message)
            console.error('Error creating job:', error);
        }
    };


    return (
        <div className='p-3  w-[400px]'>
            <button className='font-semibold bg-slate-100 p-2 w-full my-2 text-lg text-center'
                onClick={handleCreateForm}>Create form (click here to create)</button>
            {
            openForm && <form onSubmit={handleSubmit}
                className='flex flex-col w-fit justify-center content-center items-center bg-blue-100'>
                  <div className='flex my-2  w-full justify-around ml-3 '>
                    <label className=' w-[220px] p-1 bg-gray-50 rounded-md'>Job-Category:</label>
                    <input name="jobCategory"
                        value={
                            formData.jobCategory
                        }
                        onChange={handleChange}
                        className=' w-full mx-3 p-1 bg-gray-50 rounded-md'
                        type='text'
                        placeholder='jobCategory'/>
                </div>
                <div className=' my-2 flex w-full justify-around ml-3'>
                    <label className='  w-[220px] p-1 bg-gray-50 rounded-md '>Job-type:</label>
                    <select className=' p-1 w-full bg-gray-50 rounded-md mx-3' name="jobType"
                        value={
                            formData.jobType
                        }
                        onChange={handleChange}>
                        <option>Select</option>
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Internship</option>
                    </select>
                </div>
                <label className='text-center w-full p-1 bg-gray-50 mx-2 rounded-md'>Job Listings:</label>
                <div className=' my-2 flex w-full justify-around ml-3'>
                    <label className='  w-[220px] p-1 bg-gray-50 rounded-md'>Title:</label>
                    <input name="title"
                        value={
                            formData.title
                        }
                        onChange={handleChange}
                        className='w-full p-1 bg-gray-50 rounded-md  mx-3'
                        type='text'
                        placeholder='title'/>
                </div>

                <div className=' flex w-full justify-around ml-3'>
                    <label className=' w-[220px] p-1 bg-gray-50 rounded-md'>Company Detail</label>
                    <textarea name="companyDetail"
                        value={
                            formData.companyDetail
                        }
                        onChange={handleChange}
                        className='w-full mx-3 p-1 bg-gray-50 rounded-md'
                        placeholder='Company Detail'/>
                </div>
                <div className='flex my-2  w-full justify-around ml-3 '>
                    <label className=' w-[220px] p-1 bg-gray-50 rounded-md'>Tags</label>
                    <input name="tags"
                        value={
                            formData.tags
                        }
                        onChange={handleChange}
                        className=' w-full mx-3 p-1 bg-gray-50 rounded-md'
                        type='text'
                        placeholder='tags'/>
                </div>
                <div className='flex my-2  w-full justify-around ml-3'>
                    <label className=' w-[220px] p-1 bg-gray-50 rounded-md'>Skills:</label>
                    <input name="skills"
                        value={
                            formData.skills
                        }
                        onChange={handleChange}
                        className=' w-full mx-3 p-1 bg-gray-50 rounded-md'
                        type='text'
                        placeholder='skills'/>
                </div>
                <div className='flex my-2  w-full justify-around ml-3 '>
                    <label className=' w-[220px] p-1 bg-gray-50 rounded-md'>Experience(yrs):</label>
                    <input name="experience"
                        value={
                            formData.experience
                        }
                        onChange={handleChange}
                        className=' w-full mx-3 p-1 bg-gray-50 rounded-md'
                        type='number'
                        placeholder='experience'/>
                </div>
                <div className='flex my-2  w-full justify-around ml-3'>
                    <label className=' w-[220px] p-1 bg-gray-50 rounded-md'>Description:</label>
                    <textarea name="description"
                        value={
                            formData.description
                        }
                        onChange={handleChange}
                        className=' p-1 w-full mx-3 bg-gray-50 rounded-md'
                        placeholder='description'/>
                </div>
                <div className='flex  my-2 w-full justify-around ml-3'>
                    <label className=' w-[220px] p-1 bg-gray-50 rounded-md'>Salary(in LAKH/P.A):</label>
                    <input name="salary"
                        value={
                            formData.salary
                        }
                        onChange={handleChange}
                        type='number'
                        className=' w-full p-1 bg-gray-50 rounded-md mx-3'
                        placeholder='Salary'/>
                </div>
                <div className='flex  my-2 w-full justify-around ml-3'>
                    <label className=' w-[220px] p-1 bg-gray-50 rounded-md'>Additional Fields:</label>
                    <input name="additionalFields"
                        value={
                            formData.additionalFields
                        }
                        onChange={handleChange}
                        type='text'
                        className=' w-full p-1 bg-gray-50 rounded-md mx-3'
                        placeholder='Enter key:value pair'/>

                </div>
                <button className=' p-2 my-2 rounded-lg bg-blue-400 m-2'>Create</button>
            </form>
        } </div>
    )
}

export default JobForm
