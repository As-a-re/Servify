import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Auth.module.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      setErrors({ form: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>💙</div>
          </div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your maternity support account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {errors.form && <div className={styles.formError}>{errors.form}</div>}

          <Input
            type="email"
            placeholder="your@email.com"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            icon={<span>✉️</span>}
          />

          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            icon={<span>🔒</span>}
            rightElement={
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            }
          />

          <Link to="/forgot-password" className={styles.forgotLink}>
            Forgot password?
          </Link>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <div className={styles.divider}>
          <span>Or continue with</span>
        </div>

        <div className={styles.socialButtons}>
          <Button variant="outline" size="md" fullWidth>
            Google
          </Button>
          <Button variant="outline" size="md" fullWidth>
            Apple
          </Button>
        </div>

        <p className={styles.signupPrompt}>
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>

      <div className={styles.features}>
        <div className={styles.featureItem}>
          <span className={styles.featureIcon}>🏥</span>
          <span>24/7 Medical Support</span>
        </div>
        <div className={styles.featureItem}>
          <span className={styles.featureIcon}>⚡</span>
          <span>Emergency Response</span>
        </div>
        <div className={styles.featureItem}>
          <span className={styles.featureIcon}>📊</span>
          <span>Health Tracking</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
