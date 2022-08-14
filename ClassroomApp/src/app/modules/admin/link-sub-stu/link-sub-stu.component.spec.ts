import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSubStuComponent } from './link-sub-stu.component';

describe('LinkSubStuComponent', () => {
  let component: LinkSubStuComponent;
  let fixture: ComponentFixture<LinkSubStuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkSubStuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkSubStuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
