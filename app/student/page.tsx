import { headers } from "next/headers";

interface Section {
  section: string;
  boys: number;
  girls: number;
}

interface ClassGroup {
  _id?: string;
  serialNo: number;
  className: string;
  sections: Section[];
}

async function getClasses(): Promise<ClassGroup[]> {
  try {
    const h = await headers();
    const host = h.get("host") ?? "localhost:3000";
    const proto = h.get("x-forwarded-proto") ?? (process.env.NODE_ENV === "production" ? "https" : "http");
    const base = `${proto}://${host}`;
    const res = await fetch(`${base}/studentsection/api/classes`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function BengaliTableReadOnly() {
  const classes = await getClasses(); 

  return (
    <div className="p-6">
      <h1 className="text-lg text-center font-bold mb-4">
        সকল শ্রেণীর শিক্ষার্থীর তথ্য
      </h1>

      <table className="border-collapse border border-gray-400 w-full text-center">
        <thead>
          <tr className="bg-yellow-200">
            <th className="border border-gray-400 p-2">ক্রমিক</th>
            <th className="border border-gray-400 p-2">শ্রেণি</th>
            <th className="border border-gray-400 p-2">শাখা/বিভাগ</th>
            <th className="border border-gray-400 p-2">ছাত্র</th>
            <th className="border border-gray-400 p-2">ছাত্রী</th>
            <th className="border border-gray-400 p-2">মোট</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) =>
            cls.sections.map((sec, sectionIndex) => (
              <tr key={`${cls._id}-${sectionIndex}`}>
                {sectionIndex === 0 && (
                  <>
                    <td
                      rowSpan={cls.sections.length}
                      className="border border-gray-400 p-2"
                    >
                      {cls.serialNo}
                    </td>
                    <td
                      rowSpan={cls.sections.length}
                      className="border border-gray-400 p-2"
                    >
                      {cls.className}
                    </td>
                  </>
                )}
                <td className="border border-gray-400 p-2">{sec.section}</td>
                <td className="border border-gray-400 p-2">{sec.boys}</td>
                <td className="border border-gray-400 p-2">{sec.girls}</td>
                <td className="border border-gray-400 p-2">
                  {sec.boys + sec.girls}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="border-t-[3px] border-[#ae486e] mt-8" />
      <section className="max-w-[90%] mx-auto px-4 py-8">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">ইউনিফর্ম</h2>

      {/* Intro */}
      <p className="text-gray-700 mb-6 leading-relaxed">
        বিদ্যালয়ের সকল শিক্ষার্থীর জন্য নির্দিষ্ট ইউনিফর্ম রয়েছে। ইউনিফর্ম শিক্ষার্থীদের মধ্যে 
        শৃঙ্খলা, সামঞ্জস্য এবং ঐক্যের প্রতীক। নিচে ছেলেদের ও মেয়েদের ইউনিফর্মের বিবরণ দেওয়া হলো:
      </p>

      {/* Boys */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">ছেলেদের ইউনিফর্ম</h3>
        <p className="text-gray-600 mb-2">
          ছেলেদের জন্য স্কুলে নির্ধারিত পোশাক নিচে দেওয়া হলো:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li className="flex items-center gap-2 flex-wrap">
            নীল শার্ট
            <span className="w-5 h-5 rounded border border-gray-400 bg-blue-700 inline-block"></span>
            , কালো প্যান্ট
            <span className="w-5 h-5 rounded border border-gray-400 bg-black inline-block"></span>
            এবং সাদা কেডস
            <span className="w-5 h-5 rounded border border-gray-400 bg-white inline-block"></span>
          </li>
        </ul>
      </div>

      {/* Girls */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">মেয়েদের ইউনিফর্ম</h3>
        <p className="text-gray-600 mb-2">
          মেয়েদের জন্য স্কুলে নির্ধারিত পোশাক নিচে দেওয়া হলো:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li className="flex items-center gap-2 flex-wrap">
            নীল কামিজ
            <span className="w-5 h-5 rounded border border-gray-400 bg-blue-700 inline-block"></span>
            , কামিজের উপর সাদা ড্রেস কোড
            <span className="w-5 h-5 rounded border border-gray-400 bg-white inline-block"></span>
            , কোমরে সাদা বেল্ট
            <span className="w-5 h-5 rounded border border-gray-400 bg-white inline-block"></span>
            এবং সাদা কেডস
            <span className="w-5 h-5 rounded border border-gray-400 bg-white inline-block"></span>
          </li>
        </ul>
      </div>
    </section>
    </div>
  );
}
