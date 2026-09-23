/*
  Nodira's BAD — mahsulotlar ma'lumotlar bazasi.
  Bu yerdagi har bir mahsulotni (nom, narx, tavsif, rasm) keyinchalik
  haqiqiy ma'lumotlarga almashtirish uchun shu faylni tahrirlang.
  Narxlar so'mda (UZS), rasm o'rniga /assets/images/ ichidagi SVG placeholder ishlatilgan.
*/

const BAD_CATEGORIES = [
  {
    id: "vitaminlar",
    name: "Vitaminlar",
    tagline: "Har kungi quvvat va salomatlik uchun asosiy vitaminlar",
    icon: "assets/images/cat-vitaminlar.svg"
  },
  {
    id: "minerallar",
    name: "Minerallar",
    tagline: "Suyak, mushak va nerv tizimini qo'llab-quvvatlovchi minerallar",
    icon: "assets/images/cat-minerallar.svg"
  },
  {
    id: "immunitet",
    name: "Immunitet va Energiya",
    tagline: "Immunitetni mustahkamlash va kun bo'yi energiya uchun",
    icon: "assets/images/cat-immunitet.svg"
  }
];

const BAD_PRODUCTS = (function buildProducts() {
  const catalog = [
    // ---------- VITAMINLAR ----------
    {
      category: "vitaminlar",
      name: "Vitamin C 1000 mg",
      form: "120 Tabletka",
      blurb: "Antioksidant himoya va immunitet uchun yuqori dozali vitamin C.",
      description: "Nodira's BAD Vitamin C 1000 mg — immunitetni qo'llab-quvvatlash, teri salomatligi va antioksidant himoya uchun mo'ljallangan yuqori dozali qo'shimcha. Har bir tabletka kuniga zarur bo'lgan vitamin C miqdorini ta'minlaydi.",
      price: 68000,
      sale: 52000,
      rating: 4.6,
      reviewsSeed: 38
    },
    {
      category: "vitaminlar",
      name: "Vitamin D3 5000 IU",
      form: "90 Softgel",
      blurb: "Suyaklar va immunitet uchun yuqori quvvatli D3 vitamini.",
      description: "Quyosh yetishmasa ham, Vitamin D3 5000 IU kaltsiy singishini yaxshilaydi, suyak zichligini qo'llab-quvvatlaydi va immun tizimi faoliyatida muhim rol o'ynaydi. Yog'da eruvchi formula tezda so'riladi.",
      price: 74000,
      sale: 59000,
      rating: 4.8,
      reviewsSeed: 64
    },
    {
      category: "vitaminlar",
      name: "Vitamin B12 1000 mcg",
      form: "100 Tabletka",
      blurb: "Energiya almashinuvi va nerv tizimi uchun B12.",
      description: "Vitamin B12 hujayra energiyasi ishlab chiqarishda, nerv tizimi salomatligida va qizil qon hujayralari hosil bo'lishida ishtirok etadi. Ayniqsa o'simlik mahsulotlariga asoslangan ovqatlanuvchilar uchun tavsiya etiladi.",
      price: 71000,
      sale: 55000,
      rating: 4.5,
      reviewsSeed: 27
    },
    {
      category: "vitaminlar",
      name: "Vitamin E 400 IU",
      form: "100 Softgel",
      blurb: "Teri va hujayralarni erkin radikallardan himoya qiluvchi antioksidant.",
      description: "Vitamin E kuchli antioksidant sifatida hujayralarni oksidlanish stressidan himoya qiladi, teri va qon tomirlar salomatligini qo'llab-quvvatlaydi.",
      price: 65000,
      sale: 49000,
      rating: 4.4,
      reviewsSeed: 21
    },
    {
      category: "vitaminlar",
      name: "Vitamin A 10 000 IU",
      form: "100 Softgel",
      blurb: "Ko'rish qobiliyati va teri salomatligi uchun.",
      description: "Vitamin A ko'z retinasi funksiyasini, teri yangilanishini va immun tizimini qo'llab-quvvatlaydi. Kunlik ratsionni to'ldirish uchun qulay dozada.",
      price: 62000,
      sale: 47000,
      rating: 4.3,
      reviewsSeed: 15
    },
    {
      category: "vitaminlar",
      name: "Multivitamin Kompleks",
      form: "60 Tabletka",
      blurb: "Kun bo'yi zarur bo'lgan 13 xil vitamin va mineral bir joyda.",
      description: "Nodira's BAD Multivitamin — kundalik ovqatlanishda yetishmasligi mumkin bo'lgan asosiy vitamin va minerallarni to'ldirish uchun mukammal kombinatsiya. Butun oila uchun mos.",
      price: 89000,
      sale: 69000,
      rating: 4.7,
      reviewsSeed: 92
    },
    {
      category: "vitaminlar",
      name: "Vitamin B6 100 mg",
      form: "100 Tabletka",
      blurb: "Metabolizm va asab tizimi faoliyati uchun.",
      description: "Vitamin B6 oqsil va uglevod almashinuvida ishtirok etadi, asab tizimi va kayfiyatni muvozanatlashda muhim rol o'ynaydi.",
      price: 58000,
      sale: 44000,
      rating: 4.2,
      reviewsSeed: 12
    },
    {
      category: "vitaminlar",
      name: "Vitamin K2 + D3",
      form: "60 Softgel",
      blurb: "Kaltsiyni suyaklarga yo'naltiruvchi ikkilamchi formula.",
      description: "K2 va D3 vitaminlari birgalikda kaltsiyning suyak to'qimasiga to'g'ri yo'nalishini va yurak-qon tomir salomatligini qo'llab-quvvatlaydi.",
      price: 81000,
      sale: 63000,
      rating: 4.6,
      reviewsSeed: 33
    },
    {
      category: "vitaminlar",
      name: "Folik Kislota 400 mcg",
      form: "120 Tabletka",
      blurb: "Hujayra bo'linishi va homiladorlik davri uchun muhim.",
      description: "Folik kislota (B9 vitamini) DNK sintezi va hujayra bo'linishida ishtirok etadi, ayniqsa homiladorlikni rejalashtirayotgan ayollar uchun tavsiya etiladi.",
      price: 54000,
      sale: 41000,
      rating: 4.5,
      reviewsSeed: 19
    },
    {
      category: "vitaminlar",
      name: "Biotin 5000 mcg",
      form: "90 Kapsula",
      blurb: "Soch, teri va tirnoqlar salomatligi uchun mashhur vitamin.",
      description: "Biotin (Vitamin B7) keratin ishlab chiqarishni qo'llab-quvvatlaydi, soch va tirnoqlarning mustahkamligiga, teri salomatligiga yordam beradi.",
      price: 77000,
      sale: 61000,
      rating: 4.7,
      reviewsSeed: 71
    },
    {
      category: "vitaminlar",
      name: "Vitamin C + Rux",
      form: "90 Tabletka",
      blurb: "Immunitetni ikki tomonlama qo'llab-quvvatlovchi kombinatsiya.",
      description: "Vitamin C va rux birgalikda immun tizimini mustahkamlashda sinergik ta'sir ko'rsatadi — mavsumiy davrlarda tavsiya etiladi.",
      price: 72000,
      sale: 56000,
      rating: 4.6,
      reviewsSeed: 45
    },
    {
      category: "vitaminlar",
      name: "B-Kompleks Vitaminlari",
      form: "100 Tabletka",
      blurb: "Barcha B guruh vitaminlari bitta formulada.",
      description: "B1, B2, B3, B5, B6, B9, B12 vitaminlarini o'z ichiga olgan kompleks — energiya almashinuvi va nerv tizimi uchun to'liq qo'llab-quvvatlash.",
      price: 79000,
      sale: 62000,
      rating: 4.5,
      reviewsSeed: 28
    },

    // ---------- MINERALLAR ----------
    {
      category: "minerallar",
      name: "Magniy 400 mg",
      form: "100 Tabletka",
      blurb: "Mushaklarni bo'shashtirish va sifatli uyqu uchun.",
      description: "Magniy mushak va nerv faoliyatida, energiya almashinuvida va uyqu sifatida muhim rol o'ynaydigan mineral. Kunlik stressni yengillashtirishga yordam beradi.",
      price: 69000,
      sale: 53000,
      rating: 4.7,
      reviewsSeed: 58
    },
    {
      category: "minerallar",
      name: "Rux (Zinc) 50 mg",
      form: "100 Tabletka",
      blurb: "Immunitet va teri salomatligi uchun asosiy mineral.",
      description: "Rux ko'plab fermentativ jarayonlarda, yaralarning bitishida va immun tizimi javobida ishtirok etadi.",
      price: 57000,
      sale: 43000,
      rating: 4.4,
      reviewsSeed: 24
    },
    {
      category: "minerallar",
      name: "Kaltsiy + D3",
      form: "120 Tabletka",
      blurb: "Suyak va tish salomatligini qo'llab-quvvatlaydi.",
      description: "Kaltsiy va D3 vitamini birgalikda suyak zichligini saqlashga va singishni yaxshilashga yordam beradi — har qanday yoshdagi odam uchun mos.",
      price: 66000,
      sale: 51000,
      rating: 4.6,
      reviewsSeed: 41
    },
    {
      category: "minerallar",
      name: "Temir (Iron) 65 mg",
      form: "100 Tabletka",
      blurb: "Qon tarkibini va energiya darajasini qo'llab-quvvatlovchi temir.",
      description: "Temir qizil qon hujayralarida kislorod tashish uchun zarur. Charchoq va kamqonlik alomatlarini kamaytirishga yordam berishi mumkin.",
      price: 52000,
      sale: 39000,
      rating: 4.3,
      reviewsSeed: 17
    },
    {
      category: "minerallar",
      name: "Kaliy (Potassium) 99 mg",
      form: "100 Tabletka",
      blurb: "Yurak va mushak faoliyati uchun elektrolit.",
      description: "Kaliy suyuqlik balansi, nerv signallari va mushak qisqarishida ishtirok etadigan muhim elektrolit hisoblanadi.",
      price: 49000,
      sale: 37000,
      rating: 4.2,
      reviewsSeed: 11
    },
    {
      category: "minerallar",
      name: "Selen (Selenium) 200 mcg",
      form: "100 Tabletka",
      blurb: "Qalqonsimon bez va antioksidant himoya uchun.",
      description: "Selen qalqonsimon bez faoliyatini va antioksidant tizimni qo'llab-quvvatlaydigan muhim mikroelement.",
      price: 61000,
      sale: 46000,
      rating: 4.5,
      reviewsSeed: 22
    },
    {
      category: "minerallar",
      name: "Xrom Pikolinat 200 mcg",
      form: "100 Tabletka",
      blurb: "Shakar almashinuvini muvozanatlashga yordam beradi.",
      description: "Xrom uglevod va yog' almashinuvida ishtirok etadi, qondagi shakar darajasini muvozanatlashga yordam beruvchi mineral.",
      price: 55000,
      sale: 42000,
      rating: 4.1,
      reviewsSeed: 9
    },
    {
      category: "minerallar",
      name: "Mis (Copper) 2 mg",
      form: "100 Tabletka",
      blurb: "Biriktiruvchi to'qima va tomirlar salomatligi uchun.",
      description: "Mis kollagen hosil bo'lishida, temir almashinuvida va nerv tizimida ishtirok etadigan mikroelement.",
      price: 47000,
      sale: 36000,
      rating: 4.0,
      reviewsSeed: 8
    },
    {
      category: "minerallar",
      name: "Yod (Iodine) Kelp",
      form: "100 Tabletka",
      blurb: "Qalqonsimon bez gormonlari ishlab chiqarish uchun.",
      description: "Yod qalqonsimon bez gormonlarini sintez qilish uchun zarur bo'lgan asosiy mikroelement, tabiiy dengiz o'tlari (kelp) manbasidan olingan.",
      price: 51000,
      sale: 38000,
      rating: 4.3,
      reviewsSeed: 14
    },
    {
      category: "minerallar",
      name: "Marganets 10 mg",
      form: "100 Tabletka",
      blurb: "Suyak va biriktiruvchi to'qima metabolizmi uchun.",
      description: "Marganets suyak shakllanishi, antioksidant fermentlar va uglevod almashinuvida ishtirok etadigan mikroelement.",
      price: 45000,
      sale: 34000,
      rating: 4.0,
      reviewsSeed: 7
    },
    {
      category: "minerallar",
      name: "Kaltsiy Magniy Rux (ZMA)",
      form: "90 Kapsula",
      blurb: "Faol turmush tarzi va sifatli tiklanish uchun kombinatsiya.",
      description: "ZMA — kaltsiy, magniy va ruxning maxsus kombinatsiyasi, mushaklarning tiklanishi va sifatli dam olish uchun mashg'ulot qiluvchilar orasida mashhur.",
      price: 84000,
      sale: 65000,
      rating: 4.6,
      reviewsSeed: 36
    },
    {
      category: "minerallar",
      name: "Elektrolit Minerallar Kompleksi",
      form: "90 Tabletka",
      blurb: "Suyuqlik-tuz balansini tiklovchi kompleks.",
      description: "Natriy, kaliy, magniy va kaltsiyni o'z ichiga olgan elektrolit kompleksi — jismoniy faollik va issiq iqlim sharoitida suyuqlik balansini qo'llab-quvvatlaydi.",
      price: 63000,
      sale: 48000,
      rating: 4.4,
      reviewsSeed: 20
    },

    // ---------- IMMUNITET VA ENERGIYA ----------
    {
      category: "immunitet",
      name: "Omega-3 Baliq Yog'i 1000 mg",
      form: "120 Softgel",
      blurb: "Yurak va miya salomatligini qo'llab-quvvatlovchi EPA/DHA.",
      description: "Nodira's BAD Omega-3 tarkibida yurak-qon tomir va miya faoliyatini qo'llab-quvvatlovchi EPA va DHA yog' kislotalari mavjud. Yopiq formula noxush taʼm va yiringlashni kamaytiradi.",
      price: 92000,
      sale: 71000,
      rating: 4.8,
      reviewsSeed: 103
    },
    {
      category: "immunitet",
      name: "Probiotik 10 Mlrd KOE",
      form: "60 Kapsula",
      blurb: "Ichak mikroflorasini muvozanatlovchi tirik kulturalar.",
      description: "Probiotik kompleks ichak sog'lig'ini, ovqat hazm qilish jarayonini va immun tizimini qo'llab-quvvatlovchi foydali bakteriya kulturalaridan iborat.",
      price: 88000,
      sale: 68000,
      rating: 4.6,
      reviewsSeed: 54
    },
    {
      category: "immunitet",
      name: "Ashwagandha 600 mg",
      form: "90 Kapsula",
      blurb: "Stressga chidamlilikni oshiruvchi adaptogen o'simlik.",
      description: "Ashwagandha — an'anaviy tibbiyotda keng qo'llaniladigan adaptogen, stress darajasini muvozanatlashga va energiya balansini qo'llab-quvvatlashga yordam beradi.",
      price: 79000,
      sale: 61000,
      rating: 4.7,
      reviewsSeed: 67
    },
    {
      category: "immunitet",
      name: "Kollagen Peptidlari",
      form: "300 g kukun",
      blurb: "Teri, soch va bo'g'imlar uchun gidrolizlangan kollagen.",
      description: "Gidrolizlangan kollagen peptidlari teri elastikligini, bo'g'im harakatchanligini va soch-tirnoq salomatligini qo'llab-quvvatlaydi. Ichimlik yoki taomga qo'shish uchun qulay kukun.",
      price: 118000,
      sale: 93000,
      rating: 4.7,
      reviewsSeed: 82
    },
    {
      category: "immunitet",
      name: "Koenzim Q10 100 mg",
      form: "60 Softgel",
      blurb: "Hujayra energiyasi va yurak salomatligi uchun.",
      description: "Koenzim Q10 hujayra energiyasi ishlab chiqarishda ishtirok etadigan tabiiy antioksidant, yurak-qon tomir tizimini qo'llab-quvvatlaydi.",
      price: 96000,
      sale: 74000,
      rating: 4.5,
      reviewsSeed: 31
    },
    {
      category: "immunitet",
      name: "Ekinatseya Kompleks",
      form: "100 Tabletka",
      blurb: "Mavsumiy davrlarda immunitetni qo'llab-quvvatlaydi.",
      description: "Ekinatseya o'simligi asosidagi kompleks immun tizimining tabiiy himoya funksiyalarini qo'llab-quvvatlashda an'anaviy ravishda qo'llaniladi.",
      price: 58000,
      sale: 45000,
      rating: 4.3,
      reviewsSeed: 18
    },
    {
      category: "immunitet",
      name: "Spirulina 500 mg",
      form: "200 Tabletka",
      blurb: "Tabiiy oqsil va antioksidantlarga boy suv o'ti.",
      description: "Spirulina — oqsil, vitamin va antioksidantlarga boy tabiiy manba, umumiy tonusni va energiya darajasini qo'llab-quvvatlaydi.",
      price: 67000,
      sale: 52000,
      rating: 4.4,
      reviewsSeed: 23
    },
    {
      category: "immunitet",
      name: "Melatonin 5 mg",
      form: "120 Tabletka",
      blurb: "Sifatli va tabiiy uyquga yordam beruvchi formula.",
      description: "Melatonin tabiiy uyqu-uyg'onish tsiklini muvozanatlashga yordam beradi, uyquga ketish vaqtini qisqartirishga ko'maklashadi.",
      price: 54000,
      sale: 41000,
      rating: 4.6,
      reviewsSeed: 48
    },
    {
      category: "immunitet",
      name: "Turmeric Kurkumin + Qora Murch",
      form: "90 Kapsula",
      blurb: "Bo'g'imlar va umumiy salomatlik uchun kuchli antioksidant.",
      description: "Kurkumin qora murch ekstrakti bilan birga — so'rilishni yaxshilaydi va bo'g'imlar hamda umumiy antioksidant himoyani qo'llab-quvvatlaydi.",
      price: 86000,
      sale: 66000,
      rating: 4.5,
      reviewsSeed: 29
    },
    {
      category: "immunitet",
      name: "Probiotik + Prebiotik Kompleks",
      form: "60 Kapsula",
      blurb: "Ichak florasini to'liq qo'llab-quvvatlovchi ikki tomonlama formula.",
      description: "Probiotik kulturalar va prebiotik tolalar birgalikda ichak mikroflorasining sog'lom balansini qo'llab-quvvatlaydi.",
      price: 94000,
      sale: 73000,
      rating: 4.6,
      reviewsSeed: 39
    },
    {
      category: "immunitet",
      name: "Energiya Kompleksi (B + Jenshen)",
      form: "60 Kapsula",
      blurb: "Tabiiy tetiklik va diqqatni qo'llab-quvvatlovchi formula.",
      description: "B guruh vitaminlari va jenshen ekstrakti kombinatsiyasi kun bo'yi tabiiy energiya va diqqat-e'tiborni qo'llab-quvvatlaydi.",
      price: 82000,
      sale: 64000,
      rating: 4.5,
      reviewsSeed: 26
    },
    {
      category: "immunitet",
      name: "Immun Qo'llab-quvvatlash Kompleksi",
      form: "90 Tabletka",
      blurb: "Vitamin C, D va Rux — uch tomonlama immun himoya.",
      description: "Vitamin C, D3 va Rux birlashtirilgan formula — mavsumiy o'zgarishlarda immun tizimini kompleks qo'llab-quvvatlash uchun mo'ljallangan.",
      price: 76000,
      sale: 59000,
      rating: 4.7,
      reviewsSeed: 57
    }
  ];

  return catalog.map((item, index) => {
    const id = "p" + String(index + 1).padStart(2, "0");
    const category = BAD_CATEGORIES.find(function (c) { return c.id === item.category; });
    return Object.assign({}, item, {
      id: id,
      image: category.icon,
      discountPercent: Math.round((1 - item.sale / item.price) * 100)
    });
  });
})();
