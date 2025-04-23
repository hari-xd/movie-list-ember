import { helper } from '@ember/component/helper';

export default helper(function includes([array, value]) {
  return array.includes(value);
});
