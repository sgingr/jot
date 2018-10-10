export default function(){
  // Add your transitions here, like:
     this.transition(
       this.fromRoute('home'),
       this.toRoute('notes'),
       this.use('toLeft'),
       this.reverse('toRight')
     );
}
