import Link from "next/link";
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="flex items-center justify-center text-center mt-3 mb-2">
        <ul className="flex gap-4 text-md">
          <li className="cursor-pointer hover:underline  ">
            <Link href="/">হোম</Link>
          </li>
          <li>&gt;</li>
          <li>আমাদের সম্পর্কে</li>
        </ul>
      </nav>
      <div className="border-t-[1px] border-black" />
      {children}
    </div>
  );
}
