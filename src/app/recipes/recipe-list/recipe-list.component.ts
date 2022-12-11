import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Tom kha', 'a tasty soup', 'https://somuchfoodblog.com/wp-content/uploads/2020/10/tom-kha-gai-2-scaled.jpg')
  ];

}
