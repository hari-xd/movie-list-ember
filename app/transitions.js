export default function () {
    this.transition(
      this.fromRoute(() => true),
      this.toRoute(() => true),
      this.use('fade', { duration: 500 }),
      this.reverse('fade', { duration: 500 })
    );
  }
  