

const Rightbar = () => {
  return (
    <div style={{ marginTop: '175px' }}>
      <div className='h-[450px] relative px-4  py-6 mb-5 rounded-lg softBg p-5 rounded-lg'>
        <div className='absolute bottom-0 right-0 w-1/2 h-1/2'>
        </div>
        <div className='flex flex-col gap-6'>
          <span className='font-light regular-text text-2xl'>Scan Result</span>
        </div>
      </div>
      <div className='h-[450px] relative px-5 py-6 mb-5 rounded-lg softBg p-5 rounded-lg'>
        <div className='flex flex-col gap-6'>
          <span className='font-light regular-text text-2xl'>Guardian AI Model</span>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
