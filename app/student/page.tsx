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
    </div>
  );
}
