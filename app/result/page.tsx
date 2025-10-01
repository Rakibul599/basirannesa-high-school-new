export default function ResultPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">ফলাফল</h1>
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6 justify-center items-start">
  
        <table className="border border-black border-collapse text-center w-full lg:w-1/2">
          <caption className="font-bold mb-2">এসএসসি পরীক্ষার ফলাফল</caption>
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-2 py-1">সাল</th>
              <th className="border border-black px-2 py-1">পরীক্ষার্থী</th>
              <th className="border border-black px-2 py-1">উত্তীর্ণ</th>
              <th className="border border-black px-2 py-1">পাশের হার</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-black">২০২৫</td><td className="border border-black">১৪৮</td><td className="border border-black">১০২</td><td className="border border-black">৬৯.৩৯%</td></tr>
            <tr><td className="border border-black">২০২৪</td><td className="border border-black">১৬৮</td><td className="border border-black">১৫৪</td><td className="border border-black">৯১.৬৭%</td></tr>
            <tr><td className="border border-black">২০২৩</td><td className="border border-black">১৬০</td><td className="border border-black">১২০</td><td className="border border-black">৭৫.০০%</td></tr>
            <tr><td className="border border-black">২০২২</td><td className="border border-black">১৬২</td><td className="border border-black">১৫১</td><td className="border border-black">৯৩.২১%</td></tr>
            <tr><td className="border border-black">২০২১</td><td className="border border-black">১৫১</td><td className="border border-black">১৪২</td><td className="border border-black">৯৪.০৪%</td></tr>
            <tr><td className="border border-black">২০২০</td><td className="border border-black">১৪৬</td><td className="border border-black">১৩৯</td><td className="border border-black">৯৫.২১%</td></tr>
            <tr><td className="border border-black">২০১৯</td><td className="border border-black">১১৪</td><td className="border border-black">১১০</td><td className="border border-black">৯৬.৪৯%</td></tr>
            <tr><td className="border border-black">২০১৮</td><td className="border border-black">১০৬</td><td className="border border-black">১০৩</td><td className="border border-black">৯৭.১৭%</td></tr>
            <tr><td className="border border-black">২০১৭</td><td className="border border-black">১০৫</td><td className="border border-black">১০০</td><td className="border border-black">৯৫.২৪%</td></tr>
            <tr><td className="border border-black">২০১৬</td><td className="border border-black">৯০</td><td className="border border-black">৮৪</td><td className="border border-black">৯৩.৩৩%</td></tr>
            <tr><td className="border border-black">২০১৫</td><td className="border border-black">৭৬</td><td className="border border-black">৬৮</td><td className="border border-black">৮৯.৪৭%</td></tr>
            <tr><td className="border border-black">২০১৪</td><td className="border border-black">৭১</td><td className="border border-black">৭১</td><td className="border border-black">১০০%</td></tr>
            <tr><td className="border border-black">২০১৩</td><td className="border border-black">৮৬</td><td className="border border-black">৮১</td><td className="border border-black">৯৪.১৯%</td></tr>
            <tr><td className="border border-black">২০১২</td><td className="border border-black">১০৪</td><td className="border border-black">৮৯</td><td className="border border-black">৮৫.৫৮%</td></tr>
            <tr><td className="border border-black">২০১১</td><td className="border border-black">৮০</td><td className="border border-black">৭৮</td><td className="border border-black">৯৭.৫০%</td></tr>
          </tbody>
        </table>

        <table className="border border-black border-collapse text-center w-full lg:w-1/2">
          <caption className="font-bold mb-2">জেএসসি পরীক্ষার ফলাফল</caption>
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black px-2 py-1">সাল</th>
              <th className="border border-black px-2 py-1">পরীক্ষার্থী</th>
              <th className="border border-black px-2 py-1">উত্তীর্ণ</th>
              <th className="border border-black px-2 py-1">পাশের হার</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-black">২০১৯</td><td className="border border-black">২০৮</td><td className="border border-black">১৭৪</td><td className="border border-black">৮৩.৬৫%</td></tr>
            <tr><td className="border border-black">২০১৮</td><td className="border border-black">১৯২</td><td className="border border-black">১৭৭</td><td className="border border-black">৯২.১৯%</td></tr>
            <tr><td className="border border-black">২০১৭</td><td className="border border-black">১৯৭</td><td className="border border-black">১৬৩</td><td className="border border-black">৮২.৭৪%</td></tr>
            <tr><td className="border border-black">২০১৬</td><td className="border border-black">১৬৭</td><td className="border border-black">১৫০</td><td className="border border-black">৮৯.৮২%</td></tr>
            <tr><td className="border border-black">২০১৫</td><td className="border border-black">১২৭</td><td className="border border-black">১২২</td><td className="border border-black">৯৬.০৬%</td></tr>
            <tr><td className="border border-black">২০১৪</td><td className="border border-black">১২৪</td><td className="border border-black">১১৩</td><td className="border border-black">৯১.১৩%</td></tr>
            <tr><td className="border border-black">২০১৩</td><td className="border border-black">১৩৭</td><td className="border border-black">১১৬</td><td className="border border-black">৮৪.৬৭%</td></tr>
            <tr><td className="border border-black">২০১২</td><td className="border border-black">১১০</td><td className="border border-black">১০৭</td><td className="border border-black">৯৭.২৭%</td></tr>
            <tr><td className="border border-black">২০১১</td><td className="border border-black">১১৮</td><td className="border border-black">৮০</td><td className="border border-black">৬৭.৮০%</td></tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}
