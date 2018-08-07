import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaZonasComponent } from './lista-zonas.component';

describe('ListaZonasComponent', () => {
  let component: ListaZonasComponent;
  let fixture: ComponentFixture<ListaZonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaZonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
