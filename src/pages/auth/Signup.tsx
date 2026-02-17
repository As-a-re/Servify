import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Auth.module.css';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dueDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate('/onboarding');
    } catch (error) {
      setErrors({ form: 'Signup failed. Please try again.' });
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
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join our maternity support community</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {errors.form && <div className={styles.formError}>{errors.form}</div>}

          <Input
            type="text"
            name="fullName"
            placeholder="Your full name"
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            icon={<span>👤</span>}
          />

          <Input
            type="email"
            name="email"
            placeholder="your@email.com"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<span>✉️</span>}
          />

          <Input
            type="date"
            name="dueDate"
            label="Expected Due Date"
            value={formData.dueDate}
            onChange={handleChange}
            error={errors.dueDate}
            icon={<span>📅</span>}
          />

          <Input
            type="password"
            name="password"
            placeholder="Create a strong password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={<span>🔒</span>}
            hint="At least 8 characters recommended"
          />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={<span>🔒</span>}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>

        <p className={styles.signupPrompt}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
