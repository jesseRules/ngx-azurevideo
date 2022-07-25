import { Component, OnInit, ViewChild, Input } from '@angular/core';

declare var amp: any; // todo: use the amp d.ts

@Component({
  selector: 'ngx-azurevideo',
  template: `
    <video #video class="azuremediaplayer amp-flush-skin amp-big-play-centered" controls>
      <p class="amp-no-js">
          To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video.
      </p>
    </video>
  `,
  styles: [
  ]
})
export class NgxAzurevideoComponent implements OnInit {
  @ViewChild('video')
  videoPlayer!: { nativeElement: any; ngComponent: any; };
  @Input() src: string = '';
  @Input() controls: boolean = true;
  @Input() autoplay: boolean = true;
  @Input() poster: string = '';
  @Input() width: number = 500;
  @Input() height: number = 500;
  @Input() fluid: boolean = true;

  constructor() { }

  ngOnInit(): void {
    if (document.querySelector('#ngx-azurevideo')) { return; }
    const scriptTag = document.createElement('script');
    scriptTag.id = 'ngx-azurevideo';
    scriptTag.src = '//amp.azure.net/libs/amp/2.3.10/azuremediaplayer.min.js';
    scriptTag.onload = () => this.onLoadInit();
    const linkTag = document.createElement('link');
    linkTag.rel = 'stylesheet';
    linkTag.href = '//amp.azure.net/libs/amp/2.3.10/skins/amp-flush/azuremediaplayer.min.css';
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
    };
    const component = amp(this.videoPlayer.nativeElement, config);
    component.src([{
      src: this.src,
      type: 'application/vnd.ms-sstr+xml'
    }]);
    this.videoPlayer.ngComponent = component;
  }
}
