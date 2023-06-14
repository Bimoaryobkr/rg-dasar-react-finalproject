import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        address: '',
        phoneNumber: '',
        birthDate: '',
        gender: '',
        programStudy: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`http://localhost:3001/student/${id}`);
                const data = await response.json();
                setFormData(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchStudent();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
            faculty: name === 'programStudy' ? getFacultyByProgramStudy(value) : prevFormData.faculty,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            navigate('/student');
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <p>Loading ...</p>;
    }

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
                <h2>Edit Student</h2>
                <img src={formData.profilePicture} alt='' />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="input-name">Full Name</label>
                    <input id="input-name" type="text" name="fullname" value={formData.fullname} onChange={handleChange} required data-testid="name" />
                    <label htmlFor="input-address">Address</label>
                    <input id="input-address" type="text" name="address" value={formData.address} onChange={handleChange} required data-testid="address" />
                    <label htmlFor="input-phoneNumber">Phone Number</label>
                    <input id="input-phoneNumber" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required data-testid="phoneNumber" />
                    <label htmlFor="input-date">Birth Date</label>
                    <input id="input-date" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required data-testid="date" />
                    <label htmlFor="input-gender">Gender</label>
                    <select id="input-gender" name="gender" value={formData.gender} onChange={handleChange} required data-testid="gender">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <label htmlFor="input-prody">Program Study</label>
                    <select id="input-prody" name="programStudy" value={formData.programStudy} onChange={handleChange} required data-testid="prody">
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
                    <button id="edit-btn" type="submit" data-testid="edit-btn">Update Student</button>
                </form>
            </div>
        </>
    );
};

export default EditStudent;
