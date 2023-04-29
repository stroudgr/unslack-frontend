import {
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatSortModule
} from '@angular/material';

import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatButtonModule, MatCheckboxModule, MatTabsModule,
       MatListModule, MatToolbarModule, MatCardModule, MatGridListModule, MatFormFieldModule,
       MatInputModule, MatDividerModule, MatSortModule],
    exports: [MatButtonModule, MatButtonModule, MatCheckboxModule, MatTabsModule,
       MatListModule, MatToolbarModule, MatCardModule, MatGridListModule, MatFormFieldModule,
       MatInputModule, MatDividerModule, MatSortModule]
})

export class MaterialModule {}
