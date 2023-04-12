import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposPorFechaComponent } from './equipos-por-fecha.component';

describe('EquiposPorFechaComponent', () => {
  let component: EquiposPorFechaComponent;
  let fixture: ComponentFixture<EquiposPorFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquiposPorFechaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquiposPorFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
