import React from 'react'
import {useAuth} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

const Dashboard:React.FC = () => {
	const {signOut} = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await signOut();
		navigate("/login");
	}
	return(
		<>
		<h1>Welcome to Dashboard Page</h1>
		<button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
		</>
	);
};

export default Dashboard;