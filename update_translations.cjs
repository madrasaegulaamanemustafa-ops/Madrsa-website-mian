const fs = require('fs');

let content = fs.readFileSync('src/i18n/translations.ts', 'utf8');

const enItems = `items: [
        {
          id: 1,
          category: "safety",
          title: "Live Classes",
          desc: "Full safety with separate classes. Female students are taught by female Aalima & Muftiya teachers, while male students are taught by male Aalim & Mufti teachers. All live class videos ensure strict privacy with audio securely muted for females.",
        },
        {
          id: 2,
          category: "safety",
          title: "Class Recordings",
          desc: "Never worry about missing a class. If you ever miss a live session, you can easily access the recordings anytime to catch up and revise at your own pace.",
        },
        {
          id: 3,
          category: "safety",
          title: "Digital Notes",
          desc: "Perfect for housewives and working professionals. If writing notes during class isn't possible for you, don't worry! Complete digital notes are provided so you can conveniently revise and understand the lesson on your own time. Your education won't stop due to a busy schedule.",
        },
        {
          id: 4,
          category: "exams",
          title: "Weekly Tests",
          desc: "Take weekly tests on our dedicated Madrasa application to check how well you have prepared this week's lessons. Improve your preparation, track your progress, and get better every week! Read → Test → Analyze → Improve.",
        },
        {
          id: 5,
          category: "exams",
          title: "15-Day Exams",
          desc: "Written exams are conducted every 15 days on our custom app to evaluate your educational progress. Test your preparation and become better with every exam!",
        },
        {
          id: 6,
          category: "tech",
          title: "24/7 AI Learning Platform",
          desc: "Access round-the-clock AI support for learning and revision. Simply upload a screenshot or image of any lesson, and generate interactive Q&A quizzes and detailed notes instantly.",
        },
        {
          id: 7,
          category: "tech",
          title: "Zayrik Live Classroom",
          desc: "Through the advanced Zayrik version, your teachers will be equipped to explain complex lessons 100% better and more effectively during live classes.",
        },
        {
          id: 8,
          category: "tech",
          title: "AI Sunni Teacher",
          desc: "Ask any question related to the Holy Quran, Sihah Sitta Hadiths, Bahar-e-Shariat rulings, or daily Islamic life, and get instant, accurate answers from our AI Sunni Teacher.",
        },
        {
          id: 9,
          category: "tech",
          title: "AI D.E.N Teacher",
          desc: "Got a question about the Dars-e-Nizami (Aalima Course) curriculum? Just ask! The AI D.E.N Teacher will instantly provide answers and help explain the lesson in an easy, understandable way.",
        },
        {
          id: 10,
          category: "exams",
          title: "Game-Based Learning",
          desc: "Experience game-based learning for live classes. Enjoy Islamic education and learning activities in a fun, interactive, and playful manner.",
        },
        {
          id: 11,
          category: "exams",
          title: "Monthly Fatah-E-Battle",
          desc: "Participate in our monthly Fatah-E-Battle competitions. Showcase your skills, compete with others, and achieve victory!",
        },
        {
          id: 12,
          category: "exams",
          title: "Student Progress Tracking",
          desc: "A dedicated tracking system to continuously monitor and report on your educational journey and academic progress.",
        },
        {
          id: 13,
          category: "exams",
          title: "Certificates & Recognition",
          desc: "Students receive certificates, awards, and special recognition for outstanding performance in courses and exams. Additionally, female graduates will have an offline Dastar-e-Fazilat ceremony to make their educational success truly memorable.",
        },
        {
          id: 14,
          category: "safety",
          title: "24/7 IT Support",
          desc: "Our IT team is ready 24/7 for any technical issues regarding the app or website. Female students get a dedicated Female IT Department, and male students get a Male IT Department. Full safety and secure support—Alhamdulillah!",
        },
        {
          id: 15,
          category: "safety",
          title: "Private Student Chat",
          desc: "Chat with your classmates in a group after live classes without sharing your phone number. A completely safe, private, and secure chat system.",
        }
      ]`;

