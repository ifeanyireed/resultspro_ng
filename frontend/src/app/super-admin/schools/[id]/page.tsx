'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import styles from '@/components/Dashboard/Dashboard.module.css';
import { 
  PaintBrush01Icon, 
  Upload01Icon, 
  CheckmarkCircle01Icon,
  GlobalIcon,
  School01Icon
} from 'hugeicons-react';

export default function BrandCustomizer() {
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Local state for live preview
  const [branding, setBranding] = useState({
    primary_color: '#4f46e5',
    secondary_color: '#1e1b4b',
    logo_url: '/logo.png'
  });

  const [content, setContent] = useState({
    home: {
      hero_title: '',
      hero_subtitle: ''
    },
    contact: {
      email: '',
      phone: '',
      address: ''
    }
  });

  useEffect(() => {
    // 1. Fetch current branding from Central Intelligence via our backend
    fetch(`/api/tenant/info?school_id=${id}`, {
      headers: { 'X-School-Slug': id as string } // Force specific tenant resolution
    })
      .then(res => res.json())
      .then(data => {
        setTenant(data);
        if (data.branding) setBranding(data.branding);
        if (data.content) setContent(data.content);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load branding data');
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    setError('');

    try {
      const res = await fetch(`/api/super-admin/schools/branding?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer super-admin-token'
        },
        body: JSON.stringify({ branding, content }),
      });

      if (!res.ok) throw new Error('Failed to save branding');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('asset', file);
    formData.append('school_id', id as string);
    formData.append('type', 'logo');

    try {
      const res = await fetch('/api/super-admin/schools/assets/upload', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer super-admin-token' },
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      setBranding({ ...branding, logo_url: url });
    } catch (err: unknown) {
      setError('Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading brand profile...</div>;

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>Brand Customizer</h1>
          <p className={styles.date}>{tenant?.name} • {id}</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={handleSave} 
          disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {saving ? 'Saving...' : success ? 'Saved!' : 'Save Changes'}
          {success ? <CheckmarkCircle01Icon size={20} /> : <PaintBrush01Icon size={20} />}
        </button>
      </header>

      <div className={styles.mainGrid}>
        {/* Branding Section */}
        <section className={styles.agendaSection}>
          <h2 className={styles.sectionTitle}>Visual Identity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Logo Upload */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ width: '100px', height: '100px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <img src={branding.logo_url} alt="Logo Preview" style={{ maxWidth: '80%', height: 'auto' }} />
              </div>
              <button 
                className="btn btn-secondary" 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Upload01Icon size={20} />
                {uploading ? 'Uploading...' : 'Change Logo'}
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleLogoUpload} 
                style={{ display: 'none' }} 
                accept="image/*" 
              />
            </div>

            {/* Color Pickers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Primary Color</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="color" 
                    value={branding.primary_color} 
                    onChange={e => setBranding({...branding, primary_color: e.target.value})}
                    style={{ width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input 
                    type="text" 
                    value={branding.primary_color} 
                    className={styles.input}
                    onChange={e => setBranding({...branding, primary_color: e.target.value})}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Secondary Color</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="color" 
                    value={branding.secondary_color} 
                    onChange={e => setBranding({...branding, secondary_color: e.target.value})}
                    style={{ width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input 
                    type="text" 
                    value={branding.secondary_color} 
                    className={styles.input}
                    onChange={e => setBranding({...branding, secondary_color: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marketing Copy Section */}
        <section className={styles.agendaSection}>
          <h2 className={styles.sectionTitle}>Marketing Truth (Copy)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Hero Title</label>
              <input 
                type="text" 
                className={styles.input}
                value={content.home.hero_title}
                onChange={e => setContent({...content, home: {...content.home, hero_title: e.target.value}})}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Hero Subtitle</label>
              <textarea 
                className={styles.input}
                style={{ height: '80px', padding: '0.75rem' }}
                value={content.home.hero_subtitle}
                onChange={e => setContent({...content, home: {...content.home, hero_subtitle: e.target.value}})}
              />
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className={styles.agendaSection} style={{ gridColumn: '1 / -1' }}>
          <h2 className={styles.sectionTitle}>Global Contact Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Official Email</label>
              <input 
                type="email" 
                className={styles.input}
                value={content.contact.email}
                onChange={e => setContent({...content, contact: {...content.contact, email: e.target.value}})}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Primary Phone</label>
              <input 
                type="text" 
                className={styles.input}
                value={content.contact.phone}
                onChange={e => setContent({...content, contact: {...content.contact, phone: e.target.value}})}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Full Address</label>
              <input 
                type="text" 
                className={styles.input}
                value={content.contact.address}
                onChange={e => setContent({...content, contact: {...content.contact, address: e.target.value}})}
              />
            </div>
          </div>
        </section>
      </div>

      {error && <div className={styles.error} style={{ marginTop: '1rem' }}>{error}</div>}
    </div>
  );
}
