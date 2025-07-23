import React from 'react';
import { MapPin, ShoppingCart, Phone, Info, CheckCircle } from 'lucide-react';

const storesByGov = [
  {
    governorate: 'أسوان',
    stores: [
      {
        name: 'مكتبة فريحه',
        phone: '01224995742',
        address: 'أسوان - ادفو - شارع خلف المستشفى العام',
        booksOnly: true,
        note: 'متاح كتب فقط'
      },
      {
        name: 'مكتبة معاذ',
        phone: '01219987907',
        address: 'أسوان مركز ادفو موقف الحاجر بجوار مدرسة السيدة خديجة الثانوية بنات',
        booksOnly: true,
        note: 'متاح كتب فقط'
      }
    ]
  },
  {
    governorate: 'كفر الشيخ',
    stores: [
      {
        name: 'مكتبة مكلاك',
        phone: '01278501832',
        address: 'كفر الشيخ شارع المصنع أبراج الجمال بجوار البنك الزراعي',
        booksOnly: true,
        note: 'متاح كتب فقط'
      },
      {
        name: 'مكتبة مكلاك',
        phone: '01000458271',
        address: 'كفر الشيخ دسوق شارع عبد العزيز',
        booksOnly: true,
        note: 'متاح كتب فقط'
      }
    ]
  }
];

export default function BookStores() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-8" dir="rtl">
      <div className="flex-1">
        <div className="py-8">
          {storesByGov.map((gov, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="text-2xl font-bold text-sky-700 mb-6 flex items-center gap-2">
                <span>محافظة {gov.governorate}</span>
                <Info className="w-6 h-6 text-sky-400" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gov.stores.map((store, sidx) => (
                  <div key={sidx} className="bg-blue-50 rounded-xl p-6 shadow flex flex-col gap-2 border border-blue-100">
                    <div className="flex items-center gap-2 font-bold text-lg text-sky-700">
                      <ShoppingCart className="w-5 h-5" /> اسم المركز: {store.name}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-5 h-5" /> رقم التواصل: {store.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-5 h-5" /> العنوان: {store.address}
                    </div>
                    <div className="flex items-center gap-2 text-green-600 font-bold">
                      <CheckCircle className="w-5 h-5" /> {store.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 