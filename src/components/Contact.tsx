import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'اتصل بنا',
      details: ['01011342972']
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'راسلنا',
      details: ['support@afaq-academy.com', 'info@afaq-academy.com']
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'موقعنا',
      details: ['المملكة العربية السعودية', 'الرياض - شارع الملك فهد']
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'ساعات العمل',
      details: ['السبت - الخميس', '9:00 ص - 5:00 م']
    }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const whatsappMessage = encodeURIComponent(
      `رسالة جديدة من: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\nالرسالة: ${formData.message}`
    );
    window.open(`https://wa.me/201011342972?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-lg bg-sky-100 text-sky-600 text-lg font-medium mb-4">
            تواصل معنا
          </span>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">نحن هنا لمساعدتك</h1>
          <p className="text-xl text-gray-600">
            نحن هنا لمساعدتك والإجابة على جميع استفساراتك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-xl bg-sky-50 text-sky-500 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-lg">{detail}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">أرسل رسالتك</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-3">
                    الاسم
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    placeholder="أدخل اسمك"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-3">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-3">
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    placeholder="اكتب رسالتك هنا"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  إرسال الرسالة
                </button>
              </form>
            </div>
            <div className="relative h-full min-h-[600px]">
              <img 
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=1200" 
                alt="مركز الاتصال"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600/90 to-sky-700/90 mix-blend-multiply"></div>
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-6">نحن نقدر تواصلك معنا</h3>
                  <p className="text-xl text-sky-100">
                    فريقنا جاهز للرد على استفساراتك وتقديم المساعدة التي تحتاجها
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}