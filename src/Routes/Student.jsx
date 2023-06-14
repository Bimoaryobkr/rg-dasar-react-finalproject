import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Student = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:3001/student');
            const data = await response.json();
            setStudents(data);
            setFilteredStudents(data);
        } catch (error) {
            console.log('Error fetching students:', error);
        }
    };

    const handleFilterChange = (event) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);

        if (selectedFilter === 'All') {
            setFilteredStudents(students);
        } else {
            const filtered = students.filter((student) => student.faculty === selectedFilter);
            setFilteredStudents(filtered);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/student/${id}`, { method: 'DELETE' });
            const updatedStudents = students.filter((student) => student.id !== id);
            setStudents(updatedStudents);
            setFilteredStudents(updatedStudents);
        } catch (error) {
            console.log('Error deleting student:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='container'>
                <h2>Student List</h2>
                {students.length === 0 ? (
                    <p>Loading ...</p>
                ) : (
                    <div>
                        <select id="select-filter" data-testid="filter" value={filter} onChange={handleFilterChange}>
                            <option value="All">All</option>
                            <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                            <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
                            <option value="Fakultas Teknik">Fakultas Teknik</option>
                            <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
                        </select>
                        <table id="table-student">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Full Name</th>
                                    <th>Faculty</th>
                                    <th>Program Study</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, data) => (
                                    <tr key={student.id} className="student-data-row">
                                        <td>{data + 1}</td>
                                        <td><Link to={`/student/${student.id}`}>{student.fullname}</Link></td>
                                        <td>{student.faculty}</td>
                                        <td>{student.programStudy}</td>
                                        <td><button className="delete-btn" onClick={() => handleDelete(student.id)} data-testid={`delete-${student.id}`}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default Student;
