import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
    recipe?: Recipe;

    constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];
        this.recipe = this.recipeService.getRecipe(id);

        this.route.params.subscribe(params => {
            this.recipe = this.recipeService.getRecipe(+params['id']);
        })
    }

    onAddToShoppingList() {
        if (this.recipe?.ingredients.length) {
            this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
        }
    }
}
