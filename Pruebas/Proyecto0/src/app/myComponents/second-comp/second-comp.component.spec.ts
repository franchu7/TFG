import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPipePipe } from 'src/app/myPipes/my-pipe.pipe';

import { SecondCompComponent } from './second-comp.component';

describe('SecondCompComponent', () => {
  let component: SecondCompComponent;
  let fixture: ComponentFixture<SecondCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondCompComponent, MyPipePipe],
      imports: [HttpClientModule],
      providers: [HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
