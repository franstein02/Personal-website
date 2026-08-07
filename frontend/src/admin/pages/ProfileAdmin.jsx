import { useState, useEffect } from 'react';
import adminApi from '../lib/adminApi';
import axios from 'axios';

const ProfileAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    tagline: { id: '', en: '' },
    about_heading: { id: '', en: '' },
    about_text: { id: '', en: '' },
    years_exp: 0,
    total_projects: 0,
    total_clients: 0,
    photo_url: '',
    email: '',
    location: '',
    titles: []
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Fetch from public endpoint to prepopulate
      const response = await axios.get('http://localhost:8002/public/home');
      if (response.data && response.data.profile) {
        setFormData(response.data.profile);
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
      setMessage({ type: 'error', text: 'Failed to load profile data.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleLocalizedChange = (field, lang, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value
      }
    }));
  };

  const handleTitleChange = (index, lang, value) => {
    const newTitles = [...formData.titles];
    newTitles[index] = {
      ...newTitles[index],
      text: {
        ...newTitles[index].text,
        [lang]: value
      }
    };
    setFormData(prev => ({ ...prev, titles: newTitles }));
  };

  const addTitle = () => {
    setFormData(prev => ({
      ...prev,
      titles: [...prev.titles, { text: { en: '', id: '' }, order_index: prev.titles.length }]
    }));
  };

  const removeTitle = (index) => {
    setFormData(prev => ({
      ...prev,
      titles: prev.titles.filter((_, i) => i !== index).map((t, i) => ({ ...t, order_index: i }))
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    
    try {
      await adminApi.put('/admin/profile', formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Failed to update profile", error);
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center" style={{ color: 'var(--text-muted)' }}>Loading profile data...</div>;
  }

  return (
    <div className="w-full pb-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Profile Settings</h1>
      </div>

      {message && (
        <div 
          className={`fixed bottom-8 right-8 px-6 py-4 rounded-xl text-sm font-medium border shadow-2xl z-50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 ${
            message.type === 'success' ? 'text-green-500' : 'text-red-500'
          }`} 
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          {message.type === 'success' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          )}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="p-6 rounded-2xl border space-y-6" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          <h2 className="text-lg font-semibold border-b pb-4" style={{ borderColor: 'var(--border)' }}>Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">FULL NAME</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">EMAIL</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">LOCATION</label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">PHOTO URL</label>
              <input
                type="text"
                name="photo_url"
                value={formData.photo_url}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
          </div>
        </div>

        {/* Profile Titles */}
        <div className="p-6 rounded-2xl border space-y-6" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-lg font-semibold">Profile Titles</h2>
            <button type="button" onClick={addTitle} className="text-sm font-medium eyebrow hover:opacity-80">+ ADD TITLE</button>
          </div>
          
          <div className="space-y-4">
            {formData.titles.map((title, index) => (
              <div key={index} className="flex gap-4 items-start p-4 border rounded-xl" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-2)' }}>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium eyebrow">TITLE (EN)</label>
                    <input
                      type="text"
                      value={title.text.en}
                      onChange={(e) => handleTitleChange(index, 'en', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium eyebrow">TITLE (ID)</label>
                    <input
                      type="text"
                      value={title.text.id}
                      onChange={(e) => handleTitleChange(index, 'id', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                    />
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => removeTitle(index)}
                  className="mt-6 p-2 rounded-lg border text-red-500 hover:bg-red-500/10 transition-colors"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            ))}
            {formData.titles.length === 0 && (
              <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>No titles added yet.</p>
            )}
          </div>
        </div>

        {/* Tagline */}
        <div className="p-6 rounded-2xl border space-y-6" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          <h2 className="text-lg font-semibold border-b pb-4" style={{ borderColor: 'var(--border)' }}>Tagline</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">TAGLINE (EN)</label>
              <input
                type="text"
                value={formData.tagline.en}
                onChange={(e) => handleLocalizedChange('tagline', 'en', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">TAGLINE (ID)</label>
              <input
                type="text"
                value={formData.tagline.id}
                onChange={(e) => handleLocalizedChange('tagline', 'id', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="p-6 rounded-2xl border space-y-6" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          <h2 className="text-lg font-semibold border-b pb-4" style={{ borderColor: 'var(--border)' }}>About Section</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">ABOUT HEADING (EN)</label>
              <input
                type="text"
                value={formData.about_heading.en}
                onChange={(e) => handleLocalizedChange('about_heading', 'en', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">ABOUT HEADING (ID)</label>
              <input
                type="text"
                value={formData.about_heading.id}
                onChange={(e) => handleLocalizedChange('about_heading', 'id', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">ABOUT TEXT (EN)</label>
              <textarea
                value={formData.about_text.en}
                onChange={(e) => handleLocalizedChange('about_text', 'en', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">ABOUT TEXT (ID)</label>
              <textarea
                value={formData.about_text.id}
                onChange={(e) => handleLocalizedChange('about_text', 'id', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="p-6 rounded-2xl border space-y-6" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          <h2 className="text-lg font-semibold border-b pb-4" style={{ borderColor: 'var(--border)' }}>Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">YEARS OF EXP</label>
              <input
                type="number"
                name="years_exp"
                value={formData.years_exp}
                onChange={handleNumberChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">TOTAL PROJECTS</label>
              <input
                type="number"
                name="total_projects"
                value={formData.total_projects}
                onChange={handleNumberChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium eyebrow">TOTAL CLIENTS</label>
              <input
                type="number"
                name="total_clients"
                value={formData.total_clients}
                onChange={handleNumberChange}
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
          >
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileAdmin;
