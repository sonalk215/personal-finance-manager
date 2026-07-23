import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    console.log('21212');
    e.preventDefault();
    setMessage('');

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8080/api/auth/forgot-password',
        { email }
      );
      console.log(response);
      setMessage(
        response.data.message ||
          'Password reset link has been sent to your email.'
      );
      setEmail('');
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>
          Enter your email address and we'll send you a password reset link.
        </p>

        {error && <div className="error">{error}</div>}

        {message && <div className="success">{message}</div>}

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        <p style={{ marginTop: '20px' }}>
          <Link to="/">Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
