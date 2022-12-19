import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  loadedRecipe: Recipe | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private recipesService: RecipesService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('recipeId')) {
        this.router.navigate(["/recipes"]);
        return;
      }

      const recipeId = paramMap.get('recipeId') || '';
      this.loadedRecipe = this.recipesService.getRecipe(recipeId) || undefined;

      if(!this.loadedRecipe?.id) {
        this.router.navigate(["/recipes"]);
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete the recipe?',
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Delete",
          handler: () => {
            this.recipesService.deleteRecipe(this.loadedRecipe?.id || "");
            this.router.navigate(['/recipes']);
          }
        }
      ],
    });

    await alert.present();
  }

  onDeleteRecipe() {
    this.presentAlert();
  }

}
