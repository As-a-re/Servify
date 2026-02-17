import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import styles from './Emergency.module.css';

export const Emergency: React.FC = () => {
  const [emergencyLevel, setEmergencyLevel] = useState<'critical' | 'high' | 'moderate' | null>(null);

  const emergencyOptions = [
    {
      id: 'critical',
      title: 'Life-Threatening',
      description: 'Severe pain, loss of consciousness, or heavy bleeding',
      icon: '🚨',
      color: 'critical',
    },
    {
      id: 'high',
      title: 'Urgent',
      description: 'Severe symptoms requiring immediate medical attention',
      icon: '⚠️',
      color: 'high',
    },
    {
      id: 'moderate',
      title: 'Concern',
      description: 'Worrying symptoms that need professional assessment',
      icon: '❗',
      color: 'moderate',
    },
  ];

  const commonSymptomsToReport = [
    'Heavy vaginal bleeding',
    'Severe abdominal pain',
    'Loss of consciousness',
    'Difficulty breathing',
    'Severe headache',
    'Vision changes',
    'Chest pain',
    'Rapid heartbeat',
  ];

  const handleCall911 = () => {
    // For production: window.location.href = 'tel:911'
    // For demo: Show confirmation modal
    alert('🚨 EMERGENCY: Dialing 911...\n\nIn a real app, this would connect to emergency services immediately.');
  };

  const handleCallNumber = (number: string) => {
    // For production: window.location.href = `tel:${number}`
    // For demo: Show confirmation modal
    alert(`📞 Calling ${number}...\n\nIn a real app, this would connect to the phone system.`);
  };

  return (
    <div className={styles.container}>
      {!emergencyLevel ? (
        <>
          {/* Header */}
          <header className={styles.header}>
            <h1 className={styles.title}>Emergency Support</h1>
            <p className={styles.subtitle}>We're here to help 24/7</p>
          </header>

          {/* Call Emergency Services */}
          <section className={styles.section}>
            <div className={styles.callCard}>
              <div className={styles.callIcon}>☎️</div>
              <h2 className={styles.callTitle}>Call Emergency Services</h2>
              <p className={styles.callDescription}>Dial 911 for life-threatening emergencies</p>
              <Button
                variant="danger"
                size="lg"
                fullWidth
                onClick={handleCall911}
              >
                Call 911 Now
              </Button>
            </div>
          </section>

          {/* Select Emergency Level */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What's Happening?</h2>
            <p className={styles.sectionDescription}>
              Tell us about your situation so we can provide the right support
            </p>
            <div className={styles.emergencyOptions}>
              {emergencyOptions.map((option) => (
                <button
                  key={option.id}
                  className={`${styles.optionCard} ${styles[option.color]}`}
                  onClick={() => setEmergencyLevel(option.id as any)}
                >
                  <span className={styles.optionIcon}>{option.icon}</span>
                  <h3 className={styles.optionTitle}>{option.title}</h3>
                  <p className={styles.optionDescription}>{option.description}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Common Symptoms */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Report These Symptoms Immediately</h2>
            <div className={styles.symptomsList}>
              {commonSymptomsToReport.map((symptom, idx) => (
                <div key={idx} className={styles.symptomItem}>
                  <span className={styles.symptomCheck}>⚠️</span>
                  <span className={styles.symptomText}>{symptom}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Support Resources */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Support Resources</h2>
            <div className={styles.resourcesList}>
              <div className={styles.resourceCard}>
                <span className={styles.resourceIcon}>🏥</span>
                <h3 className={styles.resourceTitle}>Nearest Hospital</h3>
                <p className={styles.resourceDescription}>5.2 km away</p>
                <Button variant="outline" size="sm" fullWidth>
                  Directions
                </Button>
              </div>
              <div className={styles.resourceCard}>
                <span className={styles.resourceIcon}>📞</span>
                <h3 className={styles.resourceTitle}>Poison Control</h3>
                <p className={styles.resourceDescription}>1-800-222-1222</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  fullWidth
                  onClick={() => handleCallNumber('1-800-222-1222')}
                >
                  Call
                </Button>
              </div>
            </div>
          </section>

          <div className={styles.spacer}></div>
        </>
      ) : (
        <>
          {/* Emergency Assessment */}
          <header className={styles.header}>
            <h1 className={styles.title}>Emergency Assessment</h1>
            <button
              className={styles.backButton}
              onClick={() => setEmergencyLevel(null)}
            >
              ← Back
            </button>
          </header>

          <section className={styles.section}>
            <div className={styles.assessmentCard}>
              <p className={styles.assessmentLabel}>Your Emergency Level</p>
              <h2 className={styles.assessmentLevel}>
                {emergencyOptions.find(o => o.id === emergencyLevel)?.title}
              </h2>
            </div>

            <h3 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>
              Please describe your symptoms in detail
            </h3>
            <textarea
              className={styles.symptomsInput}
              placeholder="Describe all symptoms you're experiencing..."
              rows={5}
            ></textarea>

            <div className={styles.actionButtons}>
              <Button variant="primary" size="lg" fullWidth>
                Get Immediate Medical Advice
              </Button>
              <Button variant="secondary" size="lg" fullWidth>
                Connect with Doctor
              </Button>
              <Button variant="danger" size="lg" fullWidth>
                Call Ambulance
              </Button>
            </div>

            <p className={styles.disclaimer}>
              If you believe this is a life-threatening emergency, please call 911 immediately.
            </p>
          </section>

          <div className={styles.spacer}></div>
        </>
      )}
    </div>
  );
};

export default Emergency;
