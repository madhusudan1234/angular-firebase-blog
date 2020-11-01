import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Blog } from 'src/app/blog.model';
import { DatabaseService } from 'src/app/database.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  blogs: any;
  title = 'angular-blog';
  myControl = new FormControl();
  tags: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.retrieveBlogs();

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    // this.blogs = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._blogfilter(value))
    //   );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return [...new Set(this.tags)].filter(option => option.toLowerCase().includes(filterValue));
  }

  // private _blogfilter(value: string): Blog[] {
  //   const filterValue = value.toLowerCase();

  //   var filteredBlogs: Blog[];
  //   this.blogs.forEach(function(blog){
  //     if (blog.tags.indexOf(filterValue) != -1){
  //       filteredBlogs.push(blog)
  //     }
  //   });
  //   console.log(filteredBlogs);
  //   return filteredBlogs;
  // }

  retrieveBlogs(): void {
    const that = this
    this.db.getBlogs().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {

      this.blogs = data;
      data.forEach(function(d){
        d.tags = Object.values(d.tags);
      });

      data.forEach(function(x){
        that.tags = that.tags.concat(Object.values(x.tags))
      });
    });
  }

  addLikeToDB(key:any, currentLikeCount: number): void{
    this.db.updateLike(key, currentLikeCount+1); 
  }
}
