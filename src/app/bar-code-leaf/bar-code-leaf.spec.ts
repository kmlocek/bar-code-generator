import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCodeLeaf } from './bar-code-leaf';

describe('BarCodeLeaf', () => {
  let component: BarCodeLeaf;
  let fixture: ComponentFixture<BarCodeLeaf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarCodeLeaf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarCodeLeaf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
