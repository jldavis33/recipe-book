import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private url = 'https://ng-course-recipe-book-8ca3a-default-rtdb.firebaseio.com/recipes.json'

    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    /**
     * Save current recipes to storage, overwriting existing.
     */
    storeRecipes() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        // 'put' will overwrite all recipes where post will simply add
        this.http.put(this.url, recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        this.http.get<Recipe[]>(this.url)
            .pipe(
                map(recipes => {
                    // make sure each recipe has an ingredients array
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        }
                    })
                })
            )
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes)
            })
    }
}
