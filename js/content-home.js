/* ============================================================
   content-home.js — ANA SAYFA
   ============================================================

   Ana sayfanın tüm içeriği burada:
   - Hero başlığı ve paragrafları
   - "Nasıl çalışıyorum?" kartları (6 adet)
   - "Kimler için?" yaş grubu kartları (3 adet)

   ============================================================ */

var SITE_HOME = {

  /* ----------------------------------------------------------
     BÖLÜM BAŞLIKLARI
  ---------------------------------------------------------- */
  sections: {
    methods_title: 'Nasıl çalışıyorum?',
    methods_sub:   'Her ders şu altı temel üzerine kurulu — aynı felsefe, öğrenciye göre şekillenen içerik.',
    audiences_title: 'Kimler için?',
    audiences_sub:   'Aynı felsefe, farklı dil — her yaş grubuna özgü materyaller, oyunlar ve tempo.'
  },

  /* ----------------------------------------------------------
     HERO — Sayfanın en üstündeki büyük başlık ve metin
     \n = yeni satır (başlıkta kullanılır)
  ---------------------------------------------------------- */
  hero: {
    title: 'İngilizce öğrenmek\nbir macera olabilir.',
    para1: 'Boğaziçi Üniversitesi Felsefe öğrencisiyim. Gramer ezberinden değil, kelimelerin kökeninden, masalların mantığından ve her çocuğun kendi dünyasından başlayan dersler tasarlıyorum.',
    para2: 'Her ders, kişiye özel kurulur. Çünkü dili anlamak için önce düşünmeyi öğrenmek gerekir.'
  },


  /* ----------------------------------------------------------
     YÖNTEM KARTLARI — "Nasıl çalışıyorum?" bölümü
     6 kart — her birinin başlığını ve açıklamasını düzenle
  ---------------------------------------------------------- */
  methods: [
    {
      title: 'Kelimelerin İzinde',
      text:  'Latin ve Grek köklerini masallarla birleştirerek İngilizce\'yi "tanıdık" hale getiriyoruz. Bir kök öğrenmek, onlarca kelimeye açılan kapıdır.'
    },
    {
      title: 'Masalsı Akıl Yürütme',
      text:  'Ezop ve Grimm masallarını analiz ederek grameri bir mantık çerçevesinde kavratıyoruz. Kurallar değil, örüntüler.'
    },
    {
      title: 'Kişiye Özel Oyun',
      text:  'Mitoloji mi, Minecraft mi, astronomi mi? Her ders, öğrencinin ilgi alanına göre sıfırdan tasarlanır.'
    },
    {
      title: 'Önce Düşün, Sonra Söyle',
      text:  'Sokratik sorularla öğrenci anlama ulaşır — çeviriye değil, dil sezgisine. Cevabı bulmak, cevabı ezberlemekten çok daha kalıcıdır.'
    },
    {
      title: 'Üret, Yaz, Konuş',
      text:  'Çizgi roman, podcast, felsefi yaklaşım — öğrenci gerçek bir şey üretir. Performans, kavrayışın doğal sonucudur.'
    },
    {
      title: 'Not Değil, İlerleme',
      text:  'Belirli periyodlarda ebeveynlere kısa bir not iletiyorum. İlerleme; güven ve merak ile ölçülür, test puanıyla değil.'
    }
  ],


  /* ----------------------------------------------------------
     YAŞ GRUPLARI — "Kimler için?" bölümü
     3 kart — renk, yaş aralığı, başlık ve liste maddeleri
     Renk seçenekleri: var(--sage)  var(--baby-blue)  var(--terra)  var(--gold)
  ---------------------------------------------------------- */
  audiences: [
    {
      color: 'var(--sage)',
      age:   '8–10 Yaş · İlkokul',
      title: 'Küçük Kaşifler',
      items: [
        'Masallar ve canlandırma oyunları',
        'Mitoloji ile kelime kökleri',
        'Resimli kitap okuma ve konuşma',
        '30–45 dakika, oyun ağırlıklı'
      ]
    },
    {
      color: 'var(--baby-blue)',
      age:   '11–13 Yaş · Ortaokul',
      title: 'Hikaye Dedektifleri',
      items: [
        'Hikaye analizi ve tartışma',
        'Grek mitolojisi ile kelime haznesi',
        'Yaratıcı yazarlık maceraları',
        'Mantık bulmacaları ile gramer'
      ]
    },
    {
      color: 'var(--terra)',
      age:   '14–18 Yaş · Lise',
      title: 'Genç Düşünürler',
      items: [
        'Felsefi metin okuma',
        'Akademik yazarlık becerileri',
        'BUEPT / YDS / IELTS hazırlık',
        'Essay yapısı ve argüman kurma'
      ]
    }
  ]

};
