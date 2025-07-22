interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className='flex justify-between border-b border-[#D1D5DB] py-2'>
      <span className='text-[#050505]'>{label}</span>
      <span className='font-medium text-[#222020]'>{value}</span>
    </div>
  );
}
export default DetailRow;