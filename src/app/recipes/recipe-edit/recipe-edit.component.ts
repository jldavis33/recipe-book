import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/models/ingredients.model';
import { Recipe } from '../recipe.model';
import { CustomValidators } from '../../shared/custom.validators';

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

    constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.editMode = !!this.id;
            this.initForm();
        })
    }

    onSubmit() {
        if (this.editMode) {
            // update
            this.recipeService.updateRecipe(this.form.value as Recipe, +this.id!)
        } else {
            // add
            this.recipeService.addRecipe(this.form.value as Recipe);
        }
        this.closeForm();
    }

    onAddIngredient() {
        this.formIngredients.push( this.buildIngredientControls() );
    }

    onDeleteIngredient(index: number) {
        this.formIngredients.removeAt(index);
    }

    closeForm() {
        this.router.navigate(['..'], {relativeTo: this.route});
    }

    showControlError(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && control?.touched;
    }

    private initForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients: Ingredient[] = [];

        if (this.id)  {
            const recipe = this.recipeService.getRecipe(+this.id) as Recipe;
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            recipeIngredients = [...recipe.ingredients]
        }

        this.form = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': new FormArray(recipeIngredients.map( (ingredient ) => {
                return this.buildIngredientControls(ingredient)
            }))
        })
    }

    private buildIngredientControls(ingredient?: Ingredient) {
        return new FormGroup({
            'name': new FormControl(ingredient?.name || '', Validators.required ),
            'amount': new FormControl(ingredient?.amount || '', [Validators.required, CustomValidators.positiveNumberPattern])
        })
    }
}
