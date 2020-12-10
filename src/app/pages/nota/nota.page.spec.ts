import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotaPage } from './nota.page';

describe('NotaPage', () => {
  let component: NotaPage;
  let fixture: ComponentFixture<NotaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
