import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MrMr2Module } from 'mr-mr2';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HtmlPipe } from 'src/app/pipes/html.pipe';
import { YearFormatPipe } from 'src/app/pipes/year-format.pipe';

@NgModule({
  declarations: [
    HtmlPipe,
    YearFormatPipe
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
    YearFormatPipe
  ],
  providers: [DatePipe]
})

export class ShareModule { }
