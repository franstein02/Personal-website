import { useState, useEffect } from 'react';
import adminApi from '../lib/adminApi';
import axios from 'axios';
import { FiTrash2, FiPlus, FiImage, FiArrowUp, FiArrowDown, FiX } from 'react-icons/fi';

const CertificatesAdmin = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const initialFormState = {
    title: { id: '', en: '' },
    issued_by: { id: '', en: '' },
    issued_date: '',
    order_index: 0,
    images: []
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8002/public/home');
      if (response.data && response.data.certificates) {
        setCertificates(response.data.certificates);
      }
    } catch (error) {
      console.error("Failed to fetch certificates", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCertificates();
  }, []);

  const openCreateModal = () => {
    setIsEditing(false);
    setFormData({
      ...initialFormState,
      order_index: certificates.length > 0 ? Math.max(...certificates.map(c => c.order_index)) + 1 : 0
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cert) => {
    setIsEditing(true);
    // Ensure issued_date is properly formatted for date input (YYYY-MM-DD)
    setFormData({
      ...cert,
      issued_date: cert.issued_date ? cert.issued_date.split('T')[0] : ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
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

  // Image Management
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      // We use adminApi because it requires JWT
      const response = await adminApi.post('/admin/upload/image', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const newImage = {
        image_url: response.data.image_url,
        public_id: response.data.public_id,
        page_order: formData.images.length
      };

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage]
      }));
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image");
    }
  };

  const removeImage = (index) => {
    setFormData(prev => {
      const newImages = prev.images.filter((_, i) => i !== index);
      // Re-index page_order
      return {
        ...prev,
        images: newImages.map((img, i) => ({ ...img, page_order: i }))
      };
    });
  };

  const moveImage = (index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === formData.images.length - 1)
    ) return;

    setFormData(prev => {
      const newImages = [...prev.images];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      
      // Swap
      const temp = newImages[index];
      newImages[index] = newImages[targetIndex];
      newImages[targetIndex] = temp;
      
      // Re-index
      return {
        ...prev,
        images: newImages.map((img, i) => ({ ...img, page_order: i }))
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Clean up formData before sending (e.g. remove ID if editing)
      const payload = {
        title: formData.title,
        issued_by: formData.issued_by,
        issued_date: formData.issued_date || null,
        order_index: formData.order_index,
        images: formData.images.map(img => ({
          image_url: img.image_url,
          public_id: img.public_id,
          page_order: img.page_order
        }))
      };

      if (isEditing) {
        await adminApi.put(`/admin/certificates/${formData.id}`, payload);
      } else {
        await adminApi.post('/admin/certificates', payload);
      }
      
      closeModal();
      fetchCertificates();
    } catch (error) {
      console.error("Failed to save certificate", error);
      alert("Failed to save certificate");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // prevent opening edit modal
    
    if (window.confirm("Are you sure you want to delete this certificate? This will also delete all associated images permanently.")) {
      try {
        await adminApi.delete(`/admin/certificates/${id}`);
        fetchCertificates();
      } catch (error) {
        console.error("Failed to delete certificate", error);
        alert("Failed to delete certificate");
      }
    }
  };

  return (
    <div className="w-full pb-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Certificates</h1>
        <button onClick={openCreateModal} className="btn-primary flex items-center gap-2">
          <FiPlus /> Add New
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center" style={{ color: 'var(--text-muted)' }}>Loading certificates...</div>
      ) : certificates.length === 0 ? (
        <div className="p-12 text-center border border-dashed rounded-2xl" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
          <p>No certificates found. Add your first certificate!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {certificates.map((cert) => {
            const thumbnail = cert.images?.sort((a, b) => a.page_order - b.page_order)[0]?.image_url;
            return (
              <div 
                key={cert.id}
                onClick={() => openEditModal(cert)}
                className="group rounded-2xl border overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
              >
                <div className="aspect-[4/3] bg-neutral-200 dark:bg-neutral-800 relative flex items-center justify-center overflow-hidden">
                  {thumbnail ? (
                    <img src={thumbnail} alt={cert.title.en} className="w-full h-full object-cover" />
                  ) : (
                    <FiImage className="text-3xl text-neutral-400" />
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => handleDelete(e, cert.id)}
                      className="p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 space-y-1.5">
                  <h3 className="font-semibold truncate text-base">{cert.title.en || 'Untitled'}</h3>
                  <div className="flex flex-col gap-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {cert.issued_by?.en && <span className="truncate">{cert.issued_by.en}</span>}
                    {cert.issued_date && <span>{new Date(cert.issued_date).getFullYear()}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 shadow-2xl relative"
            style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            >
              <FiX size={20} />
            </button>
            
            <h2 className="text-2xl font-semibold mb-8 font-display">
              {isEditing ? 'Edit Certificate' : 'Add New Certificate'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Info Section */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium eyebrow">TITLE (EN)</label>
                    <input required type="text" value={formData.title.en} onChange={(e) => handleLocalizedChange('title', 'en', e.target.value)} className="w-full px-4 py-3 rounded-xl border focus:ring-2" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium eyebrow">TITLE (ID)</label>
                    <input required type="text" value={formData.title.id} onChange={(e) => handleLocalizedChange('title', 'id', e.target.value)} className="w-full px-4 py-3 rounded-xl border focus:ring-2" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium eyebrow">ISSUED BY (EN)</label>
                    <input type="text" value={formData.issued_by.en} onChange={(e) => handleLocalizedChange('issued_by', 'en', e.target.value)} className="w-full px-4 py-3 rounded-xl border focus:ring-2" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium eyebrow">ISSUED BY (ID)</label>
                    <input type="text" value={formData.issued_by.id} onChange={(e) => handleLocalizedChange('issued_by', 'id', e.target.value)} className="w-full px-4 py-3 rounded-xl border focus:ring-2" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium eyebrow">ISSUED DATE</label>
                    <input type="date" name="issued_date" value={formData.issued_date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border focus:ring-2" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium eyebrow">ORDER INDEX</label>
                    <input type="number" name="order_index" value={formData.order_index} onChange={handleNumberChange} className="w-full px-4 py-3 rounded-xl border focus:ring-2" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }} />
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="p-6 rounded-2xl border space-y-6" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                  <h3 className="font-semibold text-lg">Certificate Images</h3>
                  <div>
                    <label className="btn-primary cursor-pointer text-sm py-2 px-4 inline-block">
                      Upload Image
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border aspect-[4/3]" style={{ borderColor: 'var(--border)' }}>
                      <img src={img.image_url} alt="Certificate" className="w-full h-full object-cover" />
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                        <div className="flex justify-between">
                          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">#{idx + 1}</span>
                          <button type="button" onClick={() => removeImage(idx)} className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                        <div className="flex justify-center gap-2">
                          <button type="button" disabled={idx === 0} onClick={() => moveImage(idx, 'up')} className="p-1.5 bg-white/20 text-white rounded hover:bg-white/40 disabled:opacity-30">
                            <FiArrowUp size={14} />
                          </button>
                          <button type="button" disabled={idx === formData.images.length - 1} onClick={() => moveImage(idx, 'down')} className="p-1.5 bg-white/20 text-white rounded hover:bg-white/40 disabled:opacity-30">
                            <FiArrowDown size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {formData.images.length === 0 && (
                    <div className="col-span-full py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                      No images uploaded yet. Please upload at least one image.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  Cancel
                </button>
                <button type="submit" disabled={saving || formData.images.length === 0} className="btn-primary">
                  {saving ? 'Saving...' : 'Save Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesAdmin;
