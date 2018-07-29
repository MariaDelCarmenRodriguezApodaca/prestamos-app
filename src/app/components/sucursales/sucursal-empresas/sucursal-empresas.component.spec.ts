import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalEmpresasComponent } from './sucursal-empresas.component';

describe('SucursalEmpresasComponent', () => {
  let component: SucursalEmpresasComponent;
  let fixture: ComponentFixture<SucursalEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
