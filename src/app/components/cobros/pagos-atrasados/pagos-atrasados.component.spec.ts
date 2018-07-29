import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosAtrasadosComponent } from './pagos-atrasados.component';

describe('PagosAtrasadosComponent', () => {
  let component: PagosAtrasadosComponent;
  let fixture: ComponentFixture<PagosAtrasadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosAtrasadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosAtrasadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
