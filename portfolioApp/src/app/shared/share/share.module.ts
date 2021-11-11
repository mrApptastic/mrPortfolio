import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MrMr2Module } from 'mr-mr2';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HtmlPipe } from 'src/app/pipes/html.pipe';

@NgModule({
  declarations: [
    HtmlPipe
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
    HtmlPipe
  ]
})

export class ShareModule { }
