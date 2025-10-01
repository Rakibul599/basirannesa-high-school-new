import React from "react";

const ContactCard: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">যোগাযোগ করুন</h2>
      <div className="space-y-2 text-gray-700">
        <p><span className="font-semibold">ঠিকানা:</span> মুন্সীগঞ্জ সদর, মুন্সীগঞ্জ</p>
        <p><span className="font-semibold">প্রতিষ্ঠান কোড:</span> 3505</p>
        <p><span className="font-semibold">EIIN:</span> 111140</p>
        <p><span className="font-semibold">ইমেইল:</span> basirannesaschool@gmail.com</p>
        <p><span className="font-semibold">মোবাইল:</span> 01309111140</p>
      </div>
    </div>
  );
};

export default ContactCard;