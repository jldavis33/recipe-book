import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
    recipe!: Recipe;
    id!: number;

    constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.id = +this.route.snapshot.params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);

        this.route.params.subscribe(params => {
            this.id = +params['id']
            this.recipe = this.recipeService.getRecipe(this.id);
        })
    }

    onAddToShoppingList() {
        if (this.recipe?.ingredients.length) {
            this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
        }
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['../'], {relativeTo: this.route})
    }
}
