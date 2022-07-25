import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAzurevideoComponent } from './ngx-azurevideo.component';

describe('NgxAzurevideoComponent', () => {
  let component: NgxAzurevideoComponent;
  let fixture: ComponentFixture<NgxAzurevideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxAzurevideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAzurevideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
