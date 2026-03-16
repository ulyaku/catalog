/* ============================================================
   content-method.js — YÖNTEM SAYFASI
   ============================================================

   Yöntem sayfasının tüm içeriği burada:
   - Ders yapısı adımları (4 adım)
   - Temel inanç metni
   - Fiyat paketleri (3 paket)

   ============================================================ */

var SITE_METHOD = {

  /* ----------------------------------------------------------
     BÖLÜM BAŞLIKLARI
  ---------------------------------------------------------- */
  sections: {
    steps_title:   'Neden sadece gramer öğretmiyorum?',
    steps_sub:     'Gramer haritadır. Haritayı evde okumak yerine arazide yürümeyi öğretiyorum. Her ders şu dört adıma sadık kalır:',
    belief_title:  'Temel yaklaşım',
    pricing_title: 'Ücretler',
    pricing_sub:   'Tüm dersler bire-birdir. Grup dersleri talep üzerine planlanır.'
  },

  /* ----------------------------------------------------------
     DERS YAPISI — Her dersin 4 aşaması
     Başlık ve açıklamayı düzenleyebilirsin
  ---------------------------------------------------------- */
  steps: [
    {
      title: 'Isınma · 10 dk',
      text:  'Bir etimoloji bulmacası ya da bilmece. "Dictator, dictionary, predict — ortak noktaları ne?" Her şey merakla başlar.'
    },
    {
      title: 'Hikaye · 20 dk',
      text:  'Bir masal, mit ya da kısa İngilizce metin. Bağlamdan çıkan kelimeler listeye değil, anıya kazınır.'
    },
    {
      title: 'Üretim · 15 dk',
      text:  'Öğrenci bir şey üretir: cümle, paragraf, çizgi roman karesi, sözlü yanıt. Üretim, kavrayışı pekiştirir.'
    },
    {
      title: 'Yansıma · 5 dk',
      text:  '"Bugün öğrendiğin bir kelime? Kendi hayatınla bağlantılı bir cümlede kullanabilir misin?" Hafıza kapanır.'
    }
  ],


  /* ----------------------------------------------------------
     TEMEL İNANÇ — Yöntem sayfasındaki alıntı metni
     <em>...</em> = italik, <strong>...</strong> = kalın
  ---------------------------------------------------------- */
  belief: '<em>Bene-</em>\'nin "iyi" anlamına geldiğini öğrenen bir çocuk — benefit, benevolent, beneficial — herhangi bir kelime listesinden çok daha fazlasına kapı aralar. Derslerim bu sezgiyi ilk günden inşa eder. Dil, kural koleksiyonu değil, yaşayan bir sistemdir.',


  /* ----------------------------------------------------------
     FİYATLAR — 3 paket
     price:    fiyat metni (örn. "₺450" ya da "Ücretsiz")
     period:   süre ve sıklık (örn. "60 dk · haftada bir")
     text:     kısa açıklama
     featured: true → o kart öne çıkar (sadece birinde kullan)
  ---------------------------------------------------------- */
  pricing: [
    {
      tag:      'Keşif Seansı',
      price:    'Ücretsiz',
      period:   '30 dakika · ilk tanışma',
      text:     'Öğrenciyi tanıyorum, dünyasını dinliyorum. Hiçbir taahhüt yok.',
      featured: false
    },
    {
      tag:      'Standart',
      price:    '₺450',
      period:   '60 dk · haftada bir',
      text:     'Özelleştirilmiş materyaller dahil. Düzenli ilerleme takibi.',
      featured: true    // ← bu kart öne çıkar
    },
    {
      tag:      'Yoğun',
      price:    '₺1.200',
      period:   '3 × 60 dk · haftalık',
      text:     'Sınav hazırlığı veya hızlı ilerleme için ideal paket.',
      featured: false
    }
  ]

};
