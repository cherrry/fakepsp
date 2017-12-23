/* global React ReactDOM document: true */

const DATA = {
  initial: [
  ],
  final: [
    {
      pair: {pth: 'ia', jyut: 'aa'},
      examples: [
        {word: '加', pth: 'jia1', jyut: 'gaa1'},
        {word: '家', pth: 'jia1', jyut: 'gaa1'},
        {word: '嘉', pth: 'jia1', jyut: 'gaa1'},
        {word: '假', pth: 'jia3', jyut: 'gaa3'},
        {word: '價', pth: 'jia4', jyut: 'gaa3'},
        {word: '蝦', pth: 'xia1', jyut: 'haa4'},
        {word: '霞', pth: 'xia2', jyut: 'haa4'},
        {word: '下', pth: 'xia4', jyut: 'haa6'},
        {word: '鴉', pth: 'ya1', jyut: 'aa1'},
        {word: '亞', pth: 'ya4', jyut: 'aa3'},
      ],
    },
    {
      pair: {pth: 'ia', jyut: 'aap'},
      examples: [
        {word: '夾', pth: 'jia1', jyut: 'gaap3'},
        {word: '甲', pth: 'jia3', jyut: 'gaap3'},
        {word: '鴨', pth: 'ya1', jyut: 'aap3'},
      ],
    },
    {
      pair: {pth: 'ia', jyut: 'aat'},
      examples: [
        {word: '壓', pth: 'ya1', jyut: 'aat3'},
        {word: '押', pth: 'ya1', jyut: 'aat3'},
      ],
    },
    {
      pair: {pth: 'ia', jyut: null},
      examples: [
        {word: '佳', pth: 'jia1', jyut: 'gaai1'},
        {word: '涯', pth: 'ya2', jyut: 'ngaai4'},
        {word: '崖', pth: 'ya2', jyut: 'ngaai4'},
        {word: '洽', pth: 'qia4', jyut: 'hap6'},
        {word: '恰', pth: 'qia4', jyut: 'hap1'},
        {word: '瞎', pth: 'xia1', jyut: 'hat6'},
        {word: '轄', pth: 'xia2', jyut: 'hat6'},
      ],
    },
  ],
  tone: [
  ],
};

const c = React.createElement;
const getHeader = (lang, type) => {
  return [
    lang === 'jyut' ? '粵拼' : '普通話',
    type === 'initial' ? '聲母' : (type === 'final' ? '韻母' : '聲調'),
  ].join('');
};
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      base: 'jyut',
      type: 'final',
      filter: 'aa',
    };
  }
  render() {
    const {base, type, filter} = this.state;
    const other = base === 'jyut' ? 'pth' : 'jyut';
    const data = DATA[type];
    let content = [];
    for (let i = 0; i < data.length; i++) {
      const {pair} = data[i];
      if (pair[base] == filter) {
        content.push(data[i]);
      }
    }
    return (
      c('table', null, [
        c('thead', null, [
          c('tr', null, [
            c('th', null, getHeader(base, type)),
            c('th', null, getHeader(other, type)),
            c('th', null, '例子'),
          ]),
        ]),
        c('tbody', null, content.map((row, idx) => {
          const examples = row.examples.map((e, jdx) => {
            return c('span', {key: jdx}, `${e.word} ${e[base]} → ${e[other]}`);
          });
          if (idx === 0) {
            return c('tr', {key: idx}, [
              c('td', {rowSpan: content.length}, filter),
              c('td', null, row.pair[other]),
              c('td', null, examples),
            ]);
          } else {
            return c('tr', {key: idx}, [
              c('td', null, row.pair[other]),
              c('td', null, examples),
            ]);
          }
        })),
      ])
    );
  }
}

ReactDOM.render(c(App), document.getElementById('app'));
