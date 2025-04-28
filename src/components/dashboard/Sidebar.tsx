import { IoGridOutline, IoLayersOutline, IoCubeOutline, IoPeopleOutline } from 'react-icons/io5';

interface SidebarProps {
  activeTab: 'departments' | 'categories' | 'products' | 'users';
  setActiveTab: (tab: 'departments' | 'categories' | 'products' | 'users') => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-64 bg-black border-r border-gray-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white mb-8">لوحة التحكم</h1>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('departments')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'departments'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <IoGridOutline size={20} />
            <span className="mr-3">الأقسام</span>
          </button>
          
          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'categories'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <IoLayersOutline size={20} />
            <span className="mr-3">الفئات</span>
          </button>
          
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'products'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <IoCubeOutline size={20} />
            <span className="mr-3">المنتجات</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
              activeTab === 'users'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <IoPeopleOutline size={20} />
            <span className="mr-3">المستخدمين</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;