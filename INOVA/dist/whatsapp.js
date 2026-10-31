'use strict';
window.InoveWhatsApp = Object.freeze({
  createUrl(number, message) {
    if (!/^55\d{10,11}$/.test(number)) return null;
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  },
  briefMessage(data) {
    return ['Olá, Inove! Gostaria de uma proposta de atendimento para minha empresa.', '',
      `Principal desafio: ${data.desafio}`, `Contatos por mês: ${data.volume}`,
      `Cobertura: ${data.cobertura}`, `Canais: ${data.canais}`, '',
      'Quero entender os valores e como funciona o pagamento pelo uso.'].join('\n');
  },
  coverageMessage(label) {
    return 'Olá, Inove! Gostaria de uma proposta para minha empresa.\nCobertura escolhida: ' + label + '\nQuero entender os valores e como funciona o pagamento pelo uso.';
  }
});
