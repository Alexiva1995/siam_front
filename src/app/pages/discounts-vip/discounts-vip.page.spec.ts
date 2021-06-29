import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiscountsVipPage } from './discounts-vip.page';

describe('DiscountsVipPage', () => {
  let component: DiscountsVipPage;
  let fixture: ComponentFixture<DiscountsVipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountsVipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountsVipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
