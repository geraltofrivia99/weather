import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  @Input() url: string;
  @Input() type: string;
  @Input() name: string;

  player;
  length;
  currentTime;
  isPlaying: boolean = false;
  constructor() { }

  ngOnInit() {
    this.player = document.getElementById('player');
    // this.length = player.duration
    this.player.onloadedmetadata = () => {
    this.length = this.player.duration
  };
    this.currentTime = this.player.currentTime;
  }
  initProgressBar() {
    if (this.currentTime === this.length) {
      this.player.pause();
      this.currentTime = 0;
      this.player.currentTime = 0;
    }
  }
  onPlay() {
    if (this.isPlaying) {
      this.player.pause();
      this.isPlaying = false;
    }
    else {
      this.player.play();
      this.isPlaying = true;
    }
  }
  
}
