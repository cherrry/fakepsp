const Crawler = require('crawler');

const RE_ALPHA = /([a-zü]+)/;
const RE_WORD = /([^a-z]+)\s*([a-z]+[1-6])/;
const c = new Crawler();

const run = (type, link) => new Promise((resolve, reject) => {
  c.queue({
    uri: `http://corpus.eduhk.hk/cantonese/scramble/${type}/${link}.html`,
    callback: (err, {$}, done) => {
      if (err != null) {
        reject(err);
        return done();
      }
      const rows = $('table tr');
      const pth = $(rows[1]).find('td:first-child')
        .text().trim().toLowerCase().match(RE_ALPHA)[1];

      let results = [];
      for (let i = 1; i < rows.length; ++i) {
        const offset = i === 1 ? 1 : 0;
        const cols = $(rows[i]).find('td');
        const jyut = $(cols[offset]).text().trim();
        $(cols[offset+1]).text().split(',').forEach((w) => {
          if (!RE_WORD.test(w.trim())) {
            return;
          }
          const match = RE_WORD.exec(w.trim());
          results.push({
            metadata: {type, pth, jyut},
            word: {word: match[1].trim(), pth: '', jyut: match[2].trim()},
          });
        });
      }
      resolve(results);
      return done();
    },
  });
});

const initials = [
  'b', 'p', 'm', 'f', 'd', 't', 'n',
  'l', 'g', 'k', 'h', 'j', 'q', 'x',
  'zh', 'ch', 'sh', 'r', 'z', 'c', 's',
  'y', 'w', '0',
];

const finals = [
  'a', 'ia', 'ua', 'o', 'uo', 'e', 'ie',
  'ue', 'i', 'i_1', 'i_2', 'u1', 'u2', 'ai',
  'uai', 'ei', 'ui', 'ao', 'iao', 'ou', 'iu',
  'an', 'ian', 'uan1', 'uan2', 'en', 'in', 'un1',
  'un2', 'an', 'iang', 'uang', 'eng', 'ing', 'ueng',
  'ong', 'iong',
];

const everything = initials.map((i) => run('initials', i))
  .concat(finals.map((f) => run('finals', f)));

Promise.all(everything).then((results) => {
  let finalResult = [];
  results.forEach((result) => {
    result.forEach((value) => finalResult.push(value));
  });
  console.log(JSON.stringify(finalResult, null, 2));
});
