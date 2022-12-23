import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
    @ViewChild('ingredientName') ingredientName?: ElementRef;
    @ViewChild('ingredientAmount') ingredientAmount?: ElementRef;

    @Output() ingredientAdded = new EventEmitter<Ingredient>;

    addShoppingListItem() {
        let name = this.ingredientName?.nativeElement.value;
        let amount = this.ingredientAmount?.nativeElement.value;

        if (name && amount) {
            this.ingredientAdded.emit(new Ingredient(
                name,
                parseInt(amount)
            ));
        }

        console.log(name);
        console.log(amount);
    }
}
