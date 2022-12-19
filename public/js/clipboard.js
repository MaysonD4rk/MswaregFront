const clipboard = new ClipboardJS('.btn-to-copy');

document.getElementById('qrcodeTxt').readOnly = true;

clipboard.on('success', function (e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    alert("Você copiou o código: " + e.text + " - copie e cole no seu aplicativo de realizar transações via pix!")
    e.clearSelection();
});

clipboard.on('error', function (e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});