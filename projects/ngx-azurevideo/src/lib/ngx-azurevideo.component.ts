import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

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
  videoPlayer: any;
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
  @Output() ended = new EventEmitter<any>();
  @Output() seeking = new EventEmitter<any>();
  @Output() playing = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();
  @Output() timeupdate = new EventEmitter<any>();
  @Output() pause = new EventEmitter<any>();
  @Output() play = new EventEmitter<any>();
  @Output() resume = new EventEmitter<any>();
  @Output() error = new EventEmitter<any>();
  parent: any;
  currentTime: any;

  constructor() { }

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

    this.videoPlayer.ngComponent = amp(this.videoPlayer?.nativeElement, config, function () {
      //this is the ready function and will only execute after the player is loaded
    });

    this.videoPlayer.ngComponent.parent = this;

    this.videoPlayer.ngComponent.src([
      {
        src: this.src,
        type: 'application/vnd.ms-sstr+xml',
      },
    ]);

    console.log(this.videoPlayer);

    this.videoPlayer?.ngComponent?.addEventListener(amp.eventName.ended, this.videoEnded);
    this.videoPlayer?.ngComponent?.addEventListener(amp.eventName.seeking, this.videoSeeking);
    this.videoPlayer?.ngComponent?.addEventListener(amp.eventName.playing, this.videoPlaying);
    this.videoPlayer?.ngComponent?.addEventListener(amp.eventName.resume, this.resumePlaying);
    this.videoPlayer?.ngComponent?.addEventListener(amp.eventName.complete, this.completePlaying);
    this.videoPlayer?.ngComponent?.addEventListener(amp.eventName.timeupdate, this.videoTimeUpdate);
    this.videoPlayer?.ngComponent?.addEventListener(amp.eventName.pause, this.pausePlaying);
    this.videoPlayer?.ngComponent?.addEventListener(amp.eventName.play, this.videoPlay);
    this.videoPlayer?.ngComponent?.addEventListener(amp.eventName.error, this.videoError);
  }

  videoEnded() {
    this.parent.ended.emit(null);
  }

  videoSeeking() {
    this.parent.seeking.emit(
      this.currentTime()
    );
  }

  videoPlaying() {
    this.parent.playing.emit(
      this.currentTime()
    );
  }

  resumePlaying() {
    this.parent.resume.emit(
      this.currentTime()
    );
  }

  completePlaying() {
    this.parent.resume.emit(
      this.currentTime()
    );
  }

  videoTimeUpdate() {
    this.parent.timeupdate.emit(
      this.currentTime()
    );
  }

  pausePlaying() {
    this.parent.pause.emit(
      this.currentTime()
    );
  }

  videoPlay() {
    this.parent.play.emit(
      this.currentTime()
    );
  }
  videoError() {
    this.parent.error.emit(this.error);
  }
}
