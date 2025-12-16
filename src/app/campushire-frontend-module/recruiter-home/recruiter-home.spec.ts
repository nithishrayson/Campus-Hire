import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterHome } from './recruiter-home';

describe('RecruiterHome', () => {
  let component: RecruiterHome;
  let fixture: ComponentFixture<RecruiterHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
