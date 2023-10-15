import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 p-4">
      <div className="flex justify-center">
        <Link
          href="/"
          className="text-slate-300 hover:bg-slate-700 font-semibold px-4 py-2 m-1 rounded-full"
        >
          Home
        </Link>
        <Link
          href="/users"
          className="text-slate-300 hover:bg-slate-700 font-semibold px-4 py-2 m-1 rounded-full"
        >
          Users
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
