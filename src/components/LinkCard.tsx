import type { CardProps } from "../Types/CardProps";

const LinkCard = ({ title, color, icon, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#1e293b] border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
    >

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-300 text-sm">{title}</h3>
        <div className={color}>{icon}</div>
      </div>

      <div className={`text-lg font-semibold ${color}`}>
        View Detail →
      </div>

    </div>
  )
}

export default LinkCard;
