import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MrMr2Module } from 'mr-mr2';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HtmlPipe } from 'src/app/pipes/html.pipe';
import { YearFormatPipe } from 'src/app/pipes/year-format.pipe';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';

@NgModule({
  declarations: [
    HtmlPipe,
    YearFormatPipe,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    MrMr2Module,
    HttpClientModule,
    FormsModule
  ],
  exports : [
    CommonModule,
    MrMr2Module,
    HttpClientModule,
    FormsModule,
    HtmlPipe,
    YearFormatPipe,
    LanguageSelectorComponent
  ]
})

export class ShareModule { }
