import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

export interface Country {
  name: string;
  selected: boolean;
}

export interface Capability {
  name: string;
  subCapabilities?: Capability[];
  expanded?: boolean;
  countries: Country[];
}

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css'],
})
export class ExtraComponent implements OnInit {
  // Define the countries once
  countries: Country[] = [
    { name: 'India', selected: false },
    { name: 'Bangladesh', selected: false },
    { name: 'China', selected: false },
    { name: 'USA', selected: false },
    { name: 'Canada', selected: false },
    { name: 'New Zealand', selected: false },
  ];

  regions = {
    Asia: [
      { name: 'India', selected: false },
      { name: 'Bangladesh', selected: false },
      { name: 'China', selected: false },
    ],
    Africa: [
      { name: 'Kenya', selected: false },
      { name: 'South Africa', selected: false },
    ],
  };

  // Use map to clone countries array for each capability and sub-capability
  data: Capability[] = [
    {
      name: 'CNC',
      expanded: false,
      countries: this.countries.map((country) => ({ ...country })),
      subCapabilities: [
        {
          name: 'CNC Machining',
          countries: this.countries.map((country) => ({ ...country })),
        },
        {
          name: 'CNC Routing',
          countries: this.countries.map((country) => ({ ...country })),
        },
      ],
    },
    {
      name: 'Metal Part',
      countries: this.countries.map((country) => ({ ...country })),
      subCapabilities: [
        {
          name: 'Forging',
          countries: this.countries.map((country) => ({ ...country })),
        },
      ],
    },
  ];
  form!: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  toggleExpand(capability: Capability, event: Event): void {
    event.stopPropagation(); // Prevent row click from triggering the collapse
    capability.expanded = !capability.expanded;
  }

  getSelectedItems(): { capability: string; country: string }[] {
    const selectedItems: { capability: string; country: string }[] = [];

    const collectSelections = (capabilities: Capability[]) => {
      capabilities.forEach((capability) => {
        capability.countries.forEach((country) => {
          if (country.selected) {
            selectedItems.push({
              capability: capability.name,
              country: country.name,
            });
          }
        });
        if (capability.subCapabilities) {
          collectSelections(capability.subCapabilities);
        }
      });
    };

    collectSelections(this.data);
    // console.log(selectedItems);
    return selectedItems;
  }

  onCheckboxChange(event: any, country: any) {
    console.log(`${country.name} selected: ${event.target.checked}`);
  }

  //default selection
  // private setDefaultSelections() {
  //   // Helper function to set country selection in a sub-capability
  //   const setCountrySelection = (
  //     capability: Capability,
  //     subCapabilityName: string,
  //     countryName: string
  //   ) => {
  //     const subCapability = capability.subCapabilities?.find(
  //       (sub) => sub.name === subCapabilityName
  //     );
  //     if (subCapability) {
  //       const country = subCapability.countries.find(
  //         (c) => c.name === countryName
  //       );
  //       if (country) {
  //         country.selected = true;
  //         capability.expanded = true; // Expand parent capability
  //       }
  //     }
  //   };

  //   // Set default selection for 'CNC Routing'
  //   const cncCapability = this.data.find((cap) =>
  //     cap.subCapabilities?.some((sub) => sub.name === 'CNC Routing')
  //   );
  //   if (cncCapability) {
  //     setCountrySelection(cncCapability, 'CNC Routing', 'India');
  //   }

  //   // Set default selection for 'Metal Part'
  //   const metalPart = this.data.find((cap) => cap.name === 'Metal Part');
  //   if (metalPart) {
  //     const usaCountry = metalPart.countries.find(
  //       (country) => country.name === 'USA'
  //     );
  //     if (usaCountry) {
  //       usaCountry.selected = true;
  //       metalPart.expanded = true; // Expand 'Metal Part' capability
  //     }
  //   }
  // }
}
