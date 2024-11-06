import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

import DynamicButtonTable from './DynamicButtonTable';






export default function AdvisingPortal () {
    const navigate = useNavigate();

    function handleBackPage() {
        navigate('/dashboard');
    };

    const [rows, setRows] = React.useState([{name: ''}]);

    const handleInputChange = (e, index) => {
        const values = [...rows];
        if (e.target.name === 'name') {
            values[index].name = e.target.value;
        }
        setRows(values); 
    };

    const handleAddRow = () => {
        setRows([...rows, { name: ''}]);
    };

    const handleSubmit = () => {
    console.log(rows);
    };

    const handleAdvisingEntryInformation = async (e) => {
        e.preventDefault();
        setAllSQLData('');
        setAllSQLSuccessMessage('');
        setAllSQLErrorMessage('');







    }





    const [courseOptions, setCourseOptions] = useState([]);
    var selectedCourseList = [];


    function AlreadySelectedCourses() {
        $('option')
    }


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/course/advisingPortalRequest');
            const data = await response.json();

            // Assuming your API response is an array of objects like [{ id: 1, name: 'Option 1' }, ...]
            const formattedOptions = data.data.map((courseData) => ({
                value: courseData.course_id,
                label: courseData.courseName,
            }));

            setCourseOptions(formattedOptions);
        };
    
        fetchData();
      }, []);








    return (
        <div className = "mysqltesting-container">
            <div className="Title">
                <div className = "mysqltesting-menu-container">
                    <h1 className="text-center">Advising Portal</h1>
                    <form onSubmit={handleBackPage}>
                        <button type="submit" className="btn btn-createAccount">
                            Go back
                        </button>
                    </form>
                </div>
            </div>
            <div className = "advising-portal-container">
                <form onSubmit={handleAdvisingEntryInformation}>
                    <div className="Title">
                        <div className="Title">
                            <div className = "advising-user-information">
                                <div className = "testResultOutput">
                                    <h1 className="text-center">Enter your information:</h1>
                                    <div className = "testResultOutput">
                                        <div className="mb-3">
                                            <label className="form-label">Last Term: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(e) => setLastTerm(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <label className="form-label">Last GPA: </label>
                                            <input 
                                                type="number"
                                                id="number-input"
                                                step="0.1"
                                                min="0"
                                                max="4.0"
                                                aria-describedby="helper-text-explanation"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                onChange={(e) => setLastGPA(e.target.value)}
                                                required 
                                            />
                                        <div className="mb-3">
                                            <label className="form-label">Current Term: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={(e) => setCurrentTerm(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Title">
                        <div className = "prequisite-choices">
                            <h1 className="text-center"><p>Choose your prerequisites:</p></h1>
                            <div className = "testResultOutput">
                            {rows.map((row, index) => (
                                <div key={index}>

                                    <select>

                                    
                                        {courseOptions.map((courseOptions) => (
                                            <option key={courseOptions.value} value={courseOptions.value}>
                                                {courseOptions.label}
                                            </option>
                                            ))}

                                    </select>                           

                                    
                                </div>
                                ))}

                                <button onClick={handleAddRow}>Add Prerequisite</button>
                            </div>
                        </div>
                    </div>
                    <div className="Title">
                        <div className="Title">
                            <div className = "course-plan-information">
                                <div className = "testResultOutput">
                                    <h1 className="text-center">Choose your courses:</h1>
                                    <div className = "testResultOutput">
                                        <DynamicButtonTable />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

