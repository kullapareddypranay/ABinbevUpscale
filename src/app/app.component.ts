import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage:Storage,private authService:AuthService) {
   
  }

  async ngOnInit(){
    await this.storage.create()
    await this.authService.getUser().subscribe((res)=>{
      // console.log(res)

    },(err)=>{
      // console.log(err)
      if(err.status===401){
        this.authService.removeToken();
      }
    })
  }

  
 
}
