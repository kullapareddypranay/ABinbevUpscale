import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit {
  @Input('appHideHeader') toolbar: any;
  private toolbarHeight;
  constructor(private renderer: Renderer2, private domCtrl: DomController) {

  }
  ngOnInit(): void {
    this.toolbar = this.toolbar.el;
    this.domCtrl.read(() => {
      this.toolbarHeight = this.toolbar.clientHeight;
    })
  }

  @HostListener('ionScroll',['$event']) onContentScroll($event){
   
    const scrollTop=$event.detail.scrollTop;
    
    let newPosition=  (scrollTop/3.2);
    if(newPosition<this.toolbarHeight){
      newPosition = this.toolbarHeight;
    }
    

    let newOpacity=1;
    newOpacity= 1-(newPosition/-this.toolbarHeight);
    

    this.domCtrl.write(()=>{
      this.renderer.setStyle(this.toolbar,'top',`-${newPosition}px`);
      this.renderer.setStyle(this.toolbar,'opacity',-newOpacity);
    });

  }
}
