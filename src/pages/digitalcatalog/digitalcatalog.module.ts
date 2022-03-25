import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DigitalcatalogPage } from './digitalcatalog';
import { createTranslateLoader } from '../gift-gallery/gift-detail/gift-detail.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    DigitalcatalogPage,
  ],
  imports: [
    IonicPageModule.forChild(DigitalcatalogPage),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory:createTranslateLoader,
        deps:[HttpClient]
      }
    })
  ],
})
export class DigitalcatalogPageModule {}
