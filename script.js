const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

const estimator = document.querySelector('[data-estimator]');
if (estimator) {
  const totalEl = estimator.querySelector('[data-total]');
  const earningsEl = estimator.querySelector('[data-earnings]');
  const calculate = () => {
    const active = Math.max(0, Number(estimator.activeHours.value || 0));
    const waiting = Math.max(0, Number(estimator.waitingHours.value || 0));
    const journey = estimator.journey.value;
    let activeRate = active >= 3 ? 15.5 : 16;
    let waitingRate = 8;
    let bookingFee = 1.99;
    let premium = journey === 'test' || journey === 'collection' ? 2 : 0;
    const customer = active * activeRate + waiting * waitingRate + bookingFee + premium;
    const mate = active * 14.15 + waiting * 7.5 + premium;
    totalEl.textContent = `€${customer.toFixed(2)}`;
    earningsEl.textContent = `€${mate.toFixed(2)}`;
  };
  estimator.addEventListener('input', calculate);
  estimator.addEventListener('change', calculate);
  estimator.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' });
  });
  calculate();
}

const waitlist = document.querySelector('[data-waitlist]');
if (waitlist) {
  waitlist.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = waitlist.querySelector('[data-form-status]');
    status.textContent = 'Thanks — your interest has been captured for the feasibility pilot demo.';
    waitlist.reset();
  });
}

const header = document.querySelector('[data-header]');
const onScroll = () => {
  if (!header) return;
  header.style.boxShadow = window.scrollY > 14 ? '0 10px 30px rgba(18,58,41,.08)' : 'none';
};
window.addEventListener('scroll', onScroll);
onScroll();
