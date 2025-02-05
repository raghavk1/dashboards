import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  // The same sortedRfqData
  sortedRfqData = [
    {
      rfqId: 'RFQ101',
      states: [
        {
          state: 'RFQ_Received',
          details: 'Details for RFQ101',
          assigned_to: 'Test User',
        },
        {
          state: 'RFQ_Assigned',
          details: 'Details for RFQ101 in California',
          assigned_to: 'RH',
        },
        {
          state: 'RFQ_Accepted',
          details: 'Details for RFQ101',
          assigned_to: 'User2',
        },
      ],
    },
    {
      rfqId: 'RFQ102',
      states: [
        { state: 'RFQ_Accepted', details: 'Details for RFQ102' },
        {
          state: 'RFQ_Assigned',
          details: 'Details for RFQ102',
          assigned_to: 'User',
        },
      ],
    },
    {
      rfqId: 'RFQ103',
      states: [
        {
          state: 'Accepted_by_Supp',
          details: 'Accepted RFQ103',
          assigned_to: 'KAM User',
        },
      ],
    },
    {
      rfqId: 'RFQ104',
      states: [
        {
          state: 'RFQ_Assigned',
          details: 'RFQ104 Assigned',
          assigned_to: 'PH User',
        },
        {
          state: 'Accepted_by_Supp',
          details: 'RFQ104 Works',
          assigned_to: 'New User',
        },
      ],
    },
  ];

  states = ['RFQ_Received', 'RFQ_Assigned', 'RFQ_Accepted', 'Accepted_by_Supp'];

  constructor(private router: Router) {}

  // Calculate counts for RFQs in each state
  getCountsForState(state: string): number {
    return this.sortedRfqData.reduce((count, rfq) => {
      return count + rfq.states.filter((s) => s.state === state).length;
    }, 0);
  }

  // Navigate to the detailed view with pre-selected state
  goToDetails(state: string): void {
    this.router.navigate(['/layout'], {
      queryParams: { selectedState: state },
    });
  }
}
