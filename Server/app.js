const Tesseract = require("tesseract.js");

(async () => {
  const worker = await Tesseract.createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  const { data: { text } } = await worker.recognize('../testImages/test-eng1.png');
  console.log(`Hey this get converted....\n\n ${text}`);

  await worker.terminate();
})();

