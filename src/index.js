import './styles/main.scss';

import indexTemplate from './pages/index/index.hbs';
import articleTemplate from './components/article/article.hbs';
import spinnerTemplate from './components/spinner/spinner.hbs';

const urls = [
  'data1.json',
  'data2.json',
  'data3.json',
  'data4.json'
];

document.addEventListener("DOMContentLoaded", function() {
  const root = $('#root');
  root.append(indexTemplate());
  const content = $('.content');

  const promises = [];

  urls.forEach(url => {
        promises.push(
            fetch("api/" + url)
                .then(data => data.json())
                .catch(e => console.log(e))
        )
  });

  Promise.all(promises)
      .then(responses => {
        responses.forEach(json => {
          json.data.forEach(data => {
            content.append(articleTemplate(data));
          })
        })
      })
});
