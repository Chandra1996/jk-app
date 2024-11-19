import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QaInterfaceComponent } from './qa-interface.component';

describe('QaInterfaceComponent', () => {
  let component: QaInterfaceComponent;
  let fixture: ComponentFixture<QaInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QaInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QaInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
