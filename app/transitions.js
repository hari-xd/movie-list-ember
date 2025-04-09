export default function () {
    this.transition(
      this.fromRoute('index'),
      this.toRoute('movie-list'),
      this.use('toLeft'),
      this.reverse('toRight')
    );
  
    this.transition(
      this.fromRoute('movie-list'),
      this.toRoute('addm'),
      this.use('toLeft'),
      this.reverse('toRight')
    );
  
    this.transition(
      this.fromRoute('movie-list'),
      this.toRoute('delm'),
      this.use('toLeft'),
      this.reverse('toRight')
    );
  
    this.transition(
      this.fromRoute('movie-list'),
      this.toRoute('editMovie'),
      this.use('toLeft'),
      this.reverse('toRight')
    );
  
    // Optional: add a catch-all fade transition for anything else
    this.transition(
      this.fromRoute(() => true),
      this.toRoute(() => true),
      this.use('fade'),
      this.reverse('fade')
    );
  }
  