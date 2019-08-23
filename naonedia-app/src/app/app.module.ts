import './vendor.ts';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';
import { EstimateModule } from './estimate/estimate.module';
import { ParticipateModule } from './participate/participate.module';
import { ResultModule } from './result/result.module';
import { DiscoverModule } from './discover/discover.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

import { NavbarComponent, FooterComponent, ActiveMenuDirective, ErrorComponent, MainComponent } from './layouts';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgxWebstorageModule } from 'ngx-webstorage';

import { Injector, APP_INITIALIZER } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED } from '@angular/common';

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const langToSet = 'fr';
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('fr');
      translate.use(langToSet).subscribe(() => {
        console.log(`Successfully initialized '${langToSet}' language.'`);
      }, err => {
        console.error(`Problem with '${langToSet}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}

@NgModule({
  imports: [
    BrowserModule,

    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-' }),
    SharedModule.forRoot(),
    HomeModule,
    EstimateModule,
    ParticipateModule,
    ResultModule,
    DiscoverModule,
    HealthcheckModule,
    CoreModule,

    // Configure i18n
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, ActiveMenuDirective, FooterComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
