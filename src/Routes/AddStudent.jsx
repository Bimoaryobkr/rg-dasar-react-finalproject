import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddStudent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        profilePicture: '',
        address: '',
        phoneNumber: '',
        birthDate: '',
        gender: '',
        faculty: '',
        programStudy: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { fullname, profilePicture, address, phoneNumber, birthDate, gender, programStudy } = formData;
        const faculty = getFacultyByProgramStudy(programStudy);
        const newStudent = {
            fullname,
            profilePicture,
            address,
            phoneNumber,
            birthDate,
            gender,
            faculty,
            programStudy,
        };

        try {
            await fetch('http://localhost:3001/student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            });
            navigate('/student');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const getFacultyByProgramStudy = (programStudy) => {
        switch (programStudy) {
            case 'Ekonomi':
            case 'Manajemen':
            case 'Akuntansi':
                return 'Fakultas Ekonomi';
            case 'Administrasi Publik':
            case 'Administrasi Bisnis':
            case 'Hubungan Internasional':
                return 'Fakultas Ilmu Sosial dan Politik';
            case 'Teknik Sipil':
            case 'Arsitektur':
                return 'Fakultas Teknik';
            case 'Matematika':
            case 'Fisika':
            case 'Informatika':
                return 'Fakultas Teknologi Informasi dan Sains';
            default:
                return '';
        }
    };

    return (
        <>
            <Navbar />
            <div className='container'>
                <h2>Add Student</h2>
                <form id="form-student" onSubmit={handleSubmit}>
                    <label htmlFor="input-name">Fullname</label>
                    <input id="input-name" type="text" name="fullname" value={formData.fullname} onChange={handleChange} data-testid="name" />
                    <label htmlFor="input-picture">Profile Picture</label>
                    <input id="input-picture" type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} required data-testid="profilePicture" />
                    <label htmlFor="input-address">Address</label>
                    <input id="input-address" type="text" name="address" value={formData.address} onChange={handleChange} required data-testid="address" />
                    <label htmlFor="input-phoneNumber">Phone Number</label>
                    <input id="input-phoneNumber" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required data-testid="phoneNumber" />
                    <label htmlFor="input-date">Birth Date</label>
                    <input id="input-date" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required data-testid="date" />
                    <label htmlFor="input-gender">Gender</label>
                    <select id="input-gender" name="gender" value={formData.gender} onChange={handleChange} required data-testid="gender" >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <label htmlFor="input-prody">Program Study</label>
                    <select id="input-prody" name="programStudy" value={formData.programStudy} onChange={handleChange} required data-testid="prody" >
                        <option value="">Select Program Study</option>
                        <option value="Ekonomi">Ekonomi</option>
                        <option value="Manajemen">Manajemen</option>
                        <option value="Akuntansi">Akuntansi</option>
                        <option value="Administrasi Publik">Administrasi Publik</option>
                        <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                        <option value="Hubungan Internasional">Hubungan Internasional</option>
                        <option value="Teknik Sipil">Teknik Sipil</option>
                        <option value="Arsitektur">Arsitektur</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Fisika">Fisika</option>
                        <option value="Informatika">Informatika</option>
                    </select>
                    <input id="add-btn" type="submit" value="Add student" data-testid="add-btn" />
                </form>
            </div>
        </>
    );
};

export default AddStudent;
