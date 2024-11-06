import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./dashboardItems/Sidebar";
import './Dashboard.css';
import { useEffect, useState } from "react";
import LogIn from './LogIn';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Dashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    // Check authentication on load
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setShowLoginModal(true);
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setShowLoginModal(false);
        setIsAuthenticated(true);
    };

    return (
        <div className="dashboard-container">
            {isAuthenticated ? (
                <div className="d-flex">
                    <div className="col-auto">
                        <Sidebar />
                    </div>

                </div>
            ) : null}

            {/* Material UI Login Modal */}
            <Modal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                aria-labelledby="login-modal-title"
                aria-describedby="login-modal-description"
                closeAfterTransition
            >
                <Box
                    sx={{
                        position: 'absolute',
                        width:463,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        
                        bgcolor: 'background.black',
                        boxShadow: 5,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <LogIn onSuccess={handleLoginSuccess} />
                </Box>
            </Modal>
        </div>
    );
};

export default Dashboard;
