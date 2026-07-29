const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

function startPayment(courseKey) {
  const url = window.SPARKLIFE_CONFIG?.payments?.[courseKey];
  if (url) {
    window.location.href = url;
    return;
  }
  const courseNames = {
    cprAed: 'Adult CPR & AED',
    bls: 'BLS for Healthcare Providers',
    firstAid: 'First Aid + CPR/AED',
    pediatric: 'Pediatric CPR & First Aid',
    groupDeposit: 'Private Group Training Deposit'
  };
  const course = encodeURIComponent(courseNames[courseKey] || 'CPR Training');
  window.location.href = `register.html?course=${course}`;
}

document.querySelectorAll('[data-pay]').forEach(btn => btn.addEventListener('click', () => startPayment(btn.dataset.pay)));

const params = new URLSearchParams(window.location.search);
const courseParam = params.get('course');
const courseSelect = document.querySelector('#course');
if (courseParam && courseSelect) {
  [...courseSelect.options].forEach(o => { if (o.text.toLowerCase().includes(courseParam.toLowerCase())) o.selected = true; });
}

const regForm = document.querySelector('#registrationForm');
if (regForm) {
  regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(regForm);
    const courseKey = data.get('course');
    const url = window.SPARKLIFE_CONFIG?.payments?.[courseKey];
    localStorage.setItem('sparklifeRegistration', JSON.stringify(Object.fromEntries(data.entries())));
    if (url) window.location.href = url;
    else document.querySelector('#paymentNotice').hidden = false;
  });
}



