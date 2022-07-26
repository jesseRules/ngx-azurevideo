import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { EventEmitter } from 'stream';

declare var amp: any; // todo: use the amp d.ts

@Component({
  selector: 'ngx-azurevideo',
  template: `
    <video
      #video
      class="azuremediaplayer amp-default-skin amp-flush-skin amp-big-play-centered"
      controls
    >
      <p class="amp-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that supports HTML5 video.
      </p>
    </video>
  `,
  styles: [],
})
export class NgxAzurevideoComponent implements OnInit {
  @ViewChild('video')
  videoPlayer!: any;
  @Input() src: string = '';
  @Input() controls: boolean = true;
  @Input() autoplay: boolean = true;
  @Input() poster: string = '';
  @Input() width: number = 500;
  @Input() height: number = 500;
  @Input() fluid: boolean = true;
  @Input() skin: string = 'amp-flush';
  // amp-default is other
  @Input() playbackSpeedEnabled: boolean = true;
  @Output() ended = new EventEmitter();
  @Output() seeking = new EventEmitter();
  @Output() playing = new EventEmitter();
  @Output() complete = new EventEmitter();
  @Output() timeupdate = new EventEmitter();
  @Output() pause = new EventEmitter();
  @Output() play = new EventEmitter();
  @Output() resume = new EventEmitter();
  @Output() error = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (document.querySelector('#ngx-azurevideo')) {
      return;
    }
    const scriptTag = document.createElement('script');
    scriptTag.id = 'ngx-azurevideo';
    scriptTag.src = '//amp.azure.net/libs/amp/latest/azuremediaplayer.min.js';
    scriptTag.onload = () => this.onLoadInit();
    const linkTag = document.createElement('link');
    linkTag.rel = 'stylesheet';
    if (this.skin == 'amp-flush') {
      linkTag.href =
        '//amp.azure.net/libs/amp/latest/skins/amp-flush/azuremediaplayer.min.css';
    } else {
      linkTag.href =
        '//amp.azure.net/libs/amp/latest/skins/amp-default/azuremediaplayer.min.css';
    }

    document.body.appendChild(scriptTag);
    document.head.insertBefore(linkTag, document.head.firstChild);
  }

  eventHandler(event: any) {
    console.log(event);
  }

  private onLoadInit(): void {
    const config = {
      controls: this.controls !== false,
      autoplay: this.autoplay,
      poster: this.poster,
      width: this.width,
      height: this.height,
      fluid: this.fluid,
      logo: { enabled: false },
      playbackSpeed: {
        enabled: this.playbackSpeedEnabled,
        initialSpeed: 1.0,
        speedLevels: [
          { name: 'x4.0', value: 4.0 },
          { name: 'x3.0', value: 3.0 },
          { name: 'x2.0', value: 2.0 },
          { name: 'x1.75', value: 1.75 },
          { name: 'x1.5', value: 1.5 },
          { name: 'x1.25', value: 1.25 },
          { name: 'normal', value: 1.0 },
          { name: 'x0.75', value: 0.75 },
          { name: 'x0.5', value: 0.5 },
        ],
      },
    };
    const component = amp(this.videoPlayer.nativeElement, config);
    component.src([
      {
        src: this.src,
        type: 'application/vnd.ms-sstr+xml',
      },
    ]);
    this.videoPlayer.ngComponent = component;
    this.videoPlayer.addEventListener('ended', this.videoEnded);
    this.videoPlayer.addEventListener('seeking', this.videoSeeking);
    this.videoPlayer.addEventListener('playing', this.videoPlaying);
    this.videoPlayer.addEventListener('resume', this.resumePlaying);
    this.videoPlayer.addEventListener('complete', this.completePlaying);
    this.videoPlayer.addEventListener('timeupdate', this.videoTimeUpdate);
    this.videoPlayer.addEventListener('pause', this.pausePlaying);
    this.videoPlayer.addEventListener('play', this.videoPlay);
    this.videoPlayer.addEventListener('error', this.videoError);
  }

  videoEnded() {
    this.videoPlayer.ngComponent.ended.emit(null);
  }

  videoSeeking() {
    this.videoPlayer.ngComponent.seeking.emit(
      this.videoPlayer.ngComponent.currentTime()
    );
  }

  videoPlaying() {
    this.videoPlayer.ngComponent.playing.emit(
      this.videoPlayer.ngComponent.currentTime()
    );
  }

  resumePlaying() {
    this.videoPlayer.ngComponent.resume.emit(
      this.videoPlayer.ngComponent.currentTime()
    );
  }

  completePlaying() {
    this.videoPlayer.ngComponent.resume.emit(
      this.videoPlayer.ngComponent.currentTime()
    );
  }

  videoTimeUpdate() {
    this.videoPlayer.ngComponent.timeupdate.emit(
      this.videoPlayer.ngComponent.currentTime()
    );
  }

  pausePlaying() {
    this.videoPlayer.ngComponent.pause.emit(
      this.videoPlayer.ngComponent.currentTime()
    );
  }

  videoPlay() {
    this.videoPlayer.ngComponent.play.emit(
      this.videoPlayer.ngComponent.currentTime()
    );
  }
  videoError() {
    this.videoPlayer.ngComponent.play.emit(this.videoPlayer.ngComponent.error);
  }
}
