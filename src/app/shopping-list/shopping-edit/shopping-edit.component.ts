import { Component } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
    constructor(private shoppingListService: ShoppingListService) { }

    onAddItem(form: NgForm) {
        const { name, amount } = form.value;

        if (name && +amount) {
            this.shoppingListService.addIngredient(
                new Ingredient(name, +amount)
            )
        }
    }
}
