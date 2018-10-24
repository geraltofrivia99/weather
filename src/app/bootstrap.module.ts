import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModal
  ],
  declarations: [],
  exports: [NgbModal]
})
export class BootstrapModule { }
