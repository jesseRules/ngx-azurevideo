# NgxAzurevideo

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## Overview
This project uses [Azure Media Player (AMP)](http://amp.azure.net/libs/amp/latest/docs/index.html)

To use this component, you must first [upload a video to media services, create a job, encode it, and get a streaming endpoint](https://docs.microsoft.com/en-us/azure/media-services/latest/manage-assets-quickstart).

MSFT has a cool demo of the AMP player here [AmpDEMO](https://ampdemo.azureedge.net/azuremediaplayer.html)

[AMP License](https://amp.azure.net/libs/amp/latest/docs/license.html)

## Usage

### Step 1: Install the `ngx-azurevideo` package

```bash
npm install --save ngx-azurevideo
```

### Step 2: Import NgxAzurevideoModule

```ts
import { NgxAzurevideoModule } from 'ngx-azurevideo';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAzurevideoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 3: Use the module

```html
<ngx-azurevideo 
src="//amssamples.streaming.mediaservices.windows.net/3b970ae0-39d5-44bd-b3a3-3136143d6435/AzureMediaServicesPromo.ism/manifest"
[controls]="true"
[autoplay]="true"
[fluid]="false"
(complete)="complete($event)"
(play)="play($event)"
(pause)="pause($event)">
</ngx-azurevideo>
```

## Input and Output

```ts
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
```

## Code scaffolding

Run `ng generate component component-name --project ngx-azurevideo` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-azurevideo`.
> Note: Don't forget to add `--project ngx-azurevideo` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ngx-azurevideo` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-azurevideo`, go to the dist folder `cd dist/ngx-azurevideo` and run `npm publish`.

## Running unit tests

Run `ng test ngx-azurevideo` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
