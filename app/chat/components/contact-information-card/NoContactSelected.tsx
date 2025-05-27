import { UserCircle } from 'lucide-react';

const NoContactSelected = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full p-6 text-center bg-gray-50 rounded-lg'>
      <div className='text-gray-400 mb-4'>
        <UserCircle
          className='h-16 w-16 mx-auto' 
        />{' '}
      </div>
      <h2 className='text-xl font-semibold text-gray-700 mb-2'>
        No Contact Selected
      </h2>
      <p className='text-gray-500 mb-4'>
        Please select a contact from the list to start chatting
      </p>
      <div className='text-sm text-gray-400'>
        <span className='inline-block border-b border-dashed border-gray-400'>
          Select a contact from the sidebar
        </span>
      </div>
    </div>
  );
};

export default NoContactSelected;
