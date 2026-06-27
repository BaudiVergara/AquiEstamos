import Link from "next/link";

type ActionButtonProps = {
  title: string;
  icon: string;
  href: string;
};

export default function ActionButton({
  title,
  icon,
  href,
}: ActionButtonProps) {
  return (
    <Link
  href={href}
  className="
    w-full
    max-w-md
    bg-white
    hover:bg-gray-100
    border
    border-gray-300
    rounded-xl
    p-5
    shadow-sm
    transition
    duration-200
    text-left
    block
  "
>      <div className="flex items-center gap-4">
        <span className="text-3xl">{icon}</span>

        <span className="text-lg font-semibold">
          {title}
        </span>
      </div>
      
    </Link>
  );
}