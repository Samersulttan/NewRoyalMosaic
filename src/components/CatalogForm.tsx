import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { actSubmitCatalogForm, resetStatus } from '../store/catalog/catalogSlice';

interface FormData {
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}

const CatalogForm = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, error } = useAppSelector((state) => state.catalog);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    fullName: '',
    phoneNumber: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await dispatch(actSubmitCatalogForm(formData)).unwrap();
      
      // Create a blob from the response data
      const blob = new Blob([response], { type: 'application/pdf' });
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = 'catalog.pdf';
      
      // Append link to body, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(url);

      enqueueSnackbar('تم تحميل الكتالوج بنجاح', {
        variant: 'success',
        style: { backgroundColor: '#10B981', color: 'white' }
      });

      // Reset form
      setFormData({
        email: '',
        fullName: '',
        phoneNumber: '',
        address: ''
      });

    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: 'error',
        style: { backgroundColor: '#EF4444', color: 'white' }
      });
    } finally {
      dispatch(resetStatus());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-white"
          required
          disabled={loading === 'pending'}
        />
      </div>

      <div>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-white"
          required
          disabled={loading === 'pending'}
        />
      </div>

      <div>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-white"
          required
          disabled={loading === 'pending'}
        />
      </div>

      <div>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-white"
          required
          disabled={loading === 'pending'}
        />
      </div>

      <motion.button
        whileHover={{ scale: loading === 'pending' ? 1 : 1.05 }}
        whileTap={{ scale: loading === 'pending' ? 1 : 0.95 }}
        type="submit"
        disabled={loading === 'pending'}
        className={`w-full py-3 rounded-md transition-all duration-200 
          ${loading === 'pending' 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-white text-black hover:bg-gray-200'}`}
      >
        {loading === 'pending' ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin h-5 w-5 mr-3 border-2 border-black rounded-full border-t-transparent" />
            جاري التحميل...
          </div>
        ) : (
          'Download'
        )}
      </motion.button>
    </form>
  );
};

export default CatalogForm;