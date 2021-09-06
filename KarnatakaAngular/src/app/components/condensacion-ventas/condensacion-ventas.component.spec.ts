import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondensacionVentasComponent } from './condensacion-ventas.component';

describe('CondensacionVentasComponent', () => {
  let component: CondensacionVentasComponent;
  let fixture: ComponentFixture<CondensacionVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondensacionVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CondensacionVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
