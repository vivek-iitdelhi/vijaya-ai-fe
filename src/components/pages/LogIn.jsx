import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

export const LogIn = () => {
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
      ? `http://34.131.93.240:8000/api/login/`
      : "http://34.131.93.240:8000/api/register/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          localStorage.setItem("username", formData.username); // Save username
          setErrorMessage('');
          navigate("/");
        } else {
          console.log("Registration Success:", data);
          setIsLogin(true);
        }
      } else {
        console.log("Error:", data);
        setErrorMessage(data.detail || 'An error occurred');
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage('Server error. Please try again later.');
    }
  }

  return (
    <div className="auth-form-container">
      <h1>Welcome!</h1>
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
