'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/components/Dashboard/Dashboard.module.css';
import { School01Icon, UserGroupIcon, AnalyticsUpIcon } from 'hugeicons-react';

export default function SuperAdminDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, this would use a real token
    const token = 'super-admin-token';
    
    fetch('/api/super-admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch platform metrics');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.loading}>Loading platform metrics...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>Platform Control Plane</h1>
          <p className={styles.date}>Super Admin Dashboard</p>
        </div>
        <Link href="/super-admin/schools/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <School01Icon size={20} />
          Add School
        </Link>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ background: '#e0e7ff', color: '#4f46e5' }}>
            <School01Icon size={24} />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Total Schools</p>
            <p className={styles.statValue}>{data?.metrics?.total_schools || 0}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ background: '#dcfce7', color: '#4338ca' }}>
            <UserGroupIcon size={24} />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Active Subscriptions</p>
            <p className={styles.statValue}>{data?.metrics?.total_schools || 0}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ background: '#fef3c7', color: '#15803d' }}>
            <AnalyticsUpIcon size={24} />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Platform MRR</p>
            <p className={styles.statValue}>$0</p>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.agendaSection}>
          <h2 className={styles.sectionTitle}>Registered Schools</h2>
          <div className={styles.agendaList}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {data?.schools?.map((school: any) => (
              <Link key={school.id} href={`/super-admin/schools/${school.id}`} className={styles.agendaItem} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.agendaTime}>
                  <School01Icon size={20} color="#64748b" />
                </div>
                <div className={styles.agendaDetails}>
                  <p className={styles.agendaSubject}>{school.name}</p>
                  <p className={styles.agendaTopic}>{school.slug} • {new Date(school.createdAt).toLocaleDateString()}</p>
                </div>
                <div className={styles.agendaStatus} style={{ color: '#16a34a', background: '#dcfce7' }}>
                  Customize
                </div>
              </Link>
            ))}
            {(!data?.schools || data.schools.length === 0) && (
              <p style={{ color: '#64748b' }}>No schools registered yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
