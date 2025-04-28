import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { actGetCatalogRequests } from '../../store/catalog/catalogSlice';
import { IoSearch } from 'react-icons/io5';

const UsersList = () => {
  const dispatch = useAppDispatch();
  const { records, loading } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(actGetCatalogRequests());
  }, [dispatch]);

  const filteredUsers = records.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNumber.includes(searchTerm)
  );

  if (loading === 'pending') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="bg-black p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">قائمة المستخدمين</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="بحث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-3 font-semibold">الاسم</th>
              <th className="pb-3 font-semibold">البريد الإلكتروني</th>
              <th className="pb-3 font-semibold">رقم الهاتف</th>
              <th className="pb-3 font-semibold">العنوان</th>
              <th className="pb-3 font-semibold">تاريخ التسجيل</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-4">{user.fullName}</td>
                <td className="py-4">{user.email}</td>
                <td className="py-4">{user.phoneNumber}</td>
                <td className="py-4">{user.address}</td>
                <td className="py-4">
                  {new Date(user.createdAt).toLocaleDateString('ar-AE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            {searchTerm ? 'لا توجد نتائج للبحث' : 'لا يوجد مستخدمين حتى الآن'}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;