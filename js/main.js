/* ulyapho — main.js */

// Phone number formatter — called inline from HTML
function formatPhoneNumber(input) {
  var digits = input.value.replace(/\D/g, '').substring(0, 10);
  var formatted = digits;
  if (digits.length > 6) {
    formatted = digits.substring(0,3) + ' ' + digits.substring(3,6) + ' ' + digits.substring(6,8) + ' ' + digits.substring(8,10);
  } else if (digits.length > 3) {
    formatted = digits.substring(0,3) + ' ' + digits.substring(3,6);
  }
  input.value = formatted.trim();
}

document.addEventListener('DOMContentLoaded', function () {

  /* ════════════════════════════════════════
     POPULATE CONTENT FROM content files
     Reads SITE_GENERAL, SITE_HOME, SITE_METHOD,
     SITE_GAMES, SITE_CONTACT and fills all page IDs
  ════════════════════════════════════════ */
  function set(id, val, isHTML) {
    var el = document.getElementById(id);
    if (!el) return;
    if (isHTML) { el.innerHTML = val; } else { el.textContent = val; }
  }

  // General
  document.title = SITE_GENERAL.title;
  set('nav-logo', SITE_GENERAL.name);
  var footerText = SITE_GENERAL.name + ' — ' + SITE_GENERAL.footer_text;
  ['home','method','contact'].forEach(function(p) {
    set('footer-logo-' + p, footerText);
    set('footer-copy-' + p, SITE_GENERAL.footer_copy);
  });

  // Hero
  document.getElementById('hero-title').innerHTML = SITE_HOME.hero.title.replace('\n', '<br>');
  set('hero-para1', SITE_HOME.hero.para1);
  set('hero-para2', SITE_HOME.hero.para2);

  // Method cards
  var methodGrid = document.getElementById('method-grid');
  if (methodGrid) {
    methodGrid.innerHTML = SITE_HOME.methods.map(function(m, i) {
      return '<div class="method-card">' +
        '<span class="method-num">0' + (i+1) + '</span>' +
        '<h3>' + m.title + '</h3>' +
        '<p>' + m.text + '</p>' +
        '</div>';
    }).join('');
  }

  // Who cards
  var whoGrid = document.getElementById('who-grid');
  if (whoGrid) {
    whoGrid.innerHTML = SITE_HOME.audiences.map(function(a) {
      return '<div class="who-card">' +
        '<div class="who-card-accent" style="background:' + a.color + ';"></div>' +
        '<div class="who-age">' + a.age + '</div>' +
        '<h3>' + a.title + '</h3>' +
        '<ul>' + a.items.map(function(item) { return '<li>' + item + '</li>'; }).join('') + '</ul>' +
        '</div>';
    }).join('');
  }

  // Session steps
  var stepsEl = document.getElementById('session-steps');
  if (stepsEl) {
    stepsEl.innerHTML = SITE_METHOD.steps.map(function(s, i) {
      return '<div class="step-card">' +
        '<div class="step-num">0' + (i+1) + '</div>' +
        '<h4>' + s.title + '</h4>' +
        '<p>' + s.text + '</p>' +
        '</div>';
    }).join('');
  }

  // Belief text
  set('belief-text', SITE_METHOD.belief, true);

  // Pricing
  var pricingEl = document.getElementById('pricing-grid');
  if (pricingEl) {
    pricingEl.innerHTML = SITE_METHOD.pricing.map(function(p) {
      return '<div class="price-card' + (p.featured ? ' featured' : '') + '">' +
        '<div class="price-tag">' + p.tag + '</div>' +
        '<div class="price-num">' + p.price + '</div>' +
        '<span class="price-period">' + p.period + '</span>' +
        '<p>' + p.text + '</p>' +
        '</div>';
    }).join('');
  }

  // Contact
  set('contact-title', SITE_CONTACT.title);
  set('contact-para1', SITE_CONTACT.para1);
  set('contact-para2', SITE_CONTACT.para2);
  set('contact-location', '📍 ' + SITE_GENERAL.location);
  set('contact-email', '✉ ' + SITE_GENERAL.email);
  var igEl = document.getElementById('contact-instagram');
  if (igEl) {
    igEl.href = SITE_GENERAL.instagram;
    igEl.textContent = '@' + SITE_GENERAL.instagram.split('/').pop();
  }
  set('free-label', SITE_CONTACT.free_label);
  set('free-text', SITE_CONTACT.free_text);
  set('form-thanks', SITE_CONTACT.thanks_msg);

  /* ── NAVIGATION ── */
  function goTo(id) {
    document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
    document.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('active'); });
    var target = document.getElementById(id);
    if (target) target.classList.add('active');
    var navBtn = document.querySelector('.nav-link[data-goto="' + id + '"]');
    if (navBtn) navBtn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'contact') updateContactPanel();
  }
  document.querySelectorAll('[data-goto]').forEach(function (el) {
    el.addEventListener('click', function () { goTo(this.dataset.goto); });
  });

  /* ── GAME TABS ── */
  document.querySelectorAll('[data-tab]').forEach(function (el) {
    el.addEventListener('click', function () {
      document.querySelectorAll('.game-panel').forEach(function (p) { p.classList.remove('active'); });
      document.querySelectorAll('.game-tab').forEach(function (t) { t.classList.remove('active'); });
      var panel = document.getElementById('tab-' + this.dataset.tab);
      if (panel) panel.classList.add('active');
      this.classList.add('active');
    });
  });

  /* ── LEVEL SYSTEM ── */
  var currentLevel = 'ilkokul';

  var introTexts = {
    ilkokul: {
      et:       'Her soru Ulya\'nın derslerindeki ısınma bölümünü yansıtıyor.',
      fable:    'Her pasajı oku. Soruyu yanıtla. Hikayelerin dili nasıl öğrettiğini keşfet.',
      wb:       'Her kelimenin içindeki kökü bul. Üzerine tıkla — nasıl çalıştığını gör.',
      scramble: 'Kelimelere tıklayarak doğru cümleyi oluştur. Gramer kural değil, mantıktır.'
    },
    ortaokul: {
      et:       'Her soru Ulya\'nın derslerindeki ısınma bölümünü yansıtıyor.',
      fable:    'Her pasajı oku. Mantık sorusunu yanıtla. Hikayelerin dili nasıl öğrettiğini keşfet.',
      wb:       'Find the hidden root in each word. Click to reveal how it works.',
      scramble: 'Click words to build the correct sentence. Grammar is logic, not a list of rules.'
    },
    lise: {
      et:       'This mirrors the warm-up format used in every Ulya session.',
      fable:    'Read each passage. Answer the logic question. Discover how stories teach language.',
      wb:       'Find the hidden root in each word. Click to reveal how it works.',
      scramble: 'Click words to build the correct sentence. Grammar is logic, not a list of rules.'
    }
  };

  function updateIntroTexts() {
    var t = introTexts[currentLevel];
    var elEt = document.getElementById('et-intro-text');
    var elFable = document.getElementById('fable-intro-text');
    var elWb = document.getElementById('wb-intro-text');
    var elScramble = document.getElementById('scramble-intro-text');
    if (elEt) elEt.textContent = t.et;
    if (elFable) elFable.textContent = t.fable;
    if (elWb) elWb.textContent = t.wb;
    if (elScramble) elScramble.textContent = t.scramble;
  }
  updateIntroTexts();

  document.querySelectorAll('.level-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.level-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      currentLevel = this.dataset.level;
      updateIntroTexts();
      etReset(); buildFable(); wbBuild(); buildScramble();
    });
  });

  /* ════════════════════════════════════════
     QUIZ STATE — shared across navigation
  ════════════════════════════════════════ */
  var quizState = {
    completed: false,
    level: null,
    score: 0,
    total: 0,
    answers: []   // [{q, chosen, correct, skipped}]
  };

  function updateContactPanel() {
    var panel = document.getElementById('quiz-score-panel');
    if (!panel) return;

    var hasAnyAnswers = etAnswers && etAnswers.length > 0;

    if (!hasAnyAnswers && !quizState.completed) {
      // No quiz activity at all
      panel.innerHTML =
        '<div class="quiz-noresult-prompt">' +
        '<span class="quiz-noresult-text">Quiz sonucu henüz yok. Quiz\'i tamamlayarak seviyeni bize gönderebilirsin.</span>' +
        '<button class="btn btn-secondary" id="goto-quiz-btn" style="white-space:nowrap;">Quiz\'e Git →</button>' +
        '</div>';
      var btn = document.getElementById('goto-quiz-btn');
      if (btn) btn.addEventListener('click', function () { goTo('games'); });
      return;
    }

    // Has answers (in progress or completed)
    var answers = quizState.completed ? quizState.answers : etAnswers;
    var total = quizState.completed ? quizState.total : etQuestions[currentLevel].length;
    var score = quizState.completed ? quizState.score : etScore;
    var levelLabel = (quizState.completed ? quizState.level : currentLevel) === 'ilkokul' ? 'İlkokul' : (quizState.completed ? quizState.level : currentLevel) === 'ortaokul' ? 'Ortaokul' : 'Lise';
    var isComplete = quizState.completed;

    var correct = answers.filter(function (a) { return !a.skipped && a.correct; }).length;
    var wrong   = answers.filter(function (a) { return !a.skipped && !a.correct; }).length;
    var skipped = answers.filter(function (a) { return a.skipped; }).length;

    var listItems = answers.map(function (a, i) {
      var icon = a.skipped ? '—' : a.correct ? '✓' : '✗';
      var cls  = a.skipped ? 'qai-skipped' : a.correct ? 'qai-correct' : 'qai-wrong';
      return '<li class="quiz-answer-item">' +
        '<span class="qai-num">' + (i + 1) + '</span>' +
        '<span class="' + cls + '">' + icon + '</span>' +
        '</li>';
    }).join('');

    var statusNote = isComplete
      ? ''
      : '<div style="font-size:0.72rem;color:var(--muted);font-style:italic;margin-bottom:8px;">' + answers.length + ' / ' + total + ' soru yanıtlandı — quiz devam ediyor...</div>';

    panel.innerHTML =
      '<div class="quiz-score-panel">' +
      '<div class="quiz-score-panel-label">Etymology Quest ' + (isComplete ? 'Sonucu' : '— Devam Ediyor') + '</div>' +
      statusNote +
      '<div class="quiz-score-summary">' +
      '<strong>' + score + ' / ' + total + '</strong>' +
      ' &nbsp;·&nbsp; Seviye: ' + levelLabel +
      ' &nbsp;·&nbsp; <span style="color:#2d6a31">✓ ' + correct + '</span>' +
      ' &nbsp;·&nbsp; <span style="color:#8b3a20">✗ ' + wrong + '</span>' +
      (skipped ? ' &nbsp;·&nbsp; <span style="color:var(--muted)">— ' + skipped + ' atlanan</span>' : '') +
      '</div>' +
      '<ul class="quiz-answer-list">' + listItems + '</ul>' +
      '</div>';
  }

  function truncate(str, len) {
    return str.length > len ? str.substring(0, len) + '...' : str;
  }


  /* ════════════════════════════════════════
     ETYMOLOGY QUEST — reads questions from content.js
     To change quiz questions, edit js/content.js
  ════════════════════════════════════════ */
  var etQuestions = {
    ilkokul:  SITE_GAMES.quiz.level1,
    ortaokul: SITE_GAMES.quiz.level2,
    lise:     SITE_GAMES.quiz.level3
  };


  var etIdx = 0, etScore = 0, etDone = false;
  var etKeys = ['A', 'B', 'C', 'D', 'E'];
  var etAnswers = [];   // per-run answers

  function etRender() {
    var set = etQuestions[currentLevel];
    var q = set[etIdx];
    document.getElementById('et-count').textContent = (etIdx + 1) + ' / ' + set.length;
    document.getElementById('et-bar').style.width = (etIdx / set.length * 100) + '%';
    document.getElementById('et-score').textContent = 'Score: ' + etScore;
    document.getElementById('et-q').textContent = q.q;
    document.getElementById('et-hint').textContent = q.hint;
    document.getElementById('et-fb').className = 'quest-feedback';
    document.getElementById('et-fb').innerHTML = '';
    document.getElementById('et-next').disabled = true;
    document.getElementById('et-skip').style.display = '';
    etDone = false;
    document.getElementById('et-opts').innerHTML = q.opts.map(function (o, i) {
      return '<button class="quest-opt" data-idx="' + i + '"><span class="opt-key">' + etKeys[i] + '</span>' + o + '</button>';
    }).join('');
    document.getElementById('et-opts').querySelectorAll('.quest-opt').forEach(function (btn) {
      btn.addEventListener('click', function () { etAns(parseInt(this.dataset.idx)); });
    });
    var ofEl = document.querySelector('.result-of');
    if (ofEl) ofEl.textContent = 'out of ' + set.length;
  }

  function etAns(i) {
    if (etDone) return;
    etDone = true;
    var q = etQuestions[currentLevel][etIdx];
    var btns = document.querySelectorAll('.quest-opt');
    var fb = document.getElementById('et-fb');
    btns.forEach(function (b) { b.disabled = true; });
    var isCorrect = (i === q.ans);
    if (isCorrect) {
      btns[i].classList.add('correct');
      fb.className = 'quest-feedback correct show';
      fb.innerHTML = '&#10003; ' + q.exp;
      etScore++;
    } else {
      btns[i].classList.add('wrong');
      btns[q.ans].classList.add('correct');
      fb.className = 'quest-feedback wrong show';
      fb.innerHTML = '&#10007; ' + q.exp;
    }
    etAnswers.push({ q: q.q, chosen: q.opts[i], correct: isCorrect, skipped: false });
    document.getElementById('et-next').disabled = false;
    document.getElementById('et-skip').style.display = 'none';
    document.getElementById('et-score').textContent = 'Score: ' + etScore;
    updateContactPanel();
  }

  function etSkip() {
    if (etDone) return;
    var q = etQuestions[currentLevel][etIdx];
    etAnswers.push({ q: q.q, chosen: null, correct: false, skipped: true });
    document.getElementById('et-fb').className = 'quest-feedback wrong show';
    document.getElementById('et-fb').innerHTML = '<em style="color:var(--muted)">Atlandı.</em> ' + q.exp;
    document.querySelectorAll('.quest-opt').forEach(function (b) { b.disabled = true; });
    document.querySelectorAll('.quest-opt')[q.ans].classList.add('correct');
    document.getElementById('et-next').disabled = false;
    document.getElementById('et-skip').style.display = 'none';
    etDone = true;
    updateContactPanel();
  }

  function etFinish() {
    var set = etQuestions[currentLevel];
    document.getElementById('et-quiz').style.display = 'none';
    document.getElementById('et-result').classList.add('show');
    document.getElementById('et-rnum').textContent = etScore;
    var ofEl = document.querySelector('.result-of');
    if (ofEl) ofEl.textContent = 'out of ' + set.length;
    // save to quizState
    quizState.completed = true;
    quizState.level = currentLevel;
    quizState.score = etScore;
    quizState.total = set.length;
    quizState.answers = etAnswers.slice();
    updateContactPanel();
    // result message
    var max = set.length;
    var msgs;
    if (currentLevel === 'ilkokul') {
      msgs = [
        'Her başlangıç bir adımla olur. Bu yolculuğun tam başlangıcısın!',
        'Harika gidiyorsun! Kelime kökleri kafanda oturmaya başladı.',
        'Muhteşem! Dil için gerçek bir zihnin var — Ulya seninle çalışmaktan çok memnun olur!'
      ];
    } else if (currentLevel === 'ortaokul') {
      msgs = [
        'Every expert was once a beginner. Bu yolculuk tam buradan başlar.',
        'Solid roots! Etimolojik düşünme becerin gelişiyor.',
        'Exceptional. You have the mind for language — Ulya would love to work with you.'
      ];
    } else {
      msgs = [
        'Every expert was once a beginner. This is exactly where the journey starts.',
        'Solid roots! You\'re thinking like an etymologist already.',
        'Exceptional. You have the mind for language — Ulya would love to work with you.'
      ];
    }
    document.getElementById('et-rmsg').textContent = '"' + (etScore <= Math.floor(max * 0.33) ? msgs[0] : etScore <= Math.floor(max * 0.66) ? msgs[1] : msgs[2]) + '"';
  }

  document.getElementById('et-next').addEventListener('click', function () {
    var set = etQuestions[currentLevel];
    etIdx++;
    if (etIdx >= set.length) {
      etFinish();
    } else {
      etRender();
    }
  });

  document.getElementById('et-skip').addEventListener('click', function () {
    etSkip();
  });

  // "Save score & go to contact" button
  document.getElementById('et-save-score').addEventListener('click', function () {
    goTo('contact');
  });

  document.getElementById('et-replay').addEventListener('click', function () { etReset(); });

  function etReset() {
    etIdx = 0; etScore = 0; etAnswers = [];
    quizState.completed = false;
    document.getElementById('et-quiz').style.display = '';
    document.getElementById('et-result').classList.remove('show');
    etRender();
    updateContactPanel();
  }
  etReset();

  /* ════════════════════════════════════════
     FABLE LOGIC — 3 LEVELS
  ════════════════════════════════════════ */
  var fableData = {

    ilkokul: [
      {
        src: 'Aesop · The Fox and the Grapes',
        text: '"A hungry Fox saw some fine bunches of Grapes hanging from a vine. He jumped as high as he could but could not reach them. Walking away he said: Oh, they were not even ripe yet!"',
        qlabel: 'Anlama Sorusu',
        q: 'Tilki neden üzümlerin "ripe" (olgunlaşmış) olmadığını söyledi?',
        opts: [
          { text: 'Çünkü tattı ve gerçekten ekşiydi', type: 'wrong' },
          { text: 'Çünkü ulaşamadı ve bir bahane gerekiyordu', type: 'correct' },
          { text: 'Çünkü hâlâ kışın başıydı', type: 'wrong' }
        ],
        exp: '<strong>Doğru!</strong> Tilki üzümlere ulaşamadı, bu yüzden bahane uydurdu. İngilizcede <em>excuse</em> = bahane. Gerçekten olgunlaşmamış mıydılar? Yoksa tilki sadece kendini iyi hissettirmek mi istedi?',
        column: false
      },
      {
        src: 'Aesop · The Tortoise and the Hare',
        text: '"The Hare said: I can beat anyone! The Tortoise accepted the challenge. The Hare ran fast, then stopped to sleep. The Tortoise walked slowly and steadily and won."',
        qlabel: 'Kelime Sorusu',
        q: '"Slow and steady wins the race." Buradaki <strong>steady</strong> ne anlama gelir?',
        opts: [
          { text: 'Hızlı ve heyecanlı', type: 'wrong' },
          { text: 'Durmadan, kararlıca devam eden', type: 'correct' },
          { text: 'Yorgun ve uykulu', type: 'wrong' }
        ],
        exp: '<strong>Harika!</strong> <em>Steady</em> = istikrarlı, kararlı, durmadan devam eden. Kaplumbağa hızlı değildi ama <em>steady</em>di. İşte bu farkı yarattı.',
        column: false
      },
      {
        src: 'Grimm Brothers · The Three Little Pigs',
        text: '"The first pig built a house of straw. The second built one of sticks. The third built one of bricks. The wolf came and blew down the straw and stick houses. The brick house stood firm."',
        qlabel: 'Gramer Sorusu',
        q: 'Hangi cümle geçmiş zamanı doğru kullanıyor?',
        opts: [
          { text: 'The wolf blow the house down.', type: 'wrong' },
          { text: 'The wolf blewed the house down.', type: 'wrong' },
          { text: 'The wolf blew the house down.', type: 'correct' }
        ],
        exp: '<strong>Süper!</strong> <em>Blow</em> düzensiz bir fiildir: geçmişte <em>blew</em> olur, sona -ed eklenmez. Diğer düzensiz fiiller: go→went, see→saw, run→ran. Bunları ezberlemek yerine masallarla tanımak çok daha kalıcı!',
        column: true
      }
    ],

    ortaokul: [
      {
        src: 'Aesop · The Fox and the Grapes',
        text: '"A hungry Fox saw some fine bunches of Grapes hanging from a vine. He did his best to reach them. Being unable to reach them, he walked away saying: Oh, they are not even ripe yet. I don\'t need any sour grapes."',
        qlabel: 'Logic Question',
        q: 'The fox could not reach the grapes. His excuse was that they were sour. What does this reveal about how people use language?',
        opts: [
          { text: 'Foxes do not like grapes', type: 'wrong' },
          { text: 'We justify failure by criticising what we could not have', type: 'correct' },
          { text: 'Grapes are often unripe in autumn', type: 'wrong' }
        ],
        exp: '<strong>Exactly.</strong> Buna <em>rationalisation</em> denir — Latince <em>ratio</em> (akıl, mantık) kökünden. Tilki başarısızlıktan geriye doğru mantık yürütüyor: ulaşamadım → zaten kötüydü. Aynı kök: rational, irrational, ration.',
        column: false
      },
      {
        src: 'Grimm Brothers · The Fisherman and His Wife',
        text: '"The wife wished for a cottage, then a castle, then to become king, then emperor, then Pope. Each time the fish granted her wish. When she demanded to become God itself, they were returned to their original hut."',
        qlabel: 'Vocabulary Logic',
        q: 'Cottage, castle, kingdom, empire, papacy. Which word means the territory ruled by an emperor?',
        opts: [
          { text: 'Kingdom', type: 'wrong' },
          { text: 'Empire', type: 'correct' },
          { text: 'Republic', type: 'wrong' },
          { text: 'Duchy', type: 'wrong' }
        ],
        exp: '<strong>Doğru.</strong> <em>Empire</em> Latince <em>imperium</em>\'dan — <em>imperare</em> (emretmek) fiilinden. Bu kök şu kelimelerde yaşıyor: emperor (imparator), imperial (imparatorluk), imperious (buyurgan). Kadının hırsı dilsel bir merdiveni tırmanıyor.',
        column: false
      },
      {
        src: 'Aesop · The Tortoise and the Hare',
        text: '"I can beat anyone, said the Hare. The Tortoise accepted the challenge. Everyone laughed. The Hare dashed off, stopped to rest, and fell asleep. The Tortoise walked steadily and won."',
        qlabel: 'Grammar Logic',
        q: 'Which sentence correctly summarises the events using the past tense?',
        opts: [
          { text: 'The hare has won because the tortoise slept.', type: 'wrong' },
          { text: 'The hare slept, so the tortoise won the race.', type: 'correct' },
          { text: 'The tortoise will have won after the hare slept.', type: 'wrong' }
        ],
        exp: '<strong>Mükemmel.</strong> Basit geçmiş zaman (slept, won) tamamlanmış ardışık olaylar için kullanılır. Gramer bir listeden ezberlenmez — masalın mantığından hissedilir. <em>So</em> = bu yüzden: neden-sonuç bağlacı.',
        column: true
      }
    ],

    lise: [
      {
        src: 'Aesop — Rhetorical Analysis',
        text: '"The fox, unable to reach the grapes, declared them sour. In ancient Greek rhetoric this manoeuvre has a name. In modern psychology, so does the underlying mental mechanism."',
        qlabel: 'Philosophical Analysis',
        q: 'The fox\'s behaviour best illustrates which philosophical or psychological concept?',
        opts: [
          { text: 'Empiricism — learning through direct experience', type: 'wrong' },
          { text: 'Cognitive dissonance reduction — rationalising a contradiction', type: 'correct' },
          { text: 'Deontological ethics — following a rule regardless of outcome', type: 'wrong' },
          { text: 'Phenomenology — the subjective structure of experience', type: 'wrong' }
        ],
        exp: '<strong>Precisely.</strong> Festinger\'s cognitive dissonance theory: when desire and reality conflict, the mind reinterprets reality to reduce the discomfort. Saying the grapes were sour is a classic reframing. The fox never actually tasted them.',
        column: false
      },
      {
        src: 'Aristotle · Poetics',
        text: '"According to Aristotle, a well-constructed plot must have a beginning, middle and end. Events must follow each other by probability or necessity, not by mere chance."',
        qlabel: 'Textual Analysis',
        q: 'How does the probability or necessity principle apply to the Tortoise and the Hare?',
        opts: [
          { text: 'It does not apply because fables are fictional so causality is suspended', type: 'wrong' },
          { text: 'The tortoise winning is probable given the hare\'s arrogance and the outcome follows necessarily from character', type: 'correct' },
          { text: 'The events happen randomly which is why the ending is surprising', type: 'wrong' }
        ],
        exp: '<strong>Exactly.</strong> For Aristotle events must flow necessarily from character. The hare\'s hubris leads to carelessness, then sleep, then defeat. This is hamartia, meaning tragic flaw, in miniature form.',
        column: false
      },
      {
        src: 'Grimm Brothers — Structural Analysis',
        text: '"Vladimir Propp argued that folktales share a fixed set of character functions: hero, donor, villain, dispatcher. This structure recurs across cultures with remarkable consistency."',
        qlabel: 'Comparative Analysis',
        q: 'In Propp\'s schema, which function does the magical fish fulfil in The Fisherman and His Wife?',
        opts: [
          { text: 'Hero', type: 'wrong' },
          { text: 'Donor, the helper who grants magical aid', type: 'correct' },
          { text: 'Villain', type: 'wrong' },
          { text: 'Princess', type: 'wrong' }
        ],
        exp: '<strong>Correct.</strong> In Propp\'s 31 narrative functions the donor supplies the hero with a magical agent or gift. The fish grants wishes but the wife\'s limitless greed eventually exhausts even the donor\'s willingness to help.',
        column: false
      }
    ]
  };

  function buildFable() {
    var data = fableData[currentLevel];
    var container = document.getElementById('fable-content');
    container.innerHTML = '<div class="fable-stack">' + data.map(function (f, fi) {
      var optsHtml = f.opts.map(function (o) {
        return '<button class="fable-opt" data-type="' + o.type + '" data-fi="' + fi + '">' + o.text + '</button>';
      }).join('');
      return '<div class="fable-card">' +
        '<div class="fable-src">' + f.src + '</div>' +
        '<p class="fable-text">' + f.text + '</p>' +
        '<div class="fable-qlabel">' + f.qlabel + '</div>' +
        '<p class="fable-q">' + f.q + '</p>' +
        '<div class="fable-opts' + (f.column ? ' fable-opts-col' : '') + '">' + optsHtml + '</div>' +
        '<div class="fable-exp" id="fexp-' + fi + '">' + f.exp + '</div>' +
        '</div>';
    }).join('') + '</div>';

    container.querySelectorAll('.fable-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var fi = parseInt(this.dataset.fi);
        var type = this.dataset.type;
        var opts = this.closest('.fable-opts').querySelectorAll('.fable-opt');
        opts.forEach(function (o) { o.disabled = true; });
        if (type === 'correct') {
          this.classList.add('correct');
        } else {
          this.classList.add('wrong');
          opts.forEach(function (o) { if (o.dataset.type === 'correct') o.classList.add('correct'); });
        }
        document.getElementById('fexp-' + fi).classList.add('show');
      });
    });
  }
  buildFable();

  /* ════════════════════════════════════════
     ROOT BUILDER — 3 LEVELS
  ════════════════════════════════════════ */
  var wbData = {

    ilkokul: [
      {
        roots: [{ l: 'sun', m: 'güneş' }, { l: 'rain', m: 'yağmur' }],
        words: {
          'Sunlight':  'sun (güneş) + light (ışık) = güneş ışığı. Güneş parladığında sunlight vardır!',
          'Sunrise':   'sun (güneş) + rise (yükselmek) = güneşin doğuşu. Sabah güneş yükselir.',
          'Sunflower': 'sun (güneş) + flower (çiçek) = ayçiçeği. Güneşe dönen çiçek!',
          'Rainbow':   'rain (yağmur) + bow (yay) = gökkuşağı. Yağmurdan sonra çıkan renkli yay.',
          'Raincoat':  'rain (yağmur) + coat (palto) = yağmurluk. Yağmurda giyilen palto.',
          'Raindrop':  'rain (yağmur) + drop (damla) = yağmur damlası. Tek bir yağmur damlası.'
        }
      },
      {
        roots: [{ l: 'book', m: 'kitap' }, { l: 'day', m: 'gün' }],
        words: {
          'Bookshelf': 'book (kitap) + shelf (raf) = kitaplık. Kitapların durduğu raf.',
          'Bookmark':  'book (kitap) + mark (işaret) = yer imi. Kitapta sayfa yerini gösteren işaret.',
          'Bookstore': 'book (kitap) + store (mağaza) = kitabevi. Kitap satan dükkan.',
          'Daydream':  'day (gün) + dream (rüya) = hayal kurmak. Gündüz görülen rüya!',
          'Birthday':  'birth (doğum) + day (gün) = doğum günü. En sevilen gün!',
          'Holiday':   'holy (kutsal) + day (gün) = tatil günü. Çalışılmayan özel gün.'
        }
      }
    ],

    ortaokul: [
      {
        roots: [{ l: 'terra', m: 'earth, land' }, { l: 'forma', m: 'shape, form' }],
        words: {
          'Terraform':   'terra (earth) + forma (shape) — to reshape a planet\'s environment to resemble Earth.',
          'Terrarium':   'terra (earth) + -arium (container) — a glass enclosure for earth, plants or animals.',
          'Terrestrial': 'terra (earth) — of or relating to land, as opposed to the sea or sky.',
          'Formal':      'forma (shape) + -al — following the proper form or structure of something.',
          'Transform':   'trans- (across) + forma (shape) — to change form completely.',
          'Reform':      're- (again) + forma (shape) — to reshape, usually for the better.'
        }
      },
      {
        roots: [{ l: 'scrib / script', m: 'to write' }, { l: 'vis / vid', m: 'to see' }],
        words: {
          'Describe':   'de- + scribere — to write down the features of something in detail.',
          'Prescribe':  'pre- (before) + scribere — to write instructions in advance, like a doctor\'s prescription.',
          'Manuscript': 'manu (hand) + scriptus — originally something written entirely by hand.',
          'Visible':    'visibilis — able to be seen, perceptible to the eye.',
          'Vision':     'visio — the act of seeing, or a mental image of something.',
          'Provide':    'pro- (forward) + videre (to see) — to see ahead and prepare what is needed.'
        }
      }
    ],

    lise: [
      {
        roots: [{ l: 'logos', m: 'word, reason, study' }, { l: 'pathos', m: 'feeling, suffering, emotion' }],
        words: {
          'Dialogue':  'dia- (between) + logos — words exchanged between two or more people.',
          'Monologue': 'mono- (one) + logos — a long speech delivered by a single person.',
          'Prologue':  'pro- (before) + logos — words that come before the main text begins.',
          'Pathology': 'pathos (disease / suffering) + logy — the study of the causes and nature of disease.',
          'Empathy':   'em- (into) + pathos (feeling) — the capacity to feel into another person\'s emotional state.',
          'Apathy':    'a- (without) + pathos (feeling) — absence of interest, enthusiasm or concern.'
        }
      },
      {
        roots: [{ l: 'arche', m: 'origin, source, power' }, { l: 'telos', m: 'end, purpose, goal' }],
        words: {
          'Archetype':    'arche (first / original) + typos (type) — the original model or pattern. Central to Jung\'s psychology.',
          'Anarchy':      'an- (without) + arche (power) — the absence of governing authority or hierarchy.',
          'Monarchy':     'mono- (one) + arche (power) — rule concentrated in a single person.',
          'Teleology':    'telos (purpose) + logy — explanation that appeals to purpose or final goals rather than prior causes.',
          'Telomere':     'telos (end) + meros (part) — the protective cap at the end of a chromosome strand.',
          'Aristotelian': 'From Aristotle — his entire physics rests on telos: every thing moves naturally toward its proper purpose or end.'
        }
      }
    ]
  };

  function wbBuild() {
    var data = wbData[currentLevel];
    document.getElementById('wb-content').innerHTML = data.map(function (round, ri) {
      return '<div class="wb-round">' +
        '<div class="root-tiles">' + round.roots.map(function (r) {
          return '<div class="root-tile"><div class="root-latin">' + r.l + '</div><div class="root-meaning">' + r.m + '</div></div>';
        }).join('') + '</div>' +
        '<p class="wb-note">Click a word to reveal how these roots live inside it</p>' +
        '<div class="word-pool">' + Object.keys(round.words).map(function (w) {
          return '<button class="word-chip" data-word="' + w + '" data-ri="' + ri + '">' + w + '</button>';
        }).join('') + '</div>' +
        '<div class="wb-reveal-box" id="wbbox-' + ri + '">Click a word above...</div>' +
        '</div>';
    }).join('');

    document.getElementById('wb-content').querySelectorAll('.word-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var ri = parseInt(this.dataset.ri);
        document.querySelectorAll('#wb-content .wb-round')[ri].querySelectorAll('.word-chip')
          .forEach(function (c) { c.classList.remove('revealed'); });
        this.classList.add('revealed');
        var box = document.getElementById('wbbox-' + ri);
        box.textContent = wbData[currentLevel][ri].words[this.dataset.word];
        box.classList.add('filled');
      });
    });
  }
  wbBuild();
  document.getElementById('wb-replay').addEventListener('click', wbBuild);

  /* ════════════════════════════════════════
     SENTENCE SCRAMBLE — 3 LEVELS
  ════════════════════════════════════════ */
  var scrambleData = {

    ilkokul: [
      { prompt: 'Kelimeleri doğru sıraya diz:', sub: 'özne + fiil + sıfat', words: ['the', 'cat', 'is', 'big'], answer: 'the cat is big' },
      { prompt: 'Hayvanın ne yaptığını anlat:', sub: 'özne + fiil + zarf', words: ['the', 'fox', 'runs', 'fast'], answer: 'the fox runs fast' },
      { prompt: 'Bir soru cümlesi kur:', sub: '"is" ile soru', words: ['is', 'the', 'dog', 'happy', '?'], answer: 'is the dog happy ?' },
      { prompt: 'Cümleyi tamamla:', sub: 'renk cümlesi', words: ['the', 'sun', 'is', 'yellow'], answer: 'the sun is yellow' }
    ],

    ortaokul: [
      { prompt: 'Neden-sonuç cümlesi kur:', sub: 'past simple — neden-sonuç', words: ['the', 'hare', 'slept', ',', 'so', 'the', 'tortoise', 'won'], answer: 'the hare slept , so the tortoise won' },
      { prompt: 'Tilkinin yaptığını anlat:', sub: 'past simple + zarf', words: ['the', 'fox', 'walked', 'away', 'and', 'said', 'nothing'], answer: 'the fox walked away and said nothing' },
      { prompt: 'Genel bir gerçeği ifade et:', sub: 'present simple — alışkanlık', words: ['a', 'good', 'teacher', 'always', 'listens', 'first'], answer: 'a good teacher always listens first' },
      { prompt: 'Kelime sorusunu oluştur:', sub: 'soru cümlesi', words: ['what', 'does', 'the', 'word', '"benevolent"', 'mean', '?'], answer: 'what does the word "benevolent" mean ?' }
    ],

    lise: [
      { prompt: 'Build a philosophical statement:', sub: 'Philosophical definition', words: ['language', 'is', 'the', 'house', 'of', 'being'], answer: 'language is the house of being' },
      { prompt: "Express Aristotle's key idea:", sub: 'Teleological claim', words: ['every', 'action', 'aims', 'at', 'some', 'good'], answer: 'every action aims at some good' },
      { prompt: "Describe the fox's rationalisation:", sub: 'Complex past sentence', words: ['the', 'fox', 'could', 'not', 'reach', 'the', 'grapes', ',', 'so', 'he', 'called', 'them', 'sour'], answer: 'the fox could not reach the grapes , so he called them sour' },
      { prompt: 'Build an epistemological question:', sub: 'Question formation', words: ['how', 'do', 'we', 'know', 'what', 'we', 'know', '?'], answer: 'how do we know what we know ?' }
    ]
  };

  function buildScramble() {
    var data = scrambleData[currentLevel];
    var isTR = currentLevel === 'ilkokul';
    document.getElementById('scramble-content').innerHTML = data.map(function (s, si) {
      var shuffled = s.words.slice().sort(function () { return Math.random() - 0.5; });
      return '<div class="scramble-card" id="sc-' + si + '">' +
        '<div class="scramble-round">' + (isTR ? 'Bulmaca' : 'Puzzle') + ' ' + (si + 1) + ' / ' + data.length + '</div>' +
        '<p class="scramble-prompt">' + s.prompt + '</p>' +
        '<p class="scramble-sub">' + s.sub + '</p>' +
        '<div class="scramble-bank" id="bank-' + si + '">' +
        shuffled.map(function (w) {
          return '<button class="word-token" data-word="' + w + '" data-si="' + si + '" data-loc="bank">' + w + '</button>';
        }).join('') +
        '</div>' +
        '<div class="scramble-drop" id="drop-' + si + '">' +
        '<span id="drop-placeholder-' + si + '" style="font-size:0.72rem;color:var(--muted);font-style:italic;">' + (isTR ? 'Cümlen buraya gelecek — yukarıdan kelimelere tıkla' : 'Your sentence here — click words above to add them') + '</span>' +
        '</div>' +
        '<div>' +
        '<button class="scramble-check" data-si="' + si + '">' + (isTR ? 'Kontrol Et &#8594;' : 'Check &#8594;') + '</button>' +
        '<button class="scramble-reset" data-si="' + si + '">' + (isTR ? 'Sıfırla' : 'Reset') + '</button>' +
        '</div>' +
        '<div class="scramble-result" id="sc-res-' + si + '"></div>' +
        '</div>';
    }).join('');

    document.getElementById('scramble-content').addEventListener('click', function (e) {
      var token = e.target.closest('.word-token');
      if (token) {
        var si = parseInt(token.dataset.si);
        var bank = document.getElementById('bank-' + si);
        var drop = document.getElementById('drop-' + si);
        var ph = document.getElementById('drop-placeholder-' + si);
        if (token.dataset.loc === 'bank') {
          token.dataset.loc = 'drop';
          token.classList.add('in-answer');
          drop.appendChild(token);
          if (ph) ph.style.display = 'none';
        } else {
          token.dataset.loc = 'bank';
          token.classList.remove('in-answer');
          bank.appendChild(token);
          if (drop.querySelectorAll('.word-token').length === 0 && ph) ph.style.display = '';
        }
        return;
      }
      var check = e.target.closest('.scramble-check');
      if (check) {
        var si = parseInt(check.dataset.si);
        var tokens = document.getElementById('drop-' + si).querySelectorAll('.word-token');
        var answer = Array.from(tokens).map(function (t) { return t.dataset.word; }).join(' ');
        var res = document.getElementById('sc-res-' + si);
        if (answer.toLowerCase() === scrambleData[currentLevel][si].answer.toLowerCase()) {
          res.className = 'scramble-result show ok';
          res.innerHTML = currentLevel === 'ilkokul' ? '&#10003; Doğru! Çok iyi!' : '&#10003; Correct! Well done.';
          tokens.forEach(function (t) {
            t.disabled = true;
            t.style.background = '#edf7ed';
            t.style.borderColor = 'var(--sage)';
          });
        } else {
          res.className = 'scramble-result show no';
          res.innerHTML = currentLevel === 'ilkokul' ? '&#10007; Neredeyse! Tekrar dener misin?' : '&#10007; Not quite — try rearranging the words.';
        }
        return;
      }
      var reset = e.target.closest('.scramble-reset');
      if (reset) {
        var si = parseInt(reset.dataset.si);
        var bank = document.getElementById('bank-' + si);
        var drop = document.getElementById('drop-' + si);
        var ph = document.getElementById('drop-placeholder-' + si);
        drop.querySelectorAll('.word-token').forEach(function (t) {
          t.classList.remove('in-answer');
          t.style.background = '';
          t.style.borderColor = '';
          t.disabled = false;
          t.dataset.loc = 'bank';
          bank.appendChild(t);
        });
        if (ph) ph.style.display = '';
        var res = document.getElementById('sc-res-' + si);
        res.className = 'scramble-result';
        res.innerHTML = '';
      }
    });
  }
  buildScramble();

  /* ── CONTACT FORM ── */
  updateContactPanel();

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {

    var showFieldError = function(fieldId, msg) {
      var el = document.getElementById(fieldId);
      if (!el) return;
      el.style.borderColor = 'var(--terra)';
      if (!el.parentElement.querySelector('.field-error')) {
        var err = document.createElement('span');
        err.className = 'field-error';
        err.style.cssText = 'display:block;font-family:var(--mono);font-size:0.62rem;color:var(--terra);margin-top:4px;';
        err.textContent = msg;
        el.parentElement.appendChild(err);
      }
    };

    var clearFormErrors = function() {
      contactForm.querySelectorAll('.field-error').forEach(function(e) { e.remove(); });
      contactForm.querySelectorAll('.form-input').forEach(function(e) { e.style.borderColor = ''; });
    };

    var validateForm = function() {
      clearFormErrors();
      var valid = true;
      var nameVal  = (document.getElementById('field-name')  || {}).value || '';
      var emailVal = (document.getElementById('field-email') || {}).value || '';
      var ageVal   = (document.getElementById('field-age')   || {}).value || '';

      if (!nameVal.trim()) {
        showFieldError('field-name', 'Öğrencinin adını girin.');
        valid = false;
      }
      if (!ageVal) {
        showFieldError('field-age', 'Yaş grubunu seçin.');
        valid = false;
      }
      if (!emailVal.trim()) {
        showFieldError('field-email', 'E-posta adresinizi girin.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.trim())) {
        showFieldError('field-email', 'Geçerli bir e-posta adresi girin.');
        valid = false;
      }
      return valid;
    };

    var buildEmailBody = function() {
      var name  = (document.getElementById('field-name')  || {}).value || '';
      var age   = (document.getElementById('field-age')   || {}).value || '';
      var email = (document.getElementById('field-email') || {}).value || '';
      var phone = (document.getElementById('field-phone') || {}).value || '';
      var countryCode = (document.getElementById('field-country-code') || {}).value || '+90';
      var fullPhone = phone.trim() ? countryCode + ' ' + phone.trim() : '';
      var notes = (document.getElementById('field-notes') || {}).value || '';
      var quizSection = quizState.completed
        ? '\n\n--- QUIZ SONUCU ---\nSeviye: ' +
          (quizState.level === 'ilkokul' ? 'Level 1' : quizState.level === 'ortaokul' ? 'Level 2' : 'Level 3') +
          '\nPuan: ' + quizState.score + ' / ' + quizState.total + '\n' +
          quizState.answers.map(function(a, i) {
            return (i+1) + '. ' + (a.skipped ? 'Atlandı' : a.correct ? 'Doğru ✓' : 'Yanlış ✗ — ' + a.chosen);
          }).join('\n')
        : '\n\n--- QUIZ: Tamamlanmadı ---';
      return '--- YENİ BAŞVURU ---\n\n' +
        'Ad: ' + name.trim() + '\nYaş Grubu: ' + age + '\nE-posta: ' + email.trim() +
        (fullPhone ? '\nTelefon: ' + fullPhone : '') +
        (notes.trim() ? '\n\nİlgi Alanları & Hedefler:\n' + notes.trim() : '') +
        quizSection;
    };

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();

      if (!validateForm()) {
        return false;
      }

      var submitBtn = contactForm.querySelector('.form-submit');
      var thanks = document.getElementById('form-thanks');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Gönderiliyor...';
      thanks.classList.remove('show');

      var url = (typeof SITE_GENERAL !== 'undefined' && SITE_GENERAL.formspree_url)
        ? SITE_GENERAL.formspree_url : '';

      if (!url || url.indexOf('YOUR_FORM_ID') !== -1) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Mesaj Gönder →';
        thanks.style.color = 'var(--terra)';
        thanks.textContent = '✗ Bir hata oluştu. Lütfen doğrudan e-posta gönderin: ' +
          ((typeof SITE_GENERAL !== 'undefined') ? SITE_GENERAL.email : '');
        thanks.classList.add('show');
        return false;
      }

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'Yeni Başvuru — ' + ((document.getElementById('field-name') || {}).value || '').trim(),
          _replyto: ((document.getElementById('field-email') || {}).value || '').trim(),
          name:     ((document.getElementById('field-name')  || {}).value || '').trim(),
          age:      ((document.getElementById('field-age')   || {}).value || ''),
          email:    ((document.getElementById('field-email') || {}).value || '').trim(),
          phone:    (function(){ var p=(document.getElementById('field-phone')||{}).value||''; var c=(document.getElementById('field-country-code')||{}).value||'+90'; return p.trim() ? c+' '+p.trim() : '—'; })(),
          notes:    ((document.getElementById('field-notes') || {}).value || '').trim() || '—',
          message:  buildEmailBody()
        })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.ok) {
          thanks.style.color = 'var(--sage)';
          thanks.textContent = '✓ Mesajınız iletildi — 24 saat içinde döneceğim!';
          thanks.classList.add('show');
          submitBtn.style.display = 'none';
          clearFormErrors();
        } else { throw new Error('form error'); }
      })
      .catch(function() {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Mesaj Gönder →';
        thanks.style.color = 'var(--terra)';
        thanks.textContent = '✗ Bir hata oluştu. Lütfen tekrar deneyin ya da doğrudan e-posta gönderin: ' +
          ((typeof SITE_GENERAL !== 'undefined') ? SITE_GENERAL.email : '');
        thanks.classList.add('show');
      });

      return false;
    });
  }

}); // end DOMContentLoaded
