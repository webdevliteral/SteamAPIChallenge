import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamsearchComponent } from './steamsearch.component';

describe('SteamsearchComponent', () => {
  let component: SteamsearchComponent;
  let fixture: ComponentFixture<SteamsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteamsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
