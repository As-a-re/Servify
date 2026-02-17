import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, rightElement, className = '', ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={props.id} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <input
            ref={ref}
            className={`${styles.input} ${error ? styles.error : ''} ${className}`}
            {...props}
          />
          {rightElement && <span className={styles.rightElement}>{rightElement}</span>}
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        {hint && !error && <p className={styles.hint}>{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
