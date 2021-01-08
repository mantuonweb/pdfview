import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfwithpageComponent } from './pdfwithpage.component';

describe('PdfwithpageComponent', () => {
  let component: PdfwithpageComponent;
  let fixture: ComponentFixture<PdfwithpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfwithpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfwithpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
