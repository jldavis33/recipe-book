import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, AfterViewInit, OnDestroy {
    isEditMode = false;
    canClear = false;
    @ViewChild('form') form?: NgForm;
    private selectedItem: number|null  = null;

    private selectedItemSub = new Subscription();

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.selectedItemSub = this.shoppingListService.selectedItem
            .subscribe(selectedItemIndex => {
                this.selectedItem = selectedItemIndex;
                this.isEditMode = typeof selectedItemIndex === 'number';
                if (this.isEditMode) {
                    const { name, amount } = this.shoppingListService.getIngredients()[selectedItemIndex as number];

                    this.form?.setValue({
                        name: name,
                        amount: amount
                    })
                }
            })

    }

    ngAfterViewInit() {
        this.form?.valueChanges?.subscribe(form => {
            console.log(form);
            this.canClear = Object.values(form)
                .some(item => !!item);
        });
    }

    ngOnDestroy() {
        this.selectedItemSub.unsubscribe();
    }

    onAddItem(form: NgForm) {
        const { name, amount } = form.value;

        this.shoppingListService.addIngredient(
            new Ingredient(name, +amount)
        )
    }

    onClearForm() {
        this.form?.reset();
    }

    onCancelEdit() {
        this.shoppingListService.selectedItem.next(null);
        this.onClearForm();
    }

}
