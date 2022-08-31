import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { DialogServiceService } from './services/dialog-service.service';
import { TutorialGuard } from './services/guard/tutorial.guard';
import { TokensenderInterceptor } from './services/tokensender.interceptor';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from './services/guard/auth.guard';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,IonicStorageModule.forRoot(), IonicModule.forRoot(),NgSelectModule,AppRoutingModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AuthService,TutorialGuard,AuthGuard,DialogServiceService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokensenderInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
