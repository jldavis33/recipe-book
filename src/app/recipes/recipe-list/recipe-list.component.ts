import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipes: Recipe[] = [];

    private sub?: Subscription;

    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.recipes = this.recipeService.getRecipes();

        this.sub = this.recipeService.recipesChanged.subscribe(recipes => {
            this.recipes = recipes;
        })
    }

    onNewRecipe() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    ngOnDestroy() {
        this.sub?.unsubscribe()
    }
}
