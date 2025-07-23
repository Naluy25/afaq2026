import { Grade, Teacher } from './types';

// بيانات المدرسين
export const teachers: Teacher[] = [
  {
    id: 'ahmed-mohamed',
    name: 'د. أحمد محمد',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    specialization: 'اللغة العربية',
    experience: '15 سنة',
    bio: 'دكتوراه في اللغة العربية وآدابها، خبرة في التدريس لأكثر من 15 عاماً',
    rating: 4.9,
    studentsCount: 1500,
    coursesCount: 12,
    socialLinks: {
      facebook: 'https://facebook.com/ahmed.teacher',
      youtube: 'https://youtube.com/@ahmed.teacher'
    }
  },
  {
    id: 'mahmoud-ali',
    name: 'أ. محمود علي',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    specialization: 'الرياضيات',
    experience: '12 سنة',
    bio: 'ماجستير في الرياضيات، متخصص في تبسيط المفاهيم الرياضية المعقدة',
    rating: 4.8,
    studentsCount: 1200,
    coursesCount: 8,
    socialLinks: {
      facebook: 'https://facebook.com/mahmoud.teacher',
      youtube: 'https://youtube.com/@mahmoud.teacher'
    }
  },
  {
    id: 'sara-ahmed',
    name: 'د. سارة أحمد',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    specialization: 'الفيزياء',
    experience: '10 سنوات',
    bio: 'دكتوراه في الفيزياء، متخصصة في تدريس الفيزياء بطريقة تفاعلية',
    rating: 4.9,
    studentsCount: 1000,
    coursesCount: 6,
    socialLinks: {
      facebook: 'https://facebook.com/sara.teacher',
      youtube: 'https://youtube.com/@sara.teacher'
    }
  }
];

// بيانات الصفوف الدراسية
export const grades: Grade[] = [
  {
    id: '1',
    name: 'الصف الأول الثانوي',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    subjects: [
      {
        id: 'arabic-1',
        name: 'اللغة العربية',
        image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
        courses: [
          {
            id: 'arabic-1-term1',
            name: 'اللغة العربية - الترم الأول',
            description: 'كورس شامل في اللغة العربية للترم الأول يغطي جميع فروع المادة من نحو وأدب ونصوص وبلاغة',
            image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
            price: 599,
            level: 'beginner',
            duration: '16 ساعة',
            instructor: teachers[0],
            lectures: [
              {
                id: 1,
                title: 'المحاضرة الأولى: النحو العربي',
                description: 'أساسيات النحو العربي والجملة الاسمية والفعلية',
                duration: '2 ساعات',
                filesCount: 3,
                videoUrl: 'https://www.youtube.com/watch?v=4qwnsWeF55E',
                downloadUrl: 'https://drive.google.com/file/d/1'
              },
              {
                id: 2,
                title: 'المحاضرة الثانية: البلاغة العربية',
                description: 'مقدمة في علم البلاغة: البيان والمعاني والبديع',
                duration: '2 ساعات',
                filesCount: 4,
                videoUrl: 'https://www.youtube.com/watch?v=4qwnsWeF55E',
                quizUrl: 'https://forms.gle/HaMNX9WXccMSG3cSA',
                homeworkUrl: 'https://forms.gle/HaMNX9WXccMSG3cSA',
                downloadUrl: 'https://drive.google.com/file/d/1'
              }
            ]
          }
        ]
      },
      {
        id: 'math-1',
        name: 'الرياضيات',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
        courses: [
          {
            id: 'math-1-algebra',
            name: 'الجبر - الترم الأول',
            description: 'كورس شامل في الجبر يغطي المعادلات والمتباينات والدوال',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
            price: 699,
            level: 'beginner',
            duration: '20 ساعة',
            instructor: teachers[1],
            lectures: [
              {
                id: 1,
                title: 'المحاضرة الأولى: المعادلات الخطية',
                description: 'حل المعادلات الخطية في متغير واحد',
                duration: '2 ساعات',
                filesCount: 3,
                videoUrl: 'https://www.youtube.com/watch?v=4qwnsWeF55E',
                quizUrl: 'https://forms.gle/HaMNX9WXccMSG3cSA',
                homeworkUrl: 'https://forms.gle/HaMNX9WXccMSG3cSA',
                downloadUrl: 'https://drive.google.com/file/d/1'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'الصف الثاني الثانوي',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    subjects: [
      {
        id: 'physics-2',
        name: 'الفيزياء',
        image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=800',
        courses: [
          {
            id: 'physics-2-mechanics',
            name: 'الميكانيكا - الترم الأول',
            description: 'دراسة شاملة للحركة والقوى والطاقة',
            image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=800',
            price: 799,
            level: 'intermediate',
            duration: '24 ساعة',
            instructor: teachers[2],
            lectures: [
              {
                id: 1,
                title: 'المحاضرة الأولى: الحركة الخطية',
                description: 'مفاهيم السرعة والتسارع والإزاحة',
                duration: '2 ساعات',
                filesCount: 5,
                videoUrl: 'https://www.youtube.com/watch?v=4qwnsWeF55E',
                quizUrl: 'https://forms.gle/HaMNX9WXccMSG3cSA',
                homeworkUrl: 'https://forms.gle/HaMNX9WXccMSG3cSA',
                downloadUrl: 'https://drive.google.com/file/d/1'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'الصف الثالث الثانوي',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
    subjects: [
      {
        id: 'math-3',
        name: 'الرياضيات',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
        courses: [
          {
            id: 'math-3-calculus',
            name: 'التفاضل والتكامل',
            description: 'دراسة شاملة للتفاضل والتكامل وتطبيقاتهما',
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
            price: 899,
            level: 'advanced',
            duration: '30 ساعة',
            instructor: teachers[1],
            lectures: [
              {
                id: 1,
                title: 'المحاضرة الأولى: مقدمة في التفاضل',
                description: 'مفهوم المشتقة وقواعد الاشتقاق',
                duration: '3 ساعات',
                filesCount: 6,
                videoUrl: 'https://www.youtube.com/watch?v=4qwnsWeF55E',
                quizUrl: 'https://forms.gle/HaMNX9WXccMSG3cSA',
                homeworkUrl: 'https://forms.gle/HaMNX9WXccMSG3cSA',
                downloadUrl: 'https://drive.google.com/file/d/1'
              }
            ]
          }
        ]
      }
    ]
  }
];