import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarPrestamosComponent } from './aprobar-prestamos.component';

describe('AprobarPrestamosComponent', () => {
  let component: AprobarPrestamosComponent;
  let fixture: ComponentFixture<AprobarPrestamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarPrestamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
