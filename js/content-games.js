/* ============================================================
   content-games.js — QUESTS / OYUNLAR SAYFASI
   ============================================================

   Etymology Quest quiz sorularının tamamı burada.
   Her seviye için 6 soru var.

   Her sorunun yapısı:
     q:    Soru metni
     hint: İpucu (italik, küçük yazı olarak görünür)
     opts: Cevap seçenekleri — köşeli parantez içinde, virgülle ayrılmış
     ans:  Doğru cevabın numarası — 0'dan başlar (ilk seçenek = 0)
     exp:  Cevap verildikten sonra gösterilen açıklama

   ÖRNEK — ans: 1 ise ikinci seçenek doğrudur:
     opts: ['Yanlış', 'Doğru cevap', 'Yanlış'],
     ans:  1

   ============================================================ */

var SITE_GAMES = {

  quiz: {

    /* --------------------------------------------------------
       LEVEL 1 — İlkokul (8–10 yaş)
       Türkçe sorular, İngilizce cevap seçenekleri
    -------------------------------------------------------- */
    level1: [
      {
        q:    'Kaplumbağa çok yavaş hareket eder. "Slow" yavaş demek. Peki zıttı ne?',
        hint: 'Masaldaki tavşanı düşün — o çok hızlıydı...',
        opts: ['Fast', 'Small', 'Quiet', 'Old'],
        ans:  0,
        exp:  '<strong>Fast</strong> = hızlı. Tavşan hızlıydı ama kaplumbağa kararlıydı ve kazandı! Zıt anlam çiftleri: fast/slow (hızlı/yavaş), big/small (büyük/küçük), happy/sad (mutlu/üzgün).'
      },
      {
        q:    '"Happy" mutlu demek. "Un-" öneki bir kelimeyi zıttına çevirir. O zaman "unhappy" ne demek?',
        hint: 'Un- = değil, tersine çevir...',
        opts: ['Çok mutlu', 'Biraz mutlu', 'Mutsuz', 'Yeniden mutlu'],
        ans:  2,
        exp:  '<strong>Unhappy</strong> = mutsuz. "Un-" öneki her şeyi tersine çevirir: unkind (kaba), unfair (haksız), unknown (bilinmeyen), unsafe (güvensiz). Tek bir önek, onlarca yeni kelime!'
      },
      {
        q:    '"Sun" güneş demek, "light" ışık demek. Peki "sunlight" ne demek?',
        hint: 'İki kelimeyi birleştir: sun + light = ?',
        opts: ['Ay ışığı', 'Güneş ışığı', 'Bir çiçek türü', 'Gece gökyüzü'],
        ans:  1,
        exp:  '<strong>Sunlight</strong> = güneş ışığı. İngilizce iki kelimeyi birleştirmeyi çok sever: sun+flower = sunflower (ayçiçeği), rain+bow = rainbow (gökkuşağı), book+shelf = bookshelf (kitaplık).'
      },
      {
        q:    'Masalda tilki üzümler için "SOUR" dedi. "Sour" ne anlama gelir?',
        hint: 'Limonun tadını düşün...',
        opts: ['Tatlı (sweet)', 'Ekşi, limon gibi', 'Acı (bitter)', 'Tuzlu (salty)'],
        ans:  1,
        exp:  '<strong>Sour</strong> = ekşi. Limon sour\'dur. Tilki üzümlere ulaşamayınca onlara "ekşi" dedi. Gerçekten ekşi miydi? Yoksa sadece bir bahane mi arıyordu?'
      },
      {
        q:    '"Run" koşmak demek. Peki "-ing" eki eklenince "running" ne anlama gelir?',
        hint: '"-ing" eki "şu an oluyor" anlamı katar...',
        opts: ['Koştu (geçmiş)', 'Şu an koşuyor', 'Koşacak (gelecek)', 'Koşmadı'],
        ans:  1,
        exp:  '<strong>Running</strong> = şu an koşuyor. "-ing" eki eylemi "tam şu anda gerçekleşiyor" hâline getirir: run→running, jump→jumping, swim→swimming.'
      },
      {
        q:    'Aşağıdakilerden hangisi bir hayvan adıdır?',
        hint: 'Ezop masallarından birinde karşılaştın...',
        opts: ['Table (masa)', 'Fox (tilki)', 'Window (pencere)', 'Cloud (bulut)'],
        ans:  1,
        exp:  '<strong>Fox</strong> = tilki. "Tilki ve Üzümler" masalında tilkiyi gördün. Masallardaki diğer hayvanlar: tortoise (kaplumbağa), hare (tavşan), crow (karga), ant (karınca).'
      }
    ],

    /* --------------------------------------------------------
       LEVEL 2 — Ortaokul (11–13 yaş)
       İngilizce sorular, Türkçe ipuçları
    -------------------------------------------------------- */
    level2: [
      {
        q:    '"Aqua" is Latin for water. Which word does NOT come from this root?',
        hint: 'Düşün: aquarium, aquatic, aqueduct... hangisi farklı?',
        opts: ['Aquatic', 'Aqueduct', 'Aquarius', 'Accurate'],
        ans:  3,
        exp:  '<strong>Accurate</strong> Latince <em>accuratus</em>\'tan gelir — "özenle hazırlanmış" (<em>cura</em> = özen). Su ile hiçbir ilgisi yok. Diğerleri hepsi <em>aqua-</em> kökünü taşır.'
      },
      {
        q:    '"Bene-" means good, "vol-" means wish. What does "benevolent" mean?',
        hint: '"Benefit" (fayda) ve "volunteer" (gönüllü) kelimelerini düşün...',
        opts: ['Wishing good things for others', 'Being very healthy', 'Excellent at speaking', 'Coming from a good family'],
        ans:  0,
        exp:  '<strong>Benevolent</strong> = <em>bene</em> (iyi) + <em>velle</em> (istemek). Zıttı: <em>malevolent</em> — <em>male</em> kötü demek. Tek bir önek değişir, anlam tamamen tersine döner.'
      },
      {
        q:    '"Port-" means to carry. Which word has NOTHING to do with carrying?',
        hint: 'Transport, import, portfolio... hangisi taşımayla ilgisiz?',
        opts: ['Transport', 'Portfolio', 'Porter', 'Portal', 'Portable'],
        ans:  3,
        exp:  '<strong>Portal</strong> Latince <em>porta</em>\'dan gelir — kapı, geçit demek. <em>Portare</em> (taşımak) değil. İkisi farklı Latince aileler.'
      },
      {
        q:    '"Graph" means write, "auto" means self. What is an autobiography?',
        hint: '"Autograph", "biography", "geography" kelimelerini düşün...',
        opts: ['A car manual', 'The story of your own life, written by you', 'A self-portrait painting', 'A machine that writes automatically'],
        ans:  1,
        exp:  '<em>Auto</em> (kendi) + <em>bio</em> (yaşam) + <em>graph</em> (yazmak). Bu üç kök her yerde karşına çıkar: autograph, biology, geography, photography, telegraph.'
      },
      {
        q:    '"Chron-" means time. Which sentence uses a time-related word correctly?',
        hint: '"Chronological", "chronic", "synchronise" — hangi cümle doğru?',
        opts: [
          'The events were told in chronological order, oldest first.',
          'She had a chronic smile on her face.',
          'They synchronised the music to make it louder.',
          'The anachronism made the painting more beautiful.'
        ],
        ans:  0,
        exp:  '<strong>Chronological</strong> = zamana göre sıralanmış. <em>Chronic</em> = uzun süren. <em>Synchronise</em> = aynı anda gerçekleşmek. <em>Anachronism</em> = yanlış zaman dilimine ait bir şey.'
      },
      {
        q:    '"Lux / luc-" means light. Which word means "to explain something clearly"?',
        hint: '"Lucid", "illuminate", "elucidate" — ışık kökünü ara...',
        opts: ['Locate', 'Elucidate', 'Liquidate', 'Elaborate'],
        ans:  1,
        exp:  '<strong>Elucidate</strong> = <em>e-</em> (dışarı) + <em>lucidus</em> (ışık dolu). Işığa çıkarmak, netleştirmek. Aynı kök: <em>lucid</em>, <em>translucent</em>, <em>illuminate</em>.'
      }
    ],

    /* --------------------------------------------------------
       LEVEL 3 — Lise (14–18 yaş)
       Tamamen İngilizce
    -------------------------------------------------------- */
    level3: [
      {
        q:    '"Epistemology" comes from two Greek roots. Which analysis is correct?',
        hint: 'Think: episteme + logos...',
        opts: [
          '"Epi" (upon) + "teme" (ground) = study of foundations',
          '"Episteme" (knowledge) + "logos" (study) = the philosophical study of knowledge',
          '"Epis" (writing) + "teme" (theme) = thematic writing',
          '"Episte" (instant) + "mos" (law) = law of the instant'
        ],
        ans:  1,
        exp:  '<strong>Epistemology</strong> = <em>episteme</em> (knowledge) + <em>logos</em> (study). It examines the nature, scope and limits of knowledge — from Plato\'s cave to Kant\'s categories.'
      },
      {
        q:    'What is the origin of "hegemony" and what does it mean?',
        hint: 'Think of Gramsci\'s cultural theory...',
        opts: [
          '"Hege" (war) + "mony" (peace) = war-peace balance',
          'Greek "hegemon" meaning leader = dominance or leadership',
          '"He" + "gemony" = his power',
          '"Hege" (legal) + "mony" (order) = legal order'
        ],
        ans:  1,
        exp:  '<strong>Hegemon</strong> in Greek means leader or guide. Gramsci used it to describe cultural and ideological dominance that operates through consent rather than force.'
      },
      {
        q:    'Latin "fides" meaning faith or trust — which word does NOT derive from it?',
        hint: 'Think: fidelity, confidence, infidel...',
        opts: ['Fidelity', 'Confidence', 'Infidel', 'Federal', 'Affidavit'],
        ans:  3,
        exp:  '<strong>Federal</strong> comes from Latin <em>foedus</em> (treaty) — not <em>fides</em>. The others: fidelity (faithfulness), confidence (with trust), infidel (without faith), affidavit (sworn statement).'
      },
      {
        q:    'Which is the correct analysis of "ontology"?',
        hint: 'Think of Aristotle\'s Metaphysics...',
        opts: [
          '"Onto" (previous) = study of what came before',
          '"Ontos" (Greek: being) + "logos" = the philosophical study of being and existence',
          '"On" (on top of) + "tology" = upper-layer science',
          '"Onto" (merging) + "logy" = science of integration'
        ],
        ans:  1,
        exp:  '<strong>Ontology</strong> = <em>ontos</em> (being) + <em>logos</em> (study). It asks why there is something rather than nothing — the foundational question of metaphysics.'
      },
      {
        q:    'What language does "Zeitgeist" come from and what does it mean?',
        hint: 'Think of Hegel and German Idealism...',
        opts: [
          'French, meaning spirit of the time',
          'German, "Zeit" (time) + "Geist" (spirit) = the spirit or defining mood of an age',
          'Latin, meaning force of the age',
          'Greek, meaning periodic consciousness stream'
        ],
        ans:  1,
        exp:  '<strong>Zeitgeist</strong> is German: Zeit (time) + Geist (spirit, mind). In Hegel\'s philosophy it describes the collective intellectual climate that shapes each historical epoch.'
      },
      {
        q:    'Latin "modus" meaning measure or manner — which options derive from it?',
        hint: 'Think: mode, modify, modulate...',
        opts: ['Only moderate', 'Only modern', 'Only modest', 'All of them derive from modus', 'None of them'],
        ans:  3,
        exp:  '<strong>All of them</strong> derive from <em>modus</em>. Moderate = keeping within measure, modern = of the present manner, modest = knowing one\'s own measure. One root, a whole family.'
      }
    ]

  }

};
