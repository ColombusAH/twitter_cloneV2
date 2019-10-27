import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog-popup',
  templateUrl: './error-dialog-popup.component.html',
  styleUrls: ['./error-dialog-popup.component.scss']
})
export class ErrorDialogPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public errorMessage: string) {}
}
