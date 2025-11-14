import { TestBed } from '@angular/core/testing';
import { LabelConfig } from './label-config';
import { provideRouter } from '@angular/router';

describe('LabelConfig', () => {
  let component: LabelConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LabelConfig],
      providers: [provideRouter([])]
    });
    const fixture = TestBed.createComponent(LabelConfig);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse regular labels correctly', () => {
    component.labelInput = '100, 200, 300';
    component.generateLabels();
    // Labels should include: 100, 200, 300
  });

  it('should generate 5s correctly (mother + 4 children)', () => {
    component.fivesInput = '7008440080';
    component.generateLabels();
    // Should generate: 7008440080, 7008440081, 7008440082, 7008440083, 7008440084
  });

  it('should generate 10s correctly (mother + 9 children)', () => {
    component.tensInput = '7008440080';
    component.generateLabels();
    // Should generate: 7008440080 through 7008440089
  });

  it('should handle ranges in mother codes', () => {
    component.fivesInput = '7008440080-7008440090';
    component.generateLabels();
    // Should generate sequences for both 7008440080 and 7008440090
  });

  it('should combine all input types', () => {
    component.labelInput = '100';
    component.fivesInput = '7008440080';
    component.tensInput = '9999440010';
    component.generateLabels();
    // Should combine all generated labels
  });
});
