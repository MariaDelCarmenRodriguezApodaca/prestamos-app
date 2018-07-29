import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoNegocioComponent } from './nuevo-negocio.component';

describe('NuevoNegocioComponent', () => {
  let component: NuevoNegocioComponent;
  let fixture: ComponentFixture<NuevoNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
