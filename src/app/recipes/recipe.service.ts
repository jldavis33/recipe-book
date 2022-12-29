import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/models/ingredients.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Tom kha', 'a tasty soup', 'https://somuchfoodblog.com/wp-content/uploads/2020/10/tom-kha-gai-2-scaled.jpg', [
            new Ingredient('Coconut milk', 1),
            new Ingredient('Chicken breast', 1),
            new Ingredient('Chicken broth', 1),
            new Ingredient('Ginger root', 1),
            new Ingredient('Lemon grass', 1),
        ]),
        new Recipe('Pad Thai', 'a peanut noodle dish', 'https://www.grocery.coop/sites/default/files/Tofu_Pad_Thai.jpg', [
            new Ingredient('Rice noodle', 1),
            new Ingredient('Chicken breast', 1),
            new Ingredient('Pad thai sauce', 1),
            new Ingredient('Peanuts', 10),
            new Ingredient('Eggs', 2),
            new Ingredient('Tofu', 1),
        ])
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}
