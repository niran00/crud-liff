import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrytypeComponent } from './entrytype.component';

describe('EntrytypeComponent', () => {
  let component: EntrytypeComponent;
  let fixture: ComponentFixture<EntrytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrytypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
