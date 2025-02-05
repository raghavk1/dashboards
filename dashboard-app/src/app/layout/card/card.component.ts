import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() details!: string; // RFQ details
  @Input() state!: string; // State for color mapping
  @Input() assigned_to!: any;

  // Map states to colors
  getColor(): string {
    const stateColors: { [key: string]: string } = {
      RFQ_Received: '#f4a261',
      RFQ_Assigned: '#2a9d8f',
      RFQ_Accepted: '#e76f51',
      Accepted_by_Supp: '#ccc', // Default color if state is not found
    };
    return stateColors[this.state] || stateColors['default'];
  }
}
