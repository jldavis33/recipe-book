import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    startedEditing = new Subject<number>();

    // // Dummy data
    // private recipes: Recipe[] = [
    //     new Recipe('Tom kha', 'a tasty soup', 'https://somuchfoodblog.com/wp-content/uploads/2020/10/tom-kha-gai-2-scaled.jpg', [
    //         new Ingredient('Coconut milk', 1),
    //         new Ingredient('Chicken breast', 1),
    //         new Ingredient('Chicken broth', 1),
    //         new Ingredient('Ginger root', 1),
    //         new Ingredient('Lemon grass', 1),
    //     ]),
    //     new Recipe('Pad Thai', 'a peanut noodle dish', 'https://www.grocery.coop/sites/default/files/Tofu_Pad_Thai.jpg', [
    //         new Ingredient('Rice noodle', 1),
    //         new Ingredient('Chicken breast', 1),
    //         new Ingredient('Pad thai sauce', 1),
    //         new Ingredient('Peanuts', 10),
    //         new Ingredient('Eggs', 2),
    //         new Ingredient('Tofu', 1),
    //     ])
    // ];
    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(recipe: Recipe, index: number) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
