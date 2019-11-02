import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { TweetCardComponent } from './components/tweet-card/tweet-card.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent, ProfileComponent, ProfileCardComponent, TweetCardComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [FormsModule, ReactiveFormsModule, MaterialModule]
})
export class CoreModule {}
