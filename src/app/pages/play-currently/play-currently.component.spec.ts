import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayCurrentlyComponent } from './play-currently.component';

describe('PlayCurrentlyComponent', () => {
  let component: PlayCurrentlyComponent;
  let fixture: ComponentFixture<PlayCurrentlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayCurrentlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayCurrentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
