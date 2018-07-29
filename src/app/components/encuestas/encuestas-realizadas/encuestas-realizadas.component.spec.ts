import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestasRealizadasComponent } from './encuestas-realizadas.component';

describe('EncuestasRealizadasComponent', () => {
  let component: EncuestasRealizadasComponent;
  let fixture: ComponentFixture<EncuestasRealizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestasRealizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestasRealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
