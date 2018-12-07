import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ImageFileComponent } from './image-file/image-file.component';
import { FileModalComponent } from './file-modal/file-modal.component';
import { ChatRoutingModule } from './chat-routing.module';
import { MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChatComponent,
    ImageFileComponent,
    FileModalComponent,
  ],
  exports: [

  ]
})
export class ChatModule { }