const urItems = `items: [
        {
          id: 1,
          category: "safety",
          title: "لائیو کلاسز",
          desc: "خواتین استانیوں کے ساتھ اور مرد حضرات استاد کے ساتھ لائیو کلاس میں تعلیم، مکمل حفاظت کے ساتھ۔ فی میل کو فی میل عالمہ مفتیہ پڑھاتی ہیں، اور میل کو میل عالم مفتی پڑھاتے ہیں۔ (خواتین کی پرائیویسی کے لیے ویڈیو کی آواز میوٹ رکھی گئی ہے)۔",
        },
        {
          id: 2,
          category: "safety",
          title: "کلاس ریکارڈنگز",
          desc: "اگر کبھی لائیو کلاس مس ہو جائے تو فکر کی بات نہیں، آپ ریکارڈنگ کے ذریعے دوبارہ پڑھ سکتے ہیں اور اپنا سبق دہرا سکتے ہیں۔",
        },
        {
          id: 3,
          category: "safety",
          title: "ڈیجیٹل نوٹس",
          desc: "اگر آپ گھریلو خاتون ہیں یا جاب کرتے ہیں اور ہر وقت نوٹس لکھنا آپ کے لیے ممکن نہیں، تو کوئی بات نہیں! آپ کے لیے ضروری ڈیجیٹل نوٹس کا انتظام کیا گیا ہے تاکہ آپ اپنے وقت پر نوٹس دیکھ کر آسانی سے سبق سمجھ سکیں۔ وقت کم ہو یا مصروفیت زیادہ—آپ کی تعلیم نہیں رکے گی!",
        },
        {
          id: 4,
          category: "exams",
          title: "ہفتہ وار ٹیسٹ",
          desc: "ہر ہفتے مدرسہ کی اپنی موبائل ایپ پر ٹیسٹ دیں اور چیک کریں کہ آپ نے اس ہفتے کتنا سبق اچھی طرح تیار کیا ہے۔ ٹیسٹ کے ذریعے اپنی کارکردگی کو بہتر بنائیں۔ پڑھیں → ٹیسٹ دیں → اپنی پرفارمنس دیکھیں → اور بہتر کریں!",
        },
        {
          id: 5,
          category: "exams",
          title: "15 روزہ امتحانات",
          desc: "ہر 15 دن بعد مدرسہ کی ایپ پر تحریری امتحان (Written Exam) دیں اور اپنی تعلیمی پروگریس چیک کریں! اپنی تیاری کو پرکھیے اور ہر امتحان کے ساتھ بہتر بنیے۔",
        },
        {
          id: 6,
          category: "tech",
          title: "24/7 اے آئی لرننگ پلیٹ فارم",
          desc: "تعلیم اور دہرانے کے لیے 24 گھنٹے اے آئی سپورٹ۔ کسی بھی سبق کا اسکرین شاٹ اپ لوڈ کر کے اس سے سوال جواب، کوئز، اور نوٹس تک فوراً تیار کریں۔",
        },
        {
          id: 7,
          category: "tech",
          title: "زائرک لائیو کلاس",
          desc: "زائرک ورژن کے ذریعے آپ کے اساتذہ لائیو کلاس میں آپ کو سبق 100% بہتر اور آسان طریقے سے سمجھانے میں مدد حاصل کریں گے۔",
        },
        {
          id: 8,
          category: "tech",
          title: "اے آئی سنی ٹیچر",
          desc: "صحاح ستہ کی کوئی حدیث ہو، قرآن پاک سے سوال ہو، بہارِ شریعت کا مسئلہ ہو یا دینی زندگی کا کوئی سوال—اے آئی سنی ٹیچر سے پوچھیں اور فوراً جواب پائیں۔",
        },
        {
          id: 9,
          category: "tech",
          title: "اے آئی ڈی ای این ٹیچر",
          desc: "درس نظامی (عالمہ کورس) کے سبق سے جڑا کوئی بھی سوال ہو—بس پوچھیں! اے آئی ڈی ای این ٹیچر فوراً جواب دے گا اور سبق کو آسان انداز میں سمجھانے میں مدد کرے گا۔",
        },
        {
          id: 10,
          category: "exams",
          title: "گیم بیسڈ لرننگ",
          desc: "لائیو کلاسز کے لیے گیم بیسڈ لرننگ۔ کھیل کھیل میں دینی تعلیم اور سرگرمیاں تاکہ سیکھنا دلچسپ اور آسان ہو۔",
        },
        {
          id: 11,
          category: "exams",
          title: "ماہانہ فتحِ بیٹل مقابلہ",
          desc: "ہر مہینے مقابلوں میں حصہ لیں، اپنی صلاحیتیں دکھائیں اور نمایاں کامیابی (فتح) حاصل کریں۔",
        },
        {
          id: 12,
          category: "exams",
          title: "طالب علم کی پیشرفت ٹریکنگ",
          desc: "آپ کی تعلیمی کارکردگی اور پروگریس کو باقاعدگی سے ٹریک کرنے کا ایک جدید اور مکمل نظام۔",
        },
        {
          id: 13,
          category: "exams",
          title: "سرٹیفکیٹ اور اعزازات",
          desc: "بہترین کارکردگی پر طلباء کو سرٹیفکیٹ اور ایوارڈز۔ کورس مکمل کرنے والی طالبات کے لیے آف لائن دستارِ فضیلت کا انتظام، تاکہ ان کی محنت کو یادگار بنایا جا سکے۔",
        },
        {
          id: 14,
          category: "safety",
          title: "24/7 آئی ٹی سپورٹ",
          desc: "کسی بھی ٹیکنیکل مسئلے کے لیے آئی ٹی ٹیم 24/7 تیار ہے۔ خواتین کے لیے فی میل آئی ٹی ڈیپارٹمنٹ اور مردوں کے لیے میل آئی ٹی ڈیپارٹمنٹ۔ فل سیفٹی اور پرائیویسی—الحمدللہ!",
        },
        {
          id: 15,
          category: "safety",
          title: "پرائیویٹ چیٹ سسٹم",
          desc: "لائیو کلاس کے بعد اپنے ہم جماعتوں کے ساتھ گروپ میں چیٹ کریں—بغیر نمبر شیئر کیے، مکمل پرائیویسی کے ساتھ۔ ایک محفوظ اور پرائیویٹ چیٹ سسٹم۔",
        }
      ]`;

