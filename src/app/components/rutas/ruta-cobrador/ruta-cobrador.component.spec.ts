import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaCobradorComponent } from './ruta-cobrador.component';

describe('RutaCobradorComponent', () => {
  let component: RutaCobradorComponent;
  let fixture: ComponentFixture<RutaCobradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaCobradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaCobradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
