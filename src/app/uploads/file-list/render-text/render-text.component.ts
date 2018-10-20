import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-render-text',
  templateUrl: './render-text.component.html',
  styleUrls: ['./render-text.component.css']
})
export class RenderTextComponent implements OnInit {
  @Input() url: string;
  text;
  constructor(private as: AuthService) { }

  ngOnInit() {
    this.text = this.as.getTextFromFile(this.url)
  }
}
