import React from 'react';

const groups = [
  { name: 'جروب واتساب فيزياء', link: 'https://wa.me/12345678901' },
  { name: 'جروب واتساب رياضيات', link: 'https://wa.me/12345678902' },
  { name: 'جروب واتساب كيمياء', link: 'https://wa.me/12345678903' },
];

export default function Forum() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-8" dir="rtl">
      <div className="flex-1">
        <div className="max-w-2xl bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-700">منتدى الطلبة</h2>
          <ul className="space-y-4">
            {groups.map((group, idx) => (
              <li key={idx} className="border-b pb-4 flex items-center justify-between">
                <span className="font-bold text-lg text-sky-700">{group.name}</span>
                <a
                  href={group.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition"
                >
                  انضم الآن
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 