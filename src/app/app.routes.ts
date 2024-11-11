import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'user-profile',children:[
        {path:'',title:'User Profile', component:UserProfileComponent },
        {path:'update-user/:id', title: 'Edit User Information',component:UpdateUserComponent}]},
    {path:'game-details', title: 'Game Details', component:GameDetailsComponent},
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'**', component:NotFoundComponent}
];
