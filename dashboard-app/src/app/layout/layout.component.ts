import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  // The given JSON data
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
      rfqId: 'RFQ103',
      states: [
        {
          state: 'RFQ_Received',
          details: 'Received RFQ103',
          assigned_to: 'KAM User',
        },
        {
          state: 'RFQ_Assigned',
          details: 'RFQ Assigned RFQ103',
          assigned_to: 'LH User',
        },
      ],
    },
    {
      rfqId: 'RFQ104',
      states: [
        {
          state: 'RFQ_Received',
          details: 'RFQ104 Received by RH',
          assigned_to: 'RH@User.com',
        },
        {
          state: 'RFQ_Assigned',
          details: 'RFQ104 Assigned',
          assigned_to: 'PH User',
        },
        {
          state: 'RFQ_Accepted',
          details: 'RFQ104 Accepted',
          assigned_to: 'PA User',
        },
        {
          state: 'Accepted_by_Supp',
          details: 'RFQ104 Works',
          assigned_to: 'New User',
        },
      ],
    },
    {
      rfqId: 'RFQ105',
      states: [
        {
          state: 'RFQ_Received',
          details: 'RFQ105 Received by RH',
          assigned_to: 'RH@User.com',
        },
      ],
    },
  ];

  // Define toggle flag
  toggleLastStateOnly = false;

  // Extract unique states
  states = ['RFQ_Received', 'RFQ_Assigned', 'RFQ_Accepted', 'Accepted_by_Supp'];

  // Extract unique RFQ IDs
  rfqIds = this.sortedRfqData.map((rfq) => rfq.rfqId);

  // Get RFQs for a specific RFQ ID and state
  getRfqsForStateAndId(rfqId: string, state: string) {
    const rfq = this.sortedRfqData.find((r) => r.rfqId === rfqId);
    return rfq ? rfq.states.filter((s) => s.state === state) : [];
  }

  // Determine if RFQ should be shown
  shouldShowRfq(rfqId: string, state: string): boolean {
    if (!this.toggleLastStateOnly) {
      return true;
    }

    const rfq = this.sortedRfqData.find((r) => r.rfqId === rfqId);
    if (!rfq || !rfq.states.length) {
      return false;
    }

    // Get the last state for the RFQ based on the order of states in the array
    const lastState = rfq.states[rfq.states.length - 1].state;
    return state === lastState;
  }
}
