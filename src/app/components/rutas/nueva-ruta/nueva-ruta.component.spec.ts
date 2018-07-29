import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaRutaComponent } from './nueva-ruta.component';

describe('NuevaRutaComponent', () => {
  let component: NuevaRutaComponent;
  let fixture: ComponentFixture<NuevaRutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaRutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
