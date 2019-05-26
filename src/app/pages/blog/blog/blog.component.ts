import { Component, OnInit } from '@angular/core';
import { ShowPostService } from '../../../services/show-post/show-post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ ShowPostService ]
})
export class BlogComponent implements OnInit {
  public posts : any [];

  constructor(private showPostService:ShowPostService) { }

  ngOnInit(){
    //this.getAllPost();
  }
 
  // getAllPost(){
  //   this.showPostService.getAllPost().subscribe(result => {
  //       this.posts = result['data'];
  //   });
  // }

}
