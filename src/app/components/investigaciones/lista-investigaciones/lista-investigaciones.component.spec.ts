import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInvestigacionesComponent } from './lista-investigaciones.component';

describe('ListaInvestigacionesComponent', () => {
  let component: ListaInvestigacionesComponent;
  let fixture: ComponentFixture<ListaInvestigacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaInvestigacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInvestigacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
