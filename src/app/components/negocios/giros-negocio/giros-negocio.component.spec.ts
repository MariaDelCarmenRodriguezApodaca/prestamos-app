import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GirosNegocioComponent } from './giros-negocio.component';

describe('GirosNegocioComponent', () => {
  let component: GirosNegocioComponent;
  let fixture: ComponentFixture<GirosNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GirosNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GirosNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
