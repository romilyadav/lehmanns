import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  min: String = "";
  isMinValid: boolean = true;
  minAmount: number = 0;

  @Input()
  max: String = "";
  isMaxValid: boolean = true;
  maxAmount: number = 0;

  isMinGreaterThanMax = false;

  hits= [];
  displayParts = [];

  constructor(private service: ItemService) { }
  
  ngOnInit() {
    this.service.getData()
                  .subscribe(data => {
                    this.hits = data['result'].hits;
                    this.displayParts = this.collect(this.hits)
                  });
  }

  filterByPrice() {
    this.isMinValid = true;
    this.isMaxValid = true;
    this.isMinGreaterThanMax = false;
    
    this.minAmount = +this.min;
    if (isNaN(this.minAmount)) {
      this.isMinValid = false;
    }
    
    this.maxAmount = +this.max;
    if (isNaN(this.maxAmount)) {
      this.isMaxValid = false; 
    }
    
    if (!this.isMinValid || !this.isMaxValid) {
      return;
    }

    if (this.minAmount > this.maxAmount) {
      this.isMinGreaterThanMax = true;
      return;
    }

    this.displayParts = this.collect(this.hits.filter(part => this.filterParts(part)));
  }

  collect(arr) {
    let newArr = [];
    for (var i=0; i<arr.length; i+=4) {
      newArr.push(arr.slice(i, i+4));
    }
    return newArr;
  }

  filterParts(part) {
    if (part.partSummary.priceRanges.retail.start === part.partSummary.priceRanges.retail.end) {
      if ( this.minAmount <= part.partSummary.priceRanges.retail.start && part.partSummary.priceRanges.retail.start <= this.maxAmount) {
        return true;
      }
    } else {
      if (( this.minAmount <= part.partSummary.priceRanges.retail.start && part.partSummary.priceRanges.retail.start <= this.maxAmount)
        || ( this.minAmount <= part.partSummary.priceRanges.retail.end && part.partSummary.priceRanges.retail.end <= this.maxAmount)) {
        return true;
      }
    }
    return false;
  }


}
