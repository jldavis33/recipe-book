import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/models/ingredients.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
    id?: string;
    editMode: boolean = false;
    form!: FormGroup;

    get formIngredients() {
        return (this.form.get('ingredients') as FormArray);
    }

    constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.editMode = !!this.id;
            this.initForm();
        })
    }

    onAddIngredient() {
        this.formIngredients.push( this.buildIngredientControls() );
    }

    onDeleteIngredient(index: number) {
        this.formIngredients.removeAt(index);
    }

    private initForm() {
        let recipeName = '';
        let recipeUrl = '';
        let recipeDescription = '';
        let recipeIngredients: Ingredient[] = [];

        if (this.id)  {
            const recipe = this.recipeService.getRecipeById(+this.id) as Recipe;
            recipeName = recipe.name;
            recipeUrl = recipe.imagePath;
            recipeDescription = recipe.description;
            recipeIngredients = [...recipe.ingredients]
        }

        this.form = new FormGroup({
            'name': new FormControl(recipeName),
            'url': new FormControl(recipeUrl),
            'description': new FormControl(recipeDescription),
            'ingredients': new FormArray(recipeIngredients.map( (ingredient ) => {
                return this.buildIngredientControls(ingredient)
            }))
        })
    }

    private buildIngredientControls(ingredient?: Ingredient) {
        return new FormGroup({
            'name': new FormControl(ingredient?.name || ''),
            'amount': new FormControl(ingredient?.amount || '')
        })
    }
}
