import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { PlayLaterComponent } from './pages/play-later/play-later.component';
import { PlayCurrentlyComponent } from './pages/play-currently/play-currently.component';
import { PlayedComponent } from './pages/played/played.component';
import { CompletedComponent } from './pages/completed/completed.component';

export const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'user-profile/:id',children:[
        {path:'',title:'User Profile', component:UserProfileComponent },
        {path:'update-user', title: 'Edit User Information',component:UpdateUserComponent},
    ]},
    {path:'my-lists/play-later', title: 'Play Later', component:PlayLaterComponent},
    {path:'my-lists/play-currently', title: 'Play Currently', component:PlayCurrentlyComponent},
    {path:'my-lists/played', title: 'Played', component:PlayedComponent},
    {path:'my-lists/completed', title: 'Completed', component:CompletedComponent},
    {path:'game-details/:id', title: 'Game Details', component:GameDetailsComponent},
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'**', component:NotFoundComponent}
];
