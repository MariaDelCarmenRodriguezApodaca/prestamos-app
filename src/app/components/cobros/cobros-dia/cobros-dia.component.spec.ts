import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrosDiaComponent } from './cobros-dia.component';

describe('CobrosDiaComponent', () => {
  let component: CobrosDiaComponent;
  let fixture: ComponentFixture<CobrosDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobrosDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobrosDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
