import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Health.module.css';

interface HealthEntry {
  id: number;
  date: string;
  bloodPressure: string;
  heartRate: number;
  weight: number;
  symptoms: string[];
  notes: string;
}

export const HealthTracking: React.FC = () => {
  const [entries, setEntries] = useState<HealthEntry[]>([
    {
      id: 1,
      date: '2024-12-10',
      bloodPressure: '120/80',
      heartRate: 72,
      weight: 75,
      symptoms: ['Mild headache'],
      notes: 'Felt good today, drank plenty of water',
    },
    {
      id: 2,
      date: '2024-12-09',
      bloodPressure: '118/79',
      heartRate: 70,
      weight: 74.8,
      symptoms: [],
      notes: 'Normal day',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    bloodPressure: '',
    heartRate: '',
    weight: '',
    symptoms: '',
    notes: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: HealthEntry = {
      id: entries.length + 1,
      date: new Date().toISOString().split('T')[0],
      bloodPressure: formData.bloodPressure,
      heartRate: parseInt(formData.heartRate),
      weight: parseFloat(formData.weight),
      symptoms: formData.symptoms
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s),
      notes: formData.notes,
    };
    setEntries([newEntry, ...entries]);
    setFormData({
      bloodPressure: '',
      heartRate: '',
      weight: '',
      symptoms: '',
      notes: '',
    });
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Health Tracking</h1>
        <p className={styles.subtitle}>Monitor your vital signs and symptoms</p>
      </header>

      {/* Add Entry Form */}
      {!showForm ? (
        <section className={styles.section}>
          <Button variant="primary" size="lg" fullWidth onClick={() => setShowForm(true)}>
            + Log New Entry
          </Button>
        </section>
      ) : (
        <section className={styles.section}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Log Today's Health Metrics</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <Input
                  type="text"
                  name="bloodPressure"
                  placeholder="120/80"
                  label="Blood Pressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  icon={<span>❤️</span>}
                  required
                />
                <Input
                  type="number"
                  name="heartRate"
                  placeholder="72"
                  label="Heart Rate (bpm)"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  icon={<span>💓</span>}
                  required
                />
              </div>

              <Input
                type="number"
                name="weight"
                placeholder="75"
                label="Weight (kg)"
                value={formData.weight}
                onChange={handleInputChange}
                icon={<span>⚖️</span>}
                step="0.1"
                required
              />

              <div className={styles.formGroup}>
                <label className={styles.label}>Symptoms (comma-separated)</label>
                <textarea
                  name="symptoms"
                  placeholder="e.g., Headache, Nausea, Dizziness"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Additional Notes</label>
                <textarea
                  name="notes"
                  placeholder="Add any additional notes..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              <div className={styles.formActions}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  style={{ marginBottom: '0.5rem' }}
                >
                  Save Entry
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  fullWidth
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Health History */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Entries</h2>
        <div className={styles.entriesList}>
          {entries.map((entry) => (
            <div key={entry.id} className={styles.entryCard}>
              <div className={styles.entryHeader}>
                <p className={styles.entryDate}>
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <span className={styles.entryStatus}>✓</span>
              </div>

              <div className={styles.metricsGrid}>
                <div className={styles.metricItem}>
                  <span className={styles.metricIcon}>❤️</span>
                  <p className={styles.metricLabel}>BP</p>
                  <p className={styles.metricValue}>{entry.bloodPressure}</p>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricIcon}>💓</span>
                  <p className={styles.metricLabel}>HR</p>
                  <p className={styles.metricValue}>{entry.heartRate}</p>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.metricIcon}>⚖️</span>
                  <p className={styles.metricLabel}>Weight</p>
                  <p className={styles.metricValue}>{entry.weight} kg</p>
                </div>
              </div>

              {entry.symptoms.length > 0 && (
                <div className={styles.symptomsContainer}>
                  <p className={styles.symptomsLabel}>Symptoms:</p>
                  <div className={styles.symptomsTags}>
                    {entry.symptoms.map((symptom, idx) => (
                      <span key={idx} className={styles.symptomTag}>
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.notes && (
                <p className={styles.entryNotes}>
                  <strong>Notes:</strong> {entry.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className={styles.spacer}></div>
    </div>
  );
};

export default HealthTracking;
