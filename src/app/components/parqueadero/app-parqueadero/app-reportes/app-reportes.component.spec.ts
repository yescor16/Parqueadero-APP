/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppReportesComponent } from './app-reportes.component';

describe('AppReportesComponent', () => {
  let component: AppReportesComponent;
  let fixture: ComponentFixture<AppReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
