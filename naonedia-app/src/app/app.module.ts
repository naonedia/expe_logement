import './vendor.ts';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ChatBotSharedModule } from './shared';
import { ChatBotHomeModule } from './home/home.module';
import { ChatBotCoreModule } from './core/core.module';
import { ChatBotModelModule } from './model/model.module';

import { NavbarComponent, FooterComponent, ActiveMenuDirective, ErrorComponent, MainComponent } from './layouts';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { NgxWebstorageModule } from 'ngx-webstorage';


@NgModule({
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-' }),
    ChatBotSharedModule.forRoot(),
    ChatBotHomeModule,
    ChatBotModelModule,
    ChatBotCoreModule,

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
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
