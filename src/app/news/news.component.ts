import { Component, OnInit, TemplateRef } from '@angular/core';
import { NewsService } from '../news.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  template: `
    <h2>Add Favorite News List</h2>
    <input type="text" [(ngModel)]="title" placeholder="Title">
    <button (click)="addFavorite()">Add</button>
  `
})

export class NewsComponent implements OnInit {
  newsItems: any[] = [];
  modalRef?: BsModalRef;
  singleItem: any;
  favArray: any = [];
  pubDate: any;
  title: any;

  constructor(
    private newsService: NewsService, 
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.getLatestNews();
  }

  openModal(template: TemplateRef<any>, item: any) {
    this.singleItem = item;

    this.modalRef = this.modalService.show(template);
  }

  //Get the feeds and display all titles and discription for the latest News Feeds
  getLatestNews() {
    const feedUrl = 'https://feeds.feedburner.com/ndtvnews-top-stories';
    this.newsService.getNewsFeed(feedUrl)
      .subscribe(
        data => {
          this.newsItems = data;
        },
        error => {
          console.error('Error while fetching news feed:', error);
        }
      );
  }

  addFaourite(item: any) {
    //save fovourite news items
    this.favArray.push(item);
    alert('Added Faourite');
  }

  //Store the favorite news items title in the database
  addFavorite(): void {
    this.newsService.addFavorite(this.title)
      .subscribe(
        () => {
          console.log('Favorite news item added successfully!');
        },
        (error) => {
          console.error('Error adding favorite news item:', error);
        }
      );
  }
}
