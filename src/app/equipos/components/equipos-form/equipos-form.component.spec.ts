import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposFormComponent } from './equipos-form.component';

describe('EquiposFormComponent', () => {
  let component: EquiposFormComponent;
  let fixture: ComponentFixture<EquiposFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquiposFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquiposFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
