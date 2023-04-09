import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavToolbarComponent } from './nav-toolbar/nav-toolbar.component';
import { DataDisplayPanelComponent } from './data-display-panel/data-display-panel.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import {MatListModule} from '@angular/material/list';
import { SliderComponent } from './slider/slider.component';
import {MatSliderModule} from '@angular/material/slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxsModule } from '@ngxs/store';
import { FilterSelectionState } from './app-state/filter-selection-state/filter-selection-state';
import { MovieState } from './app-state/movie-state/movie-state';
import { StarButtonComponent } from './star-button/star-button.component';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavToolbarComponent,
    DataDisplayPanelComponent,
    FilterPanelComponent,
    StarRatingComponent,
    CheckBoxComponent,
    SliderComponent,
    StarButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatListModule,
    MatSliderModule,
    NgxSliderModule,
    MatDividerModule,
    NgxsModule.forRoot([FilterSelectionState, MovieState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
