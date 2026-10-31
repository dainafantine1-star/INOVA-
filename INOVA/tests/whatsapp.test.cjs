const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const scope = {window:{}};
vm.runInNewContext(fs.readFileSync('dist/whatsapp.js','utf8'),scope);
const whatsapp = scope.window.InoveWhatsApp;
const values = {desafio:'Escala 5x2 & SAC', volume:'Até 500', cobertura:'24 horas, 7 dias por semana', canais:'WhatsApp e chat'};
const message = whatsapp.briefMessage(values);
// Test-only number, never written to commercial configuration or contacted.
const url = new URL(whatsapp.createUrl('5511999999999',message));
assert.equal(url.origin,'https://wa.me');
assert.equal(url.pathname,'/5511999999999');
assert.equal(url.searchParams.get('text'),message);
for (const value of Object.values(values)) assert.ok(message.includes(value));
for (const invalid of ['', 'undefined', '1234', '+55 (11) 99999-9999', 'https://evil.example']) assert.equal(whatsapp.createUrl(invalid,message),null);
for (const label of ['Segunda a sexta, 8h às 18h', 'Todos os dias, 8h às 22h', '24 horas, todos os dias']) {
 const text = whatsapp.coverageMessage(label);
 assert.ok(text.includes(label));
 assert.equal(new URL(whatsapp.createUrl('551133334444',text)).searchParams.get('text'),text);
}
const home = fs.readFileSync('dist/index.html','utf8');
assert.ok(!home.includes('id="copy"'));
assert.ok(!home.includes('id="brief-text"'));
assert.ok(!home.includes('Copie e encaminhe'));
console.log('WhatsApp: form values, all coverage choices, URL encoding and invalid recipient checks passed.');
