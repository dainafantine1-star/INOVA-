'use strict';
window.InoveWhatsApp = Object.freeze({
  createUrl(number, message) {
    if (!/^55\d{10,11}$/.test(number)) return null;
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  },
  briefMessage(data) {
    return ['Olá, Inove! Gostaria de uma proposta para cobrir meu atendimento na escala 5x2.', '',
      `Chamadas ou tickets por mês: ${data.volume}`,
      `Cobertura: ${data.cobertura}`, `Canais: ${data.canais}`, '',
      'Quero conhecer as faixas mensais e os valores da cobertura.'].join('\n');
  },
  coverageMessage(label) {
    return 'Olá, Inove! Gostaria de uma proposta de cobertura para a escala 5x2.\nCobertura escolhida: ' + label + '\nQuero conhecer as faixas mensais e os valores da cobertura.';
  }
});
