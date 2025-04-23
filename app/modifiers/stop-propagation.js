import Modifier from 'ember-modifier';

export default class StopPropagationModifier extends Modifier {
  modify(element) {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}
