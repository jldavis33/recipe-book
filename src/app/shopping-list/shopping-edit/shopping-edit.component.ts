import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    editMode = false;
    editItemIndex?: number;
    editedItem?: Ingredient

    @ViewChild('form') form?: NgForm;

    private sub?: Subscription;

    constructor(private shoppingListService: ShoppingListService) {
    }

    ngOnInit() {
        this.sub = this.shoppingListService.startedEditing
            .subscribe(index => {
                this.editMode = true;
                this.editItemIndex = index;

                if (this.editMode) {
                    this.editedItem = this.shoppingListService.getIngredient(index);

                    this.form?.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount
                    })
                }
            });
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);

        if (this.editMode) {
            this.shoppingListService.updateIngredient(this.editItemIndex as number, newIngredient)
        } else {
            this.shoppingListService.addIngredient(newIngredient)
        }
        this.editMode = false;
        this.onClear();
    }

    onClear() {
        this.form?.reset();
        this.editMode = false;
    }

    onDeleteItem() {
        this.shoppingListService.deleteIngredient(this.editItemIndex as number);
        this.onClear();
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}
