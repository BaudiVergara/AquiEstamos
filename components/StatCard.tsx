type Props = {
  icon: string;
  value: number;
  label: string;
};

export default function StatCard({
  icon,
  value,
  label,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center">
      <div className="text-4xl">{icon}</div>

      <p className="mt-3 text-3xl font-bold text-blue-700">
        {value}
      </p>

      <p className="mt-1 text-gray-600 font-medium">
        {label}
      </p>
    </div>
  );
}