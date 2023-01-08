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

    addShoppingListItem(name: string, amount: number) {
        if (name && amount) {
            this.shoppingListService.addIngredient(new Ingredient(
                name,
                amount
            ));
        }
    }

    onAddItem(form: NgForm) {
        this.addShoppingListItem(
            form.value.name,
            form.value.amount
        );
    }
}
