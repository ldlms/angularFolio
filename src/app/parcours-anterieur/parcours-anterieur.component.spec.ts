import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcoursAnterieurComponent } from './parcours-anterieur.component';

describe('ParcoursAnterieurComponent', () => {
  let component: ParcoursAnterieurComponent;
  let fixture: ComponentFixture<ParcoursAnterieurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcoursAnterieurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParcoursAnterieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
