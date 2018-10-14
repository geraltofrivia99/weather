import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'adddialog-component',
  templateUrl: 'addDialog.button.html',
  styleUrls: ['addDialog.button.css'],
})
export class DialogContentExample {
  inputvalue = "hello";
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}

@Component({
  selector: 'modal-add-direct-message',
  templateUrl: 'modal-add-direct-message.html',
})
export class DialogContentExampleDialog {}