import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface MobileNavbarProps {
  isOpen: boolean;
  toggle: () => void;
  items: { path: string; label: string }[];
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isOpen,
  toggle,
  items,
}) => {
  const { pathname } = useRouter();

  return (
    <div
      className={clsx(
        "fixed w-[75%] h-screen bg-white top-0 transition-all duration-500 z-50",
        isOpen ? "left-0" : "-left-full"
      )}
    >
      <nav>
        {items.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={clsx("block py-2", {
              "text-primary": pathname === item.path,
            })}
            onClick={toggle}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileNavbar;
