import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCreditosComponent } from './tipo-creditos.component';

describe('TipoCreditosComponent', () => {
  let component: TipoCreditosComponent;
  let fixture: ComponentFixture<TipoCreditosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCreditosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
