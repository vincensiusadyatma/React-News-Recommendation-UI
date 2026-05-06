type CardProps = {
  title: string;
  children: React.ReactNode;
};

const ChartCard = ({ title, children }: CardProps) => {
  return (
    <div className="relative overflow-hidden bg-[#1e293b]/80 border border-white/10 rounded-2xl p-5 shadow-xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-200">
        {title}
      </h2>

      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;