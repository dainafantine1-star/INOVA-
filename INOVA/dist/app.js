'use strict';
const CONTACT = window.INOVE_CONTACT || {whatsapp:''};
const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => { const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open); });
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
const contact = document.querySelector('#contact-dialog');
document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',()=>contact.showModal()));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelector('#privacy-open').addEventListener('click',()=>document.querySelector('#privacy').showModal());
const form = document.querySelector('#brief-form');
const contactError = document.querySelector('#contact-error');

function openWhatsapp(message) {
  const url = window.InoveWhatsApp.createUrl(CONTACT.whatsapp, message);
  if (!url) {
    contactError.textContent = 'O WhatsApp da Inove ainda não foi configurado. Tente novamente mais tarde.';
    contactError.hidden = false;
    if (!contact.open) contact.showModal();
    return false;
  }
  // Same-tab navigation avoids popup blockers on phones and opens the native app when available.
  window.location.assign(url);
  return true;
}
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  contactError.hidden = true;
  const get = id => document.getElementById(id).value;
  const message = window.InoveWhatsApp.briefMessage({volume:get('volume'), cobertura:get('cobertura'), canais:get('canais')});
  openWhatsapp(message);
});

const coverageExamples = {
  business: { hours: 50, gap: 118, label: 'Atendimento de segunda a sexta, das 8h às 18h. 50 horas por semana.' },
  extended: { hours: 98, gap: 70, label: 'Atendimento todos os dias, das 8h às 22h. 98 horas por semana.' },
  full: { hours: 168, gap: 0, label: 'Atendimento todos os dias, 24 horas por dia. 168 horas por semana.' }
};
document.querySelectorAll('input[name="coverage"]').forEach(input => input.addEventListener('change', () => {
  if (!input.checked) return;
  const example = coverageExamples[input.value];
  document.getElementById('coverage-hours').textContent = example.hours + 'h';
  document.getElementById('coverage-gap').textContent = example.gap ? example.gap + ' horas ficam fora dessa janela.' : 'A semana inteira está coberta.';
  const map = document.getElementById('coverage-map');
  map.dataset.mode = input.value;
  map.setAttribute('aria-label', 'Exemplo: ' + example.label);
}));

// Selected coverage goes directly into the WhatsApp message.
const coverageButton = document.getElementById('coverage-whatsapp');
coverageButton.addEventListener('click', () => {
  const selected = document.querySelector('input[name="coverage"]:checked').value;
  const example = coverageExamples[selected];
  const message = window.InoveWhatsApp.coverageMessage(example.label);
  openWhatsapp(message);
});

const costs = ['internal-cost', 'structure-cost', 'inove-cost'].map(id => document.getElementById(id));
const money = new Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'});
function compareCosts() {
  const result = document.getElementById('cost-result');
  if (costs.some(input => input.value.trim() === '' || !input.validity.valid)) {
    result.textContent = 'Preencha os três valores para comparar o custo mensal.';
    return;
  }
  const [team, structure, proposal] = costs.map(input => Number(input.value));
  const internal = team + structure;
  const difference = internal - proposal;
  const prefix = 'Custo interno: ' + money.format(internal) + '/mês. ';
  result.textContent = prefix + (difference > 0 ? 'Com os valores informados, a proposta fica ' + money.format(difference) + ' abaixo por mês (' + money.format(difference * 12) + ' em 12 meses).' : difference < 0 ? 'Com os valores informados, a proposta fica ' + money.format(-difference) + ' acima por mês. Compare também o escopo e a cobertura.' : 'Os custos mensais são iguais. Compare também o escopo e a cobertura.');
}
costs.forEach(input => input.addEventListener('input', compareCosts));
document.getElementById('cost-form').addEventListener('submit', event => event.preventDefault());
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {entry.target.classList.add('motion-in'); observer.unobserve(entry.target);}
  }), {threshold:0.12});
  document.querySelectorAll('.v3-heading-row, .v3-small-copy, .v3-rule-list, .v3-close, .insight-list').forEach(element => observer.observe(element));
}
