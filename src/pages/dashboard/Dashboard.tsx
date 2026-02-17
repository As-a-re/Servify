import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import styles from './Dashboard.module.css';

interface HealthMetric {
  label: string;
  value: string;
  status: 'normal' | 'warning' | 'critical';
  icon: string;
}

export const Dashboard: React.FC = () => {
  const [metrics] = useState<HealthMetric[]>([
    { label: 'Blood Pressure', value: '120/80 mmHg', status: 'normal', icon: '❤️' },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal', icon: '💓' },
    { label: 'Weight', value: '75 kg', status: 'normal', icon: '⚖️' },
    { label: 'Blood Sugar', value: '95 mg/dL', status: 'warning', icon: '🩸' },
  ]);

  const [upcomingAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'OB/GYN',
      date: '2024-12-15',
      time: '2:00 PM',
      type: 'Ultrasound',
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Nutritionist',
      date: '2024-12-18',
      time: '10:30 AM',
      type: 'Diet Consultation',
    },
  ]);

  const [recentActivities] = useState([
    { id: 1, type: 'health_entry', description: 'Logged daily vitals', time: '2 hours ago' },
    { id: 2, type: 'message', description: 'Message from Dr. Johnson', time: '5 hours ago' },
    { id: 3, type: 'reminder', description: 'Prenatal vitamin reminder', time: '1 day ago' },
  ]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>Welcome Back, Mom!</h1>
            <p className={styles.subtitle}>Week 24 of your pregnancy journey</p>
          </div>
          <button className={styles.profileButton}>👤</button>
        </div>
      </header>

      {/* Emergency Button - Prominent */}
      <section className={styles.emergencySection}>
        <Button variant="danger" size="lg" fullWidth>
          🚨 Emergency Support
        </Button>
        <p className={styles.emergencyNote}>Available 24/7 for urgent concerns</p>
      </section>

      {/* Quick Stats */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Today's Health Metrics</h2>
        <div className={styles.metricsGrid}>
          {metrics.map((metric) => (
            <div key={metric.label} className={`${styles.metricCard} ${styles[metric.status]}`}>
              <span className={styles.metricIcon}>{metric.icon}</span>
              <p className={styles.metricLabel}>{metric.label}</p>
              <p className={styles.metricValue}>{metric.value}</p>
              <div className={styles.statusIndicator}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.quickActionsGrid}>
          <button className={styles.quickAction}>
            <span className={styles.actionIcon}>📊</span>
            <span>Log Vitals</span>
          </button>
          <button className={styles.quickAction}>
            <span className={styles.actionIcon}>💬</span>
            <span>Message Doctor</span>
          </button>
          <button className={styles.quickAction}>
            <span className={styles.actionIcon}>📝</span>
            <span>Health Log</span>
          </button>
          <button className={styles.quickAction}>
            <span className={styles.actionIcon}>💊</span>
            <span>Medications</span>
          </button>
        </div>
      </section>

      {/* Upcoming Appointments */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Upcoming Appointments</h2>
          <a href="#" className={styles.viewAll}>
            View All
          </a>
        </div>
        <div className={styles.appointmentsList}>
          {upcomingAppointments.map((apt) => (
            <div key={apt.id} className={styles.appointmentCard}>
              <div className={styles.appointmentIcon}>📅</div>
              <div className={styles.appointmentDetails}>
                <p className={styles.doctorName}>{apt.doctorName}</p>
                <p className={styles.appointmentType}>{apt.type}</p>
                <p className={styles.appointmentTime}>
                  {new Date(apt.date).toLocaleDateString()} • {apt.time}
                </p>
              </div>
              <button className={styles.appointmentAction}>→</button>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          {recentActivities.map((activity) => (
            <div key={activity.id} className={styles.activityItem}>
              <span className={styles.activityIcon}>
                {activity.type === 'health_entry' && '📊'}
                {activity.type === 'message' && '💬'}
                {activity.type === 'reminder' && '🔔'}
              </span>
              <div className={styles.activityContent}>
                <p className={styles.activityDescription}>{activity.description}</p>
                <p className={styles.activityTime}>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation Space */}
      <div className={styles.spacer}></div>
    </div>
  );
};

export default Dashboard;
