// app/helpers/inc.js
import { helper } from '@ember/component/helper';

export default helper(function inc([value]) {
  return parseInt(value) + 1;
});
