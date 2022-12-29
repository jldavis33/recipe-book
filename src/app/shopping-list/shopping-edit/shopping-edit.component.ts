import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
    @ViewChild('ingredientName') ingredientName?: ElementRef;
    @ViewChild('ingredientAmount') ingredientAmount?: ElementRef;

    constructor(private shoppingListService: ShoppingListService) { }

    addShoppingListItem() {
        let name = this.ingredientName?.nativeElement.value;
        let amount = this.ingredientAmount?.nativeElement.value;

        if (name && amount) {
            this.shoppingListService.addIngredient(new Ingredient(
                name,
                parseInt(amount)
            ));
        }
    }
}