const hiItems = `items: [
        {
          id: 1,
          category: "safety",
          title: "लाइव क्लासेस",
          desc: "पूर्ण सुरक्षा के साथ अलग-अलग कक्षाएं। महिला छात्रों को महिला शिक्षिकाएं (आलिमा व मुफ्तिया) और पुरुष छात्रों को पुरुष शिक्षक (आलिम व मुफ्ती) पढ़ाते हैं। (महिलाओं की गोपनीयता के लिए वीडियो ऑडियो म्यूट है)।",
        },
        {
          id: 2,
          category: "safety",
          title: "क्लास रिकॉर्डिंग्स",
          desc: "अगर कभी लाइव क्लास छूट जाए, तो कोई चिंता नहीं। आप रिकॉर्डिंग के जरिए कभी भी दोबारा पढ़ सकते हैं और अपना सबक दोहरा सकते हैं।",
        },
        {
          id: 3,
          category: "safety",
          title: "डिजिटल नोट्स",
          desc: "अगर आप गृहिणी हैं या जॉब करते हैं और नोट्स लिखना संभव नहीं है, तो फिक्र न करें! आपके लिए डिजिटल नोट्स का इंतज़ाम है ताकि आप अपने समय पर सबक आसानी से समझ सकें। समय कम हो या व्यस्तता ज्यादा—आपकी तालीम नहीं रुकेगी!",
        },
        {
          id: 4,
          category: "exams",
          title: "साप्ताहिक टेस्ट",
          desc: "हर हफ्ते मदरसे के अपने ऐप पर टेस्ट दें और चेक करें कि आपने इस हफ्ते कितनी अच्छी तैयारी की है। पढ़ें → टेस्ट दें → परफॉर्मेंस देखें → और हर हफ्ते बेहतर बनें!",
        },
        {
          id: 5,
          category: "exams",
          title: "15-दिवसीय परीक्षा",
          desc: "हर 15 दिन बाद मदरसे के ऐप पर लिखित परीक्षा (Written Exam) दें और अपनी शैक्षणिक प्रगति जाचें! अपनी तैयारी को परखें और हर परीक्षा के साथ बेहतर बनें।",
        },
        {
          id: 6,
          category: "tech",
          title: "24/7 एआई लर्निंग प्लेटफॉर्म",
          desc: "पढ़ाई और रिवीजन के लिए 24 घंटे एआई सपोर्ट। किसी भी सबक का स्क्रीनशॉट अपलोड करके तुरंत सवाल-जवाब, क्विज़ और नोट्स तैयार करें।",
        },
        {
          id: 7,
          category: "tech",
          title: "ज़ायरिक लाइव क्लास",
          desc: "ज़ायरिक तकनीक के जरिए शिक्षक लाइव क्लास में आपको सबक 100% बेहतर और आसान तरीके से समझाने में मदद करेंगे।",
        },
        {
          id: 8,
          category: "tech",
          title: "एआई सुन्नी टीचर",
          desc: "सिहाह सित्ता की हदीस, कुरान, बहार-ए-शरीयत का मसला या कोई भी दीनी सवाल—एआई सुन्नी टीचर से पूछें और तुरंत सही जवाब पाएं।",
        },
        {
          id: 9,
          category: "tech",
          title: "एआई डी.ई.एन टीचर",
          desc: "दर्स-ए-निज़ामी (आलिमा कोर्स) के सबक से जुड़ा कोई भी सवाल हो—बस पूछें! एआई डी.ई.एन टीचर तुरंत आसान भाषा में जवाब देगा और सबक समझाएगा।",
        },
        {
          id: 10,
          category: "exams",
          title: "गेम-बेस्ड लर्निंग",
          desc: "खेल-खेल में दीनी तालीम और गतिविधियां ताकि पढ़ाई दिलचस्प, आसान और मज़ेदार हो सके।",
        },
        {
          id: 11,
          category: "exams",
          title: "मासिक फ़तह-ए-बैटल",
          desc: "हर महीने प्रतियोगिताओं में हिस्सा लें, अपनी प्रतिभा दिखाएं और शानदार जीत (फ़तह) हासिल करें।",
        },
        {
          id: 12,
          category: "exams",
          title: "छात्र प्रगति ट्रैकिंग",
          desc: "आपकी शैक्षणिक प्रगति और परफॉर्मेंस को नियमित रूप से ट्रैक करने की एक बेहतरीन और आधुनिक प्रणाली।",
        },
        {
          id: 13,
          category: "exams",
          title: "सर्टिफिकेट और सम्मान",
          desc: "शानदार प्रदर्शन पर छात्रों को सर्टिफिकेट और अवार्ड्स दिए जाएंगे। कोर्स पूरा करने वाली छात्राओं के लिए ऑफलाइन दस्तार-ए-फ़ज़ीलत का विशेष आयोजन ताकि उनकी मेहनत यादगार बने।",
        },
        {
          id: 14,
          category: "safety",
          title: "24/7 आईटी सपोर्ट",
          desc: "किसी भी तकनीकी समस्या के लिए आईटी टीम 24/7 तैयार है। महिलाओं के लिए अलग फीमेल आईटी विभाग और पुरुषों के लिए मेल आईटी विभाग। पूर्ण सुरक्षा और गोपनीयता—अल्हम्दुलिल्लाह!",
        },
        {
          id: 15,
          category: "safety",
          title: "प्राइवेट छात्र चैट",
          desc: "बिना मोबाइल नंबर शेयर किए सहपाठियों के साथ सुरक्षित ग्रुप चैट। एक पूरी तरह से सुरक्षित और प्राइवेट चैट सिस्टम।",
        }
      ]`;

function replaceItems(langBlock, newItemsStr) {
    const startIdx = content.indexOf(langBlock + ': {');
    if (startIdx === -1) return;
    
    const itemsStart = content.indexOf('items: [', startIdx);
    const itemsEnd = content.indexOf(']', itemsStart) + 1;
    
    content = content.substring(0, itemsStart) + newItemsStr + content.substring(itemsEnd);
}

replaceItems('en', enItems);
replaceItems('ur', urItems);
replaceItems('hi', hiItems);

fs.writeFileSync('src/i18n/translations.ts', content, 'utf8');
console.log('Done replacing translations');
