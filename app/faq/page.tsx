"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector<HTMLElement>(".navbar");
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("bg-opacity-95");
          navbar.classList.remove("bg-opacity-80");
        } else {
          navbar.classList.add("bg-opacity-80");
          navbar.classList.remove("bg-opacity-95");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const faqItems: FAQItem[] = [
    {
      question: "বছিরননেছা উচ্চ বিদ্যালয় কোথায় অবস্থিত?",
      answer:
        "📍 বিদ্যালয়টি বাংলাদেশের মুন্সীগঞ্জ সদর উপজেলার রামপাল ইউনিয়নে অবস্থিত।",
    },
    {
      question: "বিদ্যালয়টি কবে প্রতিষ্ঠিত হয়েছিল?",
      answer: "🏫 বিদ্যালয়টি প্রতিষ্ঠিত হয় ১৯৭২ সালে।",
    },
    {
      question: "কোন কোন শ্রেণিতে পাঠদান করা হয়?",
      answer: "✏️ বর্তমানে ৬ষ্ঠ থেকে ১০ম শ্রেণি পর্যন্ত শিক্ষাদান করা হয়।",
    },
    {
      question: "বিদ্যালয়ে কি ল্যাবরেটরি ও গ্রন্থাগারের সুবিধা রয়েছে?",
      answer:
        "🔬 হ্যাঁ, এখানে পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ও কম্পিউটার ল্যাব রয়েছে। এছাড়াও একটি সমৃদ্ধ গ্রন্থাগার রয়েছে যেখানে হাজারো বই আছে।",
    },
    {
      question: "বিদ্যালয়ে কি ছেলে-মেয়ে উভয়েরই পড়ার সুযোগ রয়েছে?",
      answer:
        "👩‍🎓👨‍🎓 হ্যাঁ, শুরুতে শুধুমাত্র মেয়েদের জন্য হলেও বর্তমানে ছেলে-মেয়ে উভয়েই পড়াশোনা করতে পারে।",
    },
  ];

  return (
    <div className="px-4 md:px-20">
    
      {/* FAQ Section */}
      <section className="my-28">
        <h1 className="text-4xl font-bold text-center mb-10">
        জিজ্ঞাসা ও  <span className="text-red-500">উত্তর</span>
        </h1>

        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className="collapse collapse-arrow border border-blue-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-medium text-gray-800">
                {item.question}
              </div>
              <div className="collapse-content text-gray-700 pt-2">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
