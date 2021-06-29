import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiscountDetailPage } from './discount-detail.page';

describe('DiscountDetailPage', () => {
  let component: DiscountDetailPage;
  let fixture: ComponentFixture<DiscountDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
