const people = {
  kyle: {
    name: 'Kyle Knox', age: '۲۱ سال', role: 'وارث پادشاهی سایه‌ها', symbol: '♛', kind: 'KYLE KNOX',
    desc: 'ساکت، محتاط و سخت‌اعتماد؛ پشت نگاه سردش چیزهای زیادی پنهان شده.',
    intro: 'بالاخره تصمیم گرفتی پیدات بشه؟ فکر کردم راه رو گم کردی.',
    bio: 'کایل در توکیو زندگی می‌کند و در یک کتاب‌فروشی کار می‌کند. شب‌ها را با کتاب، قهوه و سکوت می‌گذراند. به‌راحتی به کسی اعتماد نمی‌کند، اما مهربانی‌اش را پشت رفتار سردش پنهان می‌کند.',
    appearance: 'موهای قرمز تیره، چشم‌های مشکی باریک و پوستی گندمی؛ معمولاً لباس‌های تیره و رسمی می‌پوشد.',
    personality: 'باهوش، محتاط، کم‌حرف و دیرجوش؛ با آدم‌های مورداعتمادش شوخ‌طبع‌تر و مراقب‌تر می‌شود.',
    likes: 'کتاب، قهوه، موسیقی پیانو، شب‌های بارانی و سکوت',
    quote: 'بالاخره تصمیم گرفتی پیدات بشه؟ فکر کردم راه رو گم کردی.'
  },
  selin: {
    name: 'Selin', age: '۱۸ سال', role: 'دختری با رازی ناگفته', symbol: '✧', kind: 'SELIN',
    desc: 'مهربان و آرام، با نگاهی نقره‌ای و گذشته‌ای که هنوز تمام نشده.',
    intro: 'سلام... خوش اومدی. نمی‌دونم چطور به اینجا رسیدی، اما حس می‌کنم دیدارمون تصادفی نبوده. می‌تونم اسمت رو بدونم؟',
    bio: 'سلین دختری آرام و مهربان است. کنجکاوی و شجاعتش گاهی او را به سمت رازهایی می‌برد که بهتر است پنهان بمانند.',
    appearance: 'موهای بلند و کمی موج‌دار مشکی، چتری، چشم‌های درشت نقره‌ای و پوستی روشن.',
    personality: 'مهربان، آرام و کنجکاو؛ با وجود ظاهر آرامش، شجاعت روبه‌رو شدن با ناشناخته‌ها را دارد.',
    likes: 'هنوز در مسیر شناخت شخصیتش کشف می‌شوند',
    quote: 'حس می‌کنم دیدارمون تصادفی نبوده.'
  }
};

const app = document.getElementById('app');
let current = null;
let activePage = 'home';

function setActiveNav(page) {
  activePage = page;
  document.querySelectorAll('.bottom button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });
}

function home() {
  current = null;
  setActiveNav('home');
  app.innerHTML = `
    <section class="welcome">
      <span class="eyebrow">خوش اومدی به دنیای AFTERDARK</span>
      <h1>بعضی رازها،<br><em>منتظر کشف شدنن.</em></h1>
      <p>به مرز خیال و حقیقت خوش اومدی؛ حاضری راز عمیق هر شخصیت رو کشف کنی؟</p>
    </section>
    <section class="section-head"><div><small>THE CHARACTERS</small><h2>شخصیت‌ها</h2></div><span class="count">۰۲ شخصیت</span></section>
    <div class="characters">${Object.entries(people).map(([id, p]) => `
      <article class="character" data-id="${id}" tabindex="0" role="button" aria-label="مشاهده پروفایل ${p.name}">
        <div class="portrait ${id === 'selin' ? 'selin' : ''}"><span>${p.symbol}</span><small>PORTRAIT</small></div>
        <div class="details"><span class="tag">${p.kind}</span><h3>${p.name}</h3><p>${p.desc}</p><span class="open">مشاهده‌ی شخصیت ←</span></div>
      </article>`).join('')}
    </div>`;
  document.querySelectorAll('.character').forEach(el => {
    const open = () => profile(el.dataset.id);
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
  });
}

function profile(id) {
  current = id;
  const p = people[id];
  app.innerHTML = `
    <div class="subpage">
      <button class="back" id="back">→ بازگشت به شخصیت‌ها</button>
      <section class="profile-hero ${id === 'selin' ? 'selin' : ''}">
        <div class="profile-art"><span>${p.symbol}</span><small>PORTRAIT</small></div>
        <div class="profile-heading"><span class="eyebrow">${p.kind}</span><h2>${p.name}</h2><p>${p.age} <i>·</i> ${p.role}</p></div>
      </section>
      <section class="profile-section"><span class="section-kicker">ABOUT</span><h3>دربارهٔ شخصیت</h3><p>${p.bio}</p></section>
      <section class="profile-section"><span class="section-kicker">PERSONALITY</span><h3>ویژگی‌های شخصیتی</h3><p>${p.personality}</p></section>
      <section class="profile-section"><span class="section-kicker">APPEARANCE</span><h3>ظاهر</h3><p>${p.appearance}</p></section>
      <section class="profile-section"><span class="section-kicker">INTERESTS</span><h3>علایق</h3><p>${p.likes}</p></section>
      <blockquote class="character-quote">«${p.quote}»</blockquote>
      <button class="primary" id="start">شروع گفت‌وگو</button>
    </div>`;
  document.getElementById('back').onclick = home;
  document.getElementById('start').onclick = () => chat(id);
}

function chat(id) {
  const p = people[id];
  current = id;
  app.innerHTML = `
    <div class="subpage">
      <button class="back" id="back">→ بازگشت به پروفایل</button>
      <div class="chat-heading"><span class="chat-avatar">${p.symbol}</span><div><h2>${p.name}</h2><small>AFTERDARK · گفت‌وگوی آزمایشی</small></div></div>
      <div class="chatbox" id="messages"><div class="bubble them">${p.intro}</div></div>
      <div class="chat-input"><input id="message" placeholder="پیامت رو بنویس..." autocomplete="off" maxlength="1000"><button id="send">ارسال</button></div>
      <p class="notice">نسخهٔ آزمایشی: این گفت‌وگو هنوز به هوش مصنوعی متصل نیست.</p>
    </div>`;
  document.getElementById('back').onclick = () => profile(id);
  const send = () => {
    const input = document.getElementById('message');
    const value = input.value.trim();
    if (!value) return;
    const bubble = document.createElement('div');
    bubble.className = 'bubble me';
    bubble.textContent = value;
    document.getElementById('messages').appendChild(bubble);
    input.value = '';
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
  };
  document.getElementById('send').onclick = send;
  document.getElementById('message').addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
}

home();
document.querySelectorAll('.bottom button').forEach(btn => btn.addEventListener('click', () => {
  const page = btn.dataset.page;
  if (page === 'home') return home();
  setActiveNav(page);
  const labels = { chats: 'گفت‌وگوها', search: 'جست‌وجو', create: 'ساخت شخصیت', profile: 'پروفایل' };
  app.innerHTML = `<div class="empty"><span class="eyebrow">AFTERDARK</span><h2>${labels[page]}</h2><p>این بخش در مرحلهٔ بعدی توسعهٔ AFTERDARK فعال می‌شه.</p></div>`;
}));

document.getElementById('music').addEventListener('click', () => alert('موسیقی در نسخه‌ی آزمایشی هنوز فعال نیست.'));
