import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/models/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[] = [];
    selectedItem: number | null = null;

    private ingredientsChangedSub = new Subscription();
    private selectedItemSub = new Subscription();

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();
        this.ingredientsChangedSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
        })
        this.selectedItemSub = this.shoppingListService.selectedItem.subscribe(selectedItemIndex => {
            this.selectedItem = selectedItemIndex;
        })
    }

    ngOnDestroy() {
        this.ingredientsChangedSub.unsubscribe();
        this.selectedItemSub.unsubscribe();
    }

    onIngredientEdit(index: number) {
        this.shoppingListService.selectedItem.next(index);
    }
}
