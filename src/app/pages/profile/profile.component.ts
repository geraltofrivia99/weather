import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GraphqlService } from '../../services/graphql/graphql.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  username: string;
  allFileSize: number = 0;
  numberOfFules: number;

  constructor(private gql: GraphqlService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.gql.getMe().valueChanges.
      subscribe(({data: {me}}) => 
        {
          console.log(me);
          this.username = me.username
          this.numberOfFules = me.files.length;
          me.files.map(f => this.allFileSize += f.size);
          this.cdr.markForCheck();
        });
  }

}
