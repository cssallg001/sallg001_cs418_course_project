import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import tableScript from './mysqlTestingTableFunction.js';

export default function MYSQLTesting () {
    const navigate = useNavigate();

    const [allSQLErrorMessage, setAllSQLErrorMessage] = useState('');
    const [allSQLSuccessMessage, setAllSQLSuccessMessage] = useState('');

    const [preReqErrorMessage, setPrereqErrorMessage] = useState('');
    const [preReqSuccessMessage, setPrereqSuccessMessage] = useState('');


    const [allSQLData, setAllSQLData] = useState(null);
    const [prereqData, setPrereqData] = useState([]);
    const [data, setData] = useState([]);

    const [enteredID, setEnteredID] = useState('');

    const [loading, setLoading] = useState(false);












    const handleMySQLAllCoursesTest = async (e) => {
        e.preventDefault();
        setAllSQLData('');
        setAllSQLSuccessMessage('');
        setAllSQLErrorMessage('');
        try {
            const response = await fetch('http://localhost:8080/course/', {
                headers: {
                    'content-type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error("Error occured");
            }
            const data = await response.json();
            setAllSQLData(data);
            document.getElementById("allSQLJSON").textContent = JSON.stringify(data, undefined, 2);
            console.log(document.getElementById("allSQLJSON").textContent = JSON.stringify(data, undefined, 2));
            console.log("Success!");
            setPrereqSuccessMessage('Success!');
            setAllSQLSuccessMessage('Success!');
        } catch (error) {
            console.error('Error occurred: ', error);
            setAllSQLErrorMessage('Error occurred: Please try again');
        }
    };


    useEffect(() => {
        handleMySQLAllCoursesTest();
      }, []);

    const handleMySQLPreReqTest = async (e) => {
        e.preventDefault();
        setPrereqData('');
        setPrereqSuccessMessage('');
        setPrereqErrorMessage('');

        const id = enteredID;
        const url = 'http://localhost:8080/course/' + enteredID;

        try {
            //const response = await fetch(url);
            setLoading(true);
            const response = await fetch(url);
            

            if (!response.ok) {
                throw new Error("Error occured");
            }
            const data = await response.json();
            setData(data.data);
            setLoading(false);
            console.log("data: ");
            console.log(data);
            console.log("Success!");
            setPrereqSuccessMessage('Success!');
        } catch (error) {
            console.error('Error occurred: ', error);
            setPrereqErrorMessage('Error occurred: Please try again');
        }
    };













    
    function handleClearEverything () {
        setAllSQLSuccessMessage('');
        setAllSQLErrorMessage('');
        setPrereqSuccessMessage('');
        setPrereqErrorMessage('');
        setAllSQLData('');
        setPrereqData('');
    };







    function handleBackPage() {
        navigate('/home');
    };

    return (
        <div className = "mysqltesting-container">
            <div className="Title">
                <div className = "mysqltesting-menu-container">
                    <h1 className="text-center">MySQL Tests</h1>
                    <form onSubmit={handleBackPage}>
                        <button type="submit" className="btn btn-createAccount">
                            Go back
                        </button>
                    </form>
                    <form onSubmit={handleClearEverything}>
                        <button type="submit" className="btn btn-createAccount">
                            Clear All
                        </button>
                    </form>

                </div>
            </div>

            <div className="mysql-mysqltests">
                <div className="Title">
                    <div className = "mysql-allcoursestest">
                        <h1 className="text-center"><p>Test #1: All Courses</p></h1>
                        <form onSubmit={handleMySQLAllCoursesTest}>
                            <button type="submit" className="py-4 px-4 font-bold">
                                Test #1
                            </button>
                            {allSQLErrorMessage && <p className="text-danger">{allSQLErrorMessage}</p>}
                            {allSQLSuccessMessage && <p className="text-success">{allSQLSuccessMessage}</p>}

                            <div className = "testResultOutput">
                            <pre id="allSQLJSON"></pre>
                            </div>
                        </form>
                    </div>
                </div>


                <div className="Title">
                    <div className = "mysql-prereqtest">
                        <h1 className="text-center"><p>Test #2: All Prereqs</p></h1>
                        <form onSubmit={handleMySQLPreReqTest}>
                            <label className="form-label">Course ID: </label>
                            <input 
                                type="number"
                                id="number-input"
                                min="1"
                                max="51"
                                aria-describedby="helper-text-explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                onChange={(e) => setEnteredID(e.target.value)}
                                required 
                            />
                            <button type="submit" className="py-4 px-4 font-bold">
                                Test #2
                            </button>
                            
                            {preReqErrorMessage && <p className="text-danger">{preReqErrorMessage}</p>}
                            {preReqSuccessMessage && <p className="text-success">{preReqSuccessMessage}</p>}
                            
                            <div className = "testResultOutput">
                                {/* <pre id="prereqJSON"></pre> */}

                                <div>
                                    {loading ? (
                                        <Fragment>loading...</Fragment>
                                    ) : (
                                        data.map(prereq => {
                                            return (
                                                <Fragment>
                                                    <div key={prereq.course_id}></div>
                                                    <ul>
                                                        <table>
                                                            <thead>
                                                                <td>course_id:</td>
                                                                <td>course_tag</td>
                                                                <td>credit_hours</td>
                                                                <td>prereq_set_num</td>
                                                                <td>prereq_ids</td>
                                                                <td>prereq_tags</td>
                                                                <td>prereq_credit_hours</td>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{prereq.course_id}</td>
                                                                    <td>{prereq.course_tag}                     </td>
                                                                    <td>{prereq.credit_hours}                 </td>
                                                                    <td>{prereq.prereq_set_num}             </td>
                                                                    <td>{prereq.prereq_ids}                     </td>
                                                                    <td>{prereq.prereq_tags}                   </td>
                                                                    <td>{prereq.prereq_credit_hours}   </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </ul>
                                                </Fragment>
                                            )
                                        }) 
                                    )}                         
                                </div> 

                                


                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );
}

