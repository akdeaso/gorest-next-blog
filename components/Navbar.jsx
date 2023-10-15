import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 p-4">
      <div className="flex justify-center">
        <Link href="/" className="text-white font-semibold mr-4">
          Home
        </Link>
        <Link href="/users" className="text-white font-semibold">
          Users
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
