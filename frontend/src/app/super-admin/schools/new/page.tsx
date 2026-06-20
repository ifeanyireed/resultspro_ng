'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/components/Dashboard/Dashboard.module.css';
import { ArrowRight01Icon } from 'hugeicons-react';

export default function CreateSchoolPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    domain: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/super-admin/schools/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer super-admin-token'
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create school');

      const school = await res.json();
      router.push(`/super-admin/schools/${school.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>Onboard New School</h1>
        <p className={styles.date}>Provision a new white-label tenant</p>
      </header>

      <div className={styles.mainGrid} style={{ gridTemplateColumns: '1fr' }}>
        <section className={styles.agendaSection}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
            {error && <div className={styles.error}>{error}</div>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>School Name</label>
              <input 
                type="text" 
                placeholder="e.g. Loral International School"
                className={styles.input}
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>URL Slug</label>
              <input 
                type="text" 
                placeholder="e.g. loral-intl"
                className={styles.input}
                value={formData.slug}
                onChange={e => setFormData({...formData, slug: e.target.value})}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Custom Domain</label>
              <input 
                type="text" 
                placeholder="e.g. www.loralschools.com"
                className={styles.input}
                value={formData.domain}
                onChange={e => setFormData({...formData, domain: e.target.value})}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
              style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {loading ? 'Provisioning...' : 'Create School'}
              <ArrowRight01Icon size={20} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
