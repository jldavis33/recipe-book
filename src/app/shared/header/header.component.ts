import { Component } from '@angular/core';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(private dataStorage: DataStorageService) { }

    onSaveData() {
        this.dataStorage.storeRecipes()
    }

    onFetchData() {
        this.dataStorage.fetchRecipes();
    }
}
