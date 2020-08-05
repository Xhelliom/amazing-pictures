import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserComponent } from './browser/browser.component';
import { ProfileComponent } from './profile/profile.component';
import { MultipleUploadComponent } from './multiple-upload/multiple-upload.component';

const routes: Routes = [
  { path: '', component: BrowserComponent },
  { path: 'picture/:pictureId', component: BrowserComponent },
  { path: 'profile/:profileId', component: ProfileComponent },
  { path: 'profile/:profileId/picture/:pictureId', component: ProfileComponent },
  { path: 'multiple-upload', component: MultipleUploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
