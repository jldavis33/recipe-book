import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Tom kha', 'a tasty soup', 'https://somuchfoodblog.com/wp-content/uploads/2020/10/tom-kha-gai-2-scaled.jpg'),
        new Recipe('Pad Thai', 'a peanut noodle dish', 'https://www.grocery.coop/sites/default/files/Tofu_Pad_Thai.jpg')
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}
