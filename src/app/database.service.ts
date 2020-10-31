import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { Blog } from 'src/app/blog.model';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbPath = '/blogs';

  blogsRef: AngularFireList<Blog> = null;

  constructor(private fireDB: AngularFireDatabase) { 
    this.blogsRef = fireDB.list(this.dbPath);
  }

  getBlogs(): AngularFireList<Blog>{
    return this.blogsRef;
  }
  
  updateLike(key: string, value: number): Promise<void>{
    return this.blogsRef.update(key, { likecount: value });
  }
  createPolicy(blog: Blog){//TODO:
      // return this.firestore.collection('policies').add(blog);
  }
  
  updatePolicy(blog: Blog){//TODO:
      // delete blog.title;
      // this.firestore.doc('policies/' + blog.title).update(blog);
  }
  
  deletePolicy(blogId: string){//TODO:
      // this.firestore.doc('policies/' + blogId).delete();
  }
}
