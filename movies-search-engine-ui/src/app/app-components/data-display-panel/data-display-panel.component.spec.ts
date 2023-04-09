import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDisplayPanelComponent } from './data-display-panel.component';

describe('DataDisplayPanelComponent', () => {
  let component: DataDisplayPanelComponent;
  let fixture: ComponentFixture<DataDisplayPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDisplayPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDisplayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
