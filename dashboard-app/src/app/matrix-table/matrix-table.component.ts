import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matrix-table',
  templateUrl: './matrix-table.component.html',
  styleUrls: ['./matrix-table.component.css'],
})
export class MatrixTableComponent {
  displayedColumns: string[] = [
    'Name',
    'RFQ received from Customer',
    'RFQ submitted to Supplier & Ops',
    'Submission to Supplier',
    'Submission to Logistics',
    'Quote Received from Supplier',
    'Quote Received from Logistics',
    'Quote Received for Customer',
    'PO Received from Customer',
    'PO Internal Approval',
    'Grand Total',
  ];

  dataSource = [
    {
      Name: 'RH',
      'RFQ received from Customer': 2,
      'RFQ submitted to Supplier & Ops': 3,
      'Submission to Supplier': 1,
      'Submission to Logistics': 1,
      'Quote Received from Supplier': 2,
      'Quote Received from Logistics': 2,
      'Quote Received for Customer': 3,
      'PO Received from Customer': 2,
      'PO Internal Approval': 1,
      'Grand Total': 17,
    },
    {
      Name: 'KAM',
      'RFQ received from Customer': 2,
      'RFQ submitted to Supplier & Ops': 2,
      'Submission to Supplier': 3,
      'Submission to Logistics': 3,
      'Quote Received from Supplier': 3,
      'Quote Received from Logistics': 2,
      'Quote Received for Customer': 3,
      'PO Received from Customer': 3,
      'PO Internal Approval': 2,
      'Grand Total': 23,
    },
    {
      Name: 'Procurement Admin',
      'RFQ received from Customer': 2,
      'RFQ submitted to Supplier & Ops': 2,
      'Submission to Supplier': 2,
      'Submission to Logistics': 2,
      'Quote Received from Supplier': 3,
      'Quote Received from Logistics': 2,
      'Quote Received for Customer': 3,
      'PO Received from Customer': 2,
      'PO Internal Approval': 2,
      'Grand Total': 20,
    },
    // Add more rows as needed
  ];
}
