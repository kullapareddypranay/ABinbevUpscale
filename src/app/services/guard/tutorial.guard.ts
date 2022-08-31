import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Storage} from '@ionic/storage-angular'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialGuard implements CanActivate {
  constructor(private storage:Storage,private router:Router){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      const isComplete=await this.storage.get('tutorialComplete')
      if(!isComplete){
        this.router.navigateByUrl('/tutorial')
      }
    return isComplete;
  }
  
}
