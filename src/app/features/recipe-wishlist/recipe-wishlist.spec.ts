import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeWishlist } from './recipe-wishlist';

describe('RecipeWishlist', () => {
  let component: RecipeWishlist;
  let fixture: ComponentFixture<RecipeWishlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeWishlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeWishlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
