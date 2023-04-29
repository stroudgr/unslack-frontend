import { NgModule } from '@angular/core';

// Import routes modules to do routing on this domain
import { RouterModule, Routes } from '@angular/router';

// Import components to reference in the view
import { SlackerComponent } from './slacker/slacker.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SlackerDetailComponent } from './slacker-detail/slacker-detail.component';
import { ChartsComponent } from './charts/charts.component';
import { RoomComponent } from './room/room.component';
import { TimetrackerComponent } from './timetracker/timetracker.component';

// This maps the link path to the UI components
const routes: Routes = [
  { path: 'slacker', component: SlackerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'charts', component: ChartsComponent },
  { path: 'room', component: RoomComponent },
  { path: 'timetracker', component: TimetrackerComponent },
  { path: 'detail/:id', component: SlackerDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
