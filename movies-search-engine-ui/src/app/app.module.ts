import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CheckBoxComponent } from './app-components/check-box/check-box.component';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxsModule } from '@ngxs/store';
import { FilterSelectionState } from './app-state/filter-selection-state/filter-selection-state';
import { MovieState } from './app-state/movie-state/movie-state';
import {MatDividerModule} from '@angular/material/divider';
import { StarButtonComponent } from './app-components/star-button/star-button.component';
import { FilterPanelComponent } from './app-components/filter-panel/filter-panel.component';
import { StarRatingComponent } from './app-components/star-rating/star-rating.component';
import { DashboardComponent } from './app-components/dashboard/dashboard.component';
import { DataDisplayPanelComponent } from './app-components/data-display-panel/data-display-panel.component';
import { SliderComponent } from './app-components/slider/slider.component';
import { LoginComponent } from './app-components/login/login.component';
import { NavToolbarComponent } from './app-components/nav-toolbar/nav-toolbar.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavToolbarComponent,
    DataDisplayPanelComponent,
    FilterPanelComponent,
    StarRatingComponent,
    CheckBoxComponent,
    SliderComponent,
    StarButtonComponent,
    LoginComponent
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
    MatSortModule,
    NgxsModule.forRoot([FilterSelectionState, MovieState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
