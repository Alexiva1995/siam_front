import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FreeBusPage } from './free-bus.page';

describe('FreeBusPage', () => {
  let component: FreeBusPage;
  let fixture: ComponentFixture<FreeBusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeBusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FreeBusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
