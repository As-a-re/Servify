import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import styles from './Profile.module.css';

interface EmergencyContact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
}

export const Profile: React.FC = () => {
  const [profile] = useState({
    name: 'Sarah Anderson',
    email: 'sarah.anderson@email.com',
    phone: '+1 (555) 123-4567',
    dueDate: '2024-12-25',
    pregnancyWeek: 24,
    bloodType: 'O+',
    medicalConditions: 'Gestational diabetes (controlled)',
    allergies: 'Penicillin, Shellfish',
  });

  const [emergencyContacts] = useState<EmergencyContact[]>([
    { id: 1, name: 'John Anderson', relationship: 'Spouse', phone: '+1 (555) 123-4568' },
    { id: 2, name: 'Maria Anderson', relationship: 'Mother', phone: '+1 (555) 987-6543' },
  ]);

  const [settingsData] = useState({
    notificationsEnabled: true,
    emailReminders: true,
    appointmentAlerts: true,
    medicationReminders: true,
    darkMode: false,
  });

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Profile & Settings</h1>
      </header>

      {/* Profile Section */}
      <section className={styles.section}>
        <div className={styles.profileHeader}>
          <div className={styles.profileAvatar}>👩</div>
          <div>
            <h2 className={styles.profileName}>{profile.name}</h2>
            <p className={styles.pregnancyInfo}>Week {profile.pregnancyWeek} • Due {profile.dueDate}</p>
          </div>
          <Button variant="secondary" size="sm">
            Edit
          </Button>
        </div>
      </section>

      {/* Medical Information */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Medical Information</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <p className={styles.infoLabel}>Blood Type</p>
            <p className={styles.infoValue}>{profile.bloodType}</p>
          </div>
          <div className={styles.infoCard}>
            <p className={styles.infoLabel}>Pregnancy Week</p>
            <p className={styles.infoValue}>Week {profile.pregnancyWeek}</p>
          </div>
        </div>

        <div className={styles.conditionCard}>
          <p className={styles.conditionLabel}>Medical Conditions</p>
          <p className={styles.conditionValue}>{profile.medicalConditions}</p>
        </div>

        <div className={styles.conditionCard}>
          <p className={styles.conditionLabel}>Allergies</p>
          <p className={styles.conditionValue}>{profile.allergies}</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Contact Information</h3>
        <div className={styles.contactCard}>
          <p className={styles.contactLabel}>Email</p>
          <p className={styles.contactValue}>{profile.email}</p>
        </div>
        <div className={styles.contactCard}>
          <p className={styles.contactLabel}>Phone</p>
          <p className={styles.contactValue}>{profile.phone}</p>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Emergency Contacts</h3>
          <Button variant="secondary" size="sm">
            + Add
          </Button>
        </div>
        <div className={styles.contactsList}>
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className={styles.emergencyContact}>
              <div className={styles.contactInfo}>
                <p className={styles.contactName}>{contact.name}</p>
                <p className={styles.contactRelationship}>{contact.relationship}</p>
                <p className={styles.contactPhone}>{contact.phone}</p>
              </div>
              <button className={styles.editContactButton}>✎</button>
            </div>
          ))}
        </div>
      </section>

      {/* Notifications Settings */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Notifications</h3>
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <p className={styles.settingLabel}>All Notifications</p>
            <p className={styles.settingDescription}>Receive notifications about appointments and health updates</p>
          </div>
          <div className={styles.toggle}>
            <input type="checkbox" id="notif" defaultChecked={settingsData.notificationsEnabled} />
            <label htmlFor="notif"></label>
          </div>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <p className={styles.settingLabel}>Email Reminders</p>
            <p className={styles.settingDescription}>Get email reminders for important dates</p>
          </div>
          <div className={styles.toggle}>
            <input type="checkbox" id="email" defaultChecked={settingsData.emailReminders} />
            <label htmlFor="email"></label>
          </div>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <p className={styles.settingLabel}>Medication Reminders</p>
            <p className={styles.settingDescription}>Reminders for your prenatal vitamins</p>
          </div>
          <div className={styles.toggle}>
            <input type="checkbox" id="meds" defaultChecked={settingsData.medicationReminders} />
            <label htmlFor="meds"></label>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Preferences</h3>
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <p className={styles.settingLabel}>Dark Mode</p>
            <p className={styles.settingDescription}>Better for low-light environments</p>
          </div>
          <div className={styles.toggle}>
            <input type="checkbox" id="dark" defaultChecked={settingsData.darkMode} />
            <label htmlFor="dark"></label>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className={styles.section}>
        <Button variant="secondary" size="lg" fullWidth style={{ marginBottom: '0.75rem' }}>
          Change Password
        </Button>
        <Button variant="danger" size="lg" fullWidth>
          Sign Out
        </Button>
      </section>

      <div className={styles.spacer}></div>
    </div>
  );
};

export default Profile;
