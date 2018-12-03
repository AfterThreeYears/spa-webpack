// import { isArray } from 'lodash-es';
import styles from './sync.css';
import help from '../common/index';
import bg from '../../assert/imgs/image.png';

console.log(bg);

console.log('....', styles);
console.log(help.vserion);
const sync = function() {
  console.log('sync');
  document.getElementById('app').innerHTML = `<img src="${bg}" /><h1 class='${styles.test}'>h1</h1>`;
}

const array = function(args) {
  // console.log(isArray(args));
}

export {
  sync, array,
};
