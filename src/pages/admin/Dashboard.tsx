import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/dashboard/Sidebar';
import DepartmentForm from '../../components/dashboard/DepartmentForm';
import CategoryForm from '../../components/dashboard/CategoryForm';
import ProductForm from '../../components/dashboard/ProductForm';
import UsersList from '../../components/dashboard/UsersList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'departments' | 'categories' | 'products' | 'users'>('departments');

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {activeTab === 'departments' && <DepartmentForm />}
          {activeTab === 'categories' && <CategoryForm />}
          {activeTab === 'products' && <ProductForm />}
          {activeTab === 'users' && <UsersList />}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;