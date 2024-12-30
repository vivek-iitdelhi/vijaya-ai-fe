import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LogIn.css";

const LogIn = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const url = isLogin
      ? `${import.meta.env.VITE_HOST_URL}/tuning/login/`
      : `${import.meta.env.VITE_HOST_URL}/tuning/register/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify({
          username: isLogin ? undefined : formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (isLogin) {
          console.log("Login Success:", data);
          localStorage.setItem("authToken", data.token);
          const username = data.username || formData.email.split('@')[0];
          localStorage.setItem("username", username);
          setErrorMessage('');
          onSuccess(); // Trigger modal close on success
          navigate("/dashboard");
        } else {
          console.log("Registration Success:", data);
          toast.success("User registered successfully. Please check your email to verify your account.");
          setIsLogin(true); // Switch to login form
        }
      } else {
        console.log("Error:", data);
        if (!isLogin) {
          setErrorMessage(data.detail || "An error occurred during registration.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      if (!isLogin) {
        setErrorMessage("Server error. Please try again later.");
      }
    }
  }

  return (
    <div className="auth-form-container">
      <ToastContainer />
      <h1>Welcome!</h1>
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
      {!isLogin && errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required  
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
      </form>
      <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'New User? Sign Up' : 'Already have an account? Log In'}
      </button>
    </div>
  );
};

export default LogIn;
