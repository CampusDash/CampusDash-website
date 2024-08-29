import React, { useState, useEffect } from 'react';
import './founders.css';

const employees = [
    { id: 1, name: 'Gbemi', role:"Co-Founder/Design/Anywork", image: './Adura.svg' },
    { id: 2, name: 'Ameerah', role:"Co-Founder/Engineering", image: './Ameerah.svg' },
    { id: 3, name: 'Yemi',role:"Co-Founder/Engineering", image: './yemi.svg' },
    { id: 4, name: 'Feranmi',role:"Co-Founder/Growth and marketing", image: './femi.svg' },
    { id: 5, name: 'Faith',role:"Product Manager", image: './faith.svg' },
    { id: 6, name: 'Jones',role:"Engineering", image: './gideon.svg' },
];


function Founder() {
    const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const nextIndex = (currentIndex + 1) % employees.length;
            setCurrentIndex(nextIndex);
            setSelectedEmployee(employees[nextIndex]);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    return (
        <>
        <h2>We built CampusDash for you</h2>
        <div className="container">
            <div className="column">
                <img
                    src={selectedEmployee.image}
                    alt={selectedEmployee.name}
                    className="employee-image"
                />
            </div>
            <div className="column">
                <ul className='names-container'>
                    {employees.map((employee, index) => (
                        <li className='name-list' key={employee.id}>
                            <div className='employee-name'
                                style={{
                                    color: index === currentIndex ? '#32B76F' : 'black',
                                }}
                            >
                                {employee.name}
                            </div>
                            <div className='employee-role'>{employee.role} </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
}

export default Founder;