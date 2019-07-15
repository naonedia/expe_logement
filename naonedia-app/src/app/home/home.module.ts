import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatBotSharedModule } from '../shared';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { EmbedVideo } from 'ngx-embed-video';

@NgModule({
    imports: [ChatBotSharedModule, RouterModule.forChild([HOME_ROUTE]), EmbedVideo.forRoot()],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatBotHomeModule {}
