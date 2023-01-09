import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
    id?: number;
    editMode: boolean = false;
    form!: FormGroup;

    get controls() {
        return (this.form.get('ingredients') as FormArray).controls;
    }

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.editMode = !!this.id;
        })

        this.form = new FormGroup({
            'name': new FormControl(null),
            'url': new FormControl(null),
            'description': new FormControl(null),
            'ingredients': new FormArray([

            ])
        })
    }

    onAddIngredient() {
        const formGroup = new FormGroup({
            'name': new FormControl(null),
            'amount': new FormControl(null)
        });
        (this.form.get('ingredients') as FormArray).push(formGroup)
    }

    onDeleteIngredient(index: number) {
        (this.form.get('ingredients') as FormArray).removeAt(index);
    }
}
