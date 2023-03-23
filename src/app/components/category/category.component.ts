import { Component } from '@angular/core';

interface AccordionItem {
  title: string;
  content: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  public items: AccordionItem[] = [
    { title: 'Item 1', content: 'This is the content for item 1.', isOpen: false },
    { title: 'Item 2', content: 'This is the content for item 2.', isOpen: false },
    { title: 'Item 3', content: 'This is the content for item 3.', isOpen: false },
  ];

  public toggleAccordion(item: AccordionItem): void {
    item.isOpen = !item.isOpen;
  }
}
