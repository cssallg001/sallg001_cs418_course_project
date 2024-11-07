import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';



export default function PrerequisiteForm () {
    const navigate = useNavigate();


    const [DisplayPrereqErrorMessage, setDisplayPrereqErrorMessage] = useState('');
    const [DisplayPrereqSuccessMessage, setDisplayPrereqSuccessMessage] = useState('');

    const [checkBoxChangesErrorMessage, setCheckBoxChangesErrorMessage] = useState('');
    const [checkBoxChangesSuccessMessage, setCheckBoxChangesSuccessMessage] = useState('');



    const [prereqData, setPrereqData] = useState([]);
    const [prereqDataCopy, setPrereqDataCopy] = useState([]);
    const [loading, setLoading] = useState(false);


    const [select, setSelect] = useState(false);

    const [selectedPrereqs, setSelectedPrereqs] = useState([]);
    const [selectedPrereqIDs, setSelectedPrereqIDs] = useState([]);


    const [prereqUpdateAvailResultSuccessMessage, setPrereqUpdateAvailResultSuccessMessage] = useState('');
    const [prereqUpdateAvailResultErrorMessage, setPrereqUpdateAvailResultErrorMessage] = useState('');
    const [prereqUpdateAvailResultVal, setPrereqUpdateAvailResultVal] = useState(false);



    const [prereq_ID, setPrereq_ID] = useState('');

    const [updateToggleVal, setUpdateToggleVal] = useState(false);

    useEffect(() => {
        handleDisplayPrerequisites();
    }, []);






    const handleDisplayPrerequisites = async (e) => {
        setDisplayPrereqErrorMessage('');
        setDisplayPrereqSuccessMessage('');
        try {
            setLoading(true);
            const response = await fetch(import.meta.env.VITE_API_KEY + '/prerequisites');
            //const response = await fetch('http://localhost:8080/prerequisites');
            //const response = await fetch('https://sallg001-cs418-course-project.onrender.com/prerequisites');
            if (!response.ok) {
                throw new Error("Error occured");
            }
            const data = await response.json();
            setPrereqData(data.data);
            setLoading(false);
            console.log("Success!");

            // this.setState({
            //     list:data.data
            // })

           // renderPrereqMap(this.state.list.data);
           
           
           // const renderPrereqData = prereqData.map (
            //     (prereq) => {
                //         return (
                    //             <tr>
                    //                 <td>{prereq.prereq_level}</td>
                    //                 <td>{prereq.prereq_tag} + " - " {prereq.prereq_name}</td>
                    //                 <td>{prereq.prereq_name}</td> 
                    //                 <td>{prereq.credit_hours}</td>
                    //                 <td>{prereq.enabled}</td>
                    //                 <td>{prereq.disabled}</td>
                    //             </tr>
                    //         )
                    //     }
                    // )
                    


            console.log("prereqData = " + prereqData);
            console.log("prereqDataCopy = " + prereqDataCopy);


            
            setDisplayPrereqSuccessMessage('Success!');
        } catch (error) {
            console.error('Error occurred: ', error);
            setDisplayPrereqErrorMessage('Error occurred: Please try again');
        }
    };



    // function renderPrereqMap(prereqData) {

    //     this.state.

    //     return (
    //         <tr key = 
    //     )
    // };








    const handlePrereqClick = (e, index, id, prereq) => {

        let res = [...prereqData];
        let previousCheckedVal = res[index].enable_disable;
        setUpdateToggleVal(previousCheckedVal);
        console.log("res[index].enable_disable = " + !res[index].enable_disable);
        let fixedToggleVal = !res[index].enable_disable;
        console.log("fixedToggleVal = " + fixedToggleVal);





        //setPrereq_ID(prereqID);
        onChangeCheckBoxEvent(e, index, id, prereq);

        handleCheckBoxChanges(fixedToggleVal, id);

    };







    // Toggle individual checkboxes
    const onChangeCheckBoxEvent = async (e, index, id, prereq) => {
        console.log("Function: 'onChangeCheckBoxEvent'");

        let res = [...prereqData];
        let previousCheckedVal = res[index].enable_disable;

        console.log("res[index].enable_disable = " + !res[index].enable_disable);

        setUpdateToggleVal(previousCheckedVal);
        
        console.log("\n\nPrevious checked state = " + previousCheckedVal);
        const prereqID = id;
        
        if (e.target.checked) {
            console.log("res[" + (index) + "] = checked");
            console.log("prereq_id = " + id);
            res[index].enable_disable = 1;
            //setSelectedPrereqIDs([...selectedPrereqIDs,prereqID])


        } else if (!e.target.checked) {
            console.log("res[" + (index) + "] = unchecked");
            res[index].enable_disable = 0;
            console.log("prereq_id = " + id);
            //setSelectedPrereqIDs(selectedPrereqIDs.filter(id=>id !== prereqID))
        }
        console.log("prereq_id = " + prereq.id);
        console.log("Current checked state = " + res[index].enable_disable+"\n\n");
        //res[index].enable_disable = e.target.checked;
        setPrereqData(res);


        
        // var array = [];
        
        // var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

        // for (var i = 0; i < checkboxes.length; i++) {
        //     array.push(checkboxes[i].index)
        // }


        // console.log("selectedPrereqIDs = " + selectedPrereqIDs);

        // console.log("array = " + array);


        // console.log("testArray = " + Array.from(document.querySelectorAll("input[type=checkbox]:checked"), e => e.value));



    }


    // // Toggle all checkboxes
    // const onChangeSelectBox = (e) => {
    //     //console.log("initial prereqData = " + prereqData);
    //     setSelect(e.target.checked); 
    //     if (e.target.checked === true)
    //     {
    //         let arr = [];
    //         prereqDataCopy.map((prereq) => {
    //             console.log("prereq: ", prereq);
    //             if (prereq.enable_disable === true) {
    //                 console.log("prereq.enable_disable = " + prereq.enable_disable)
    //                 arr.push(prereq); 
    //             }
    //         })
    //         setPrereqData(arr)
    //         console.log("Toggle All: Enabled");
    //     }
    //     if (e.target.checked === false)
    //     { 
    //         let arr = [];
    //         prereqDataCopy.map((prereq) => {
    //             if (prereq.enable_disable === false) {
    //                 console.log("prereq.enable_disable = " + prereq.enable_disable)
    //                 arr.push(prereq);
    //             }
    //         })
    //         setPrereqData(arr)
    //         console.log("Toggle All: Disabled");
    //     }

    //     //console.log("updated prereqData = " + prereqData);



    // }

    


















    function handleBackPage() {
        navigate('/adminDashboard');
    };


    function handleResetBoxes() {
        setSelectedBoxes([]);
    };

    const handleCheckBoxChanges = async (fixedToggleVal, id) => {
        setCheckBoxChangesErrorMessage('');
        setCheckBoxChangesSuccessMessage('');
        console.log("Function: 'handleCheckBoxChanges'");
        try {
            setLoading(true);
            console.log("Loading = " + loading);

            console.log("id = " + id);
            console.log("toggleVal = " + updateToggleVal);
            console.log("fixedToggleVal = " + fixedToggleVal);



            const formBody=JSON.stringify({
                preReq_ID:id,
                toggleVal:fixedToggleVal
            })
    
            //const response= await fetch('http://localhost:8080/prerequisites/togglePrerequisites', {
            //const response= await fetch('https://sallg001-cs418-course-project.onrender.com/prerequisites/togglePrerequisites', {
            const response= await fetch(import.meta.env.VITE_API_KEY + '/prerequisites/togglePrerequisites', {
                method:"POST",
                body:formBody,
                headers:{
                    'content-type':'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Error'); // Handle HTTP errors
            }

            const data = await response.json();
            setLoading(false);
            console.log("Loading = " + loading);
            console.log("Success!");
            
            setPrereqUpdateAvailResultSuccessMessage('Success!');
        } catch (error) {
            console.error('Error occurred: ', error);
            setPrereqUpdateAvailResultErrorMessage('Error!');
        }
    };




















    return (
        <div className = "mysqltesting-container">
            <div className="Title">
                <div className = "mysqltesting-menu-container">
                    <h1 className="text-center">Prerequisite Form</h1>
                    <form onSubmit={handleBackPage}>
                        <button type="submit" className="btn btn-createAccount">
                            Go back
                        </button>
                    </form>
                </div>
                    <div className="mysql-mysqltests">
                        <div className="Title">
                            <div className = "outputPrerequisites">
                            <form onSubmit={handleDisplayPrerequisites}>
                                <div className = "testResultOutput">


                                    {/* <div>
                                        {loading ? (
                                            <Fragment>loading...</Fragment>
                                        ) : (
                                            prereqData.map(prereq => {
                                                return (
                                                    <Fragment>
                                                        <div key={prereq.prereq_id}></div>
                                                        <ul>
                                                            <table className = "centerTable">
                                                                <thead key = "thead">
                                                                    <td>Course Level</td>
                                                                    <td>Course Code</td>
                                                                    <td>Course Name</td>
                                                                    <td>Credit Hours</td>
                                                                    <td>Add</td>
                                                                    <td>Remove</td>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                    <td>{prereq.prereq_level}</td>
                                                                    <td>{prereq.prereq_tag}</td>
                                                                    <td>{prereq.prereq_name}</td>
                                                                    <td>{prereq.credit_hours}</td>
                                                                    <td>{prereq.enabled}</td>
                                                                    <td>{prereq.disabled}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </ul>
                                                    </Fragment>
                                                )
                                            }) 
                                        )}                         
                                    </div>  */}
                                    {/* <div>
                                        {loading ? (
                                            <Fragment>loading...</Fragment>
                                        ) : (
                                            <Fragment>
                                                <table className = "centerTable">
                                                    <thead key = "thead">
                                                        <td>Course Level</td>
                                                        <td>Course Code</td>
                                                        <td>Course Name</td>
                                                        <td>Credit Hours</td>
                                                        <td>Enable/Disable</td>
                                                    </thead>
                                                    <tbody>
                                                        {prereqData.map((item, idx) => (
                                                            <tr key={idx}>
                                                            {keys.map((key, idx) => (
                                                                <td>{item[key]}
                                                                </td>
                                                            ))}
                                                        <input type="checkbox" onChange={() => this.handelCheckboxChange(item)}/>
                                                        </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </Fragment>
                                        )}
                                    </div> */}





                                    {/* <table {...getTableBodyProps()}>
                                        <thead>
                                            {headerGroups.map((headerGroup) => (
                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map((column) => (
                                                        <th {...column.getHeaderGroupProps()}>{column.render("Header")}</th>
                                                    ))}
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody {...getTableGroupProps()}>
                                            {page.map((row, i) => {
                                                prepareRow(row);
                                                return (
                                                    <tr {...row.getRowProps()}>
                                                        {row.cells.map((cell) => {
                                                            return (
                                                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <pre>
                                        <code>
                                            {JSON.stringify(
                                                {
                                                    selectedRowIds: selectedRowIds,
                                                    "selectedFlatRows[].original": selectedFlatRows.map(
                                                        (d) => d.original
                                                    )
                                                }, 
                                                null,
                                                2
                                            )}
                                        </code>
                                    </pre> */}
                                    
                                    
                                    <table>
                                        {/* <th>COURSE ID</th> */}
                                        <th>COURSE LEVEL</th>
                                        <th>COURSE CODE</th>
                                        <th>COURSE NAME</th>
                                        <th>CREDIT HOURS</th>
                                        <th>ENABLE / DISABLE</th>
                                        {/* <th>CHECKBOX VAL    </th> */}

                                        {/* <th>MESSAGE</th> */}
                                        {
                                            prereqData.map((prereq, index) => {
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            {/* <td>{prereq.prereq_id}</td> */}
                                                            <td>{prereq.prereq_level}</td>
                                                            <td>{prereq.prereq_tag}</td>
                                                            <td>{prereq.prereq_name}</td>
                                                            <td>{prereq.credit_hours}</td>
                                                            {/* <td>{prereq.enable_disable}</td> */}

                                                            <td><input type="checkbox" checked={prereq.enable_disable} onChange={(e)=>handlePrereqClick(e, index, prereq.prereq_id, prereq)}/></td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })
                                        }
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

