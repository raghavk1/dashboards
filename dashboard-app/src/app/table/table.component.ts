// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

// interface SubCategory {
//   id: number;
//   name: string;
//   value: boolean;
// }

// interface Category {
//   id: number;
//   name: string;
//   value: boolean;
//   subCategory?: SubCategory[];
// }

// interface Country {
//   id: number;
//   name: string;
//   categories: Category[];
// }

// interface Region {
//   id: number;
//   region: string;
//   countries: Country[];
// }

// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css'],
// })
// export class TableComponent implements OnInit {
//   form: FormGroup;
// regions: Region[] = [
//   {
//     id: 27,
//     region: 'Asia',
//     countries: [
//       {
//         id: 38,
//         name: 'India',
//         categories: [
//           {
//             id: 41,
//             name: 'CNC',
//             value: false,
//             subCategory: [{ id: 38, name: 'XYZ', value: false }],
//           },
//         ],
//       },
//       {
//         id: 39,
//         name: 'China',
//         categories: [
//           {
//             id: 41,
//             name: 'CNC',
//             value: false,
//           },
//           {
//             id: 42,
//             name: 'Metal Part',
//             value: false,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 28,
//     region: 'Europe',
//     countries: [
//       {
//         id: 40,
//         name: 'Austria',
//         categories: [
//           {
//             id: 43,
//             name: 'Machine',
//             value: false,
//             subCategory: [{ id: 30, name: 'ABC', value: false }],
//           },
//           {
//             id: 42,
//             name: 'Metal Part',
//             value: false,
//           },
//         ],
//       },

//       {
//         id: 141,
//         name: 'Germany',
//         categories: [
//           {
//             id: 43,
//             name: 'Machine',
//             value: false,
//             subCategory: [{ id: 30, name: 'ABC', value: false }],
//           },
//           {
//             id: 42,
//             name: 'Metal Part',
//             value: false,
//           },
//         ],
//       },
//     ],
//   },
// ];
//   payloadRegion: Region[] = [];
//   categoryVisibility: boolean[] = [];

//   constructor(private fb: FormBuilder) {
//     this.form = this.fb.group({
//       rows: this.fb.array([]),
//     });
//   }

//   get rows(): FormArray {
//     return this.form.get('rows') as FormArray;
//   }

//   ngOnInit(): void {
//     this.initForm();
//     this.payloadRegion = this.regions;
//   }

//   private initForm() {
//     const categories = this.getAllCategories();
//     categories.forEach(() => {
//       const rowFormArray = this.fb.array(
//         this.regions.flatMap((region) =>
//           region.countries.map(() => this.fb.control(false))
//         )
//       );
//       this.rows.push(rowFormArray);
//       this.categoryVisibility.push(false); // Initialize all categories as collapsed
//     });
//   }

//   getAllCategories(): Category[] {
//     const categoriesSet: Category[] = [];
//     this.regions.forEach((region) => {
//       region.countries.forEach((country) => {
//         country.categories.forEach((category) => {
//           if (!categoriesSet.find((cat) => cat.id === category.id)) {
//             categoriesSet.push(category);
//           }
//         });
//       });
//     });
//     return categoriesSet;
//   }

//   toggleCategory(index: number) {
//     this.categoryVisibility[index] = !this.categoryVisibility[index];
//   }

//   getRowFormArray(index: number): FormArray {
//     return this.rows.at(index) as FormArray;
//   }

//   getRowControl(rowIndex: number, colIndex: number): FormControl {
//     return this.getRowFormArray(rowIndex).at(colIndex) as FormControl;
//   }

//   // changeBox(region: any, cap: any, country: any) {
//   //   console.log('Region is:', region);
//   //   console.log('Capability is:', cap);
//   //   console.log('Country is:', country);
//   // }
//   changeBox(
//     region: Region,
//     category: Category | SubCategory,
//     country: Country,
//     event: any
//   ) {
//     const isChecked = event.target.checked;

//     this.payloadRegion.forEach((reg) => {
//       if (reg.id === region.id) {
//         reg.countries.forEach((cntry) => {
//           if (cntry.id === country.id) {
//             cntry.categories.forEach((cat) => {
//               if (cat.id === (category as Category).id) {
//                 // Set the value for the category
//                 cat.value = isChecked;

//                 // Set the value for all subcategories if they exist
//                 if (cat.subCategory) {
//                   cat.subCategory.forEach((subCat) => {
//                     subCat.value = isChecked;
//                   });
//                 }
//               }

//               // If toggling a subcategory, only update its value
//               if (cat.subCategory) {
//                 cat.subCategory.forEach((subCat) => {
//                   if (subCat.id === (category as SubCategory).id) {
//                     subCat.value = isChecked;
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     });

//     console.log(
//       'Updated regions:',
//       JSON.stringify(this.payloadRegion, null, 2)
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

interface SubCategory {
  id: number;
  name: string;
  value: boolean;
}

interface Category {
  id: number;
  name: string;
  value: boolean;
  subCategory?: SubCategory[];
}

interface Country {
  id: number;
  name: string;
  categories: Category[];
}

interface Region {
  id: number;
  region: string;
  countries: Country[];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  mappingRegions: Region[] = [
    {
      id: 27,
      region: 'Asia',
      countries: [
        {
          id: 38,
          name: 'India',
          categories: [
            {
              id: 41,
              name: 'CNC',
              value: false,
              subCategory: [{ id: 38, name: 'XYZ', value: false }],
            },
          ],
        },
        {
          id: 39,
          name: 'China',
          categories: [
            {
              id: 41,
              name: 'CNC',
              value: false,
            },
            {
              id: 42,
              name: 'Metal Part',
              value: true,
            },
          ],
        },
      ],
    },
    {
      id: 28,
      region: 'Europe',
      countries: [
        {
          id: 40,
          name: 'Austria',
          categories: [
            {
              id: 43,
              name: 'Machine',
              value: false,
              subCategory: [{ id: 30, name: 'ABC', value: false }],
            },
            {
              id: 42,
              name: 'Metal Part',
              value: false,
            },
          ],
        },

        {
          id: 141,
          name: 'Germany',
          categories: [
            {
              id: 43,
              name: 'Machine',
              value: true,
              subCategory: [{ id: 30, name: 'ABC', value: false }],
            },
            {
              id: 42,
              name: 'Metal Part',
              value: false,
            },
          ],
        },
      ],
    },
  ];
  payloadRegion: Region[] = [];
  categoryVisibility: boolean[] = [];

  ngOnInit(): void {
    this.payloadRegion = this.mappingRegions;
    this.categoryVisibility = new Array(this.getAllCategories().length).fill(
      false
    ); // Initialize category visibility
  }

  getAllCategories(): Category[] {
    const categoriesSet: Category[] = [];
    this.mappingRegions.forEach((region) => {
      region.countries.forEach((country) => {
        country.categories.forEach((category) => {
          if (!categoriesSet.find((cat) => cat.id === category.id)) {
            categoriesSet.push(category);
          }
        });
      });
    });
    return categoriesSet;
  }

  toggleCategory(index: number) {
    this.categoryVisibility[index] = !this.categoryVisibility[index];
  }

  isChecked(
    region: Region,
    country: Country,
    category: Category | SubCategory
  ): boolean {
    const foundCategory = country.categories.find(
      (cat) => cat.id === category.id
    );
    return foundCategory ? foundCategory.value : false;
  }

  changeBox(
    region: Region,
    category: Category | SubCategory,
    country: Country,
    event: any
  ) {
    const isChecked = event.target.checked;

    this.payloadRegion.forEach((reg) => {
      if (reg.id === region.id) {
        reg.countries.forEach((cntry) => {
          if (cntry.id === country.id) {
            cntry.categories.forEach((cat) => {
              if (cat.id === (category as Category).id) {
                // Set the value for the category
                cat.value = isChecked;
              }

              // If toggling a subcategory, only update its value
              if (cat.subCategory) {
                cat.subCategory.forEach((subCat) => {
                  if (subCat.id === (category as SubCategory).id) {
                    subCat.value = isChecked;
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  searchControl = new FormControl();
  users = [
    { name: 'Rohit Sharma', email: 'rohit.sharma@motherson.com' },
    { name: 'Aditya Singh', email: 'aditya.singh@motherson.com' },
    { name: 'Avanish Yadav', email: 'avanish.yadav@motherson.com' },
    { name: 'Jitesh Dube', email: 'jitesh.dube@motherson.com' },
  ];

  filteredUsers: Observable<any[]>;
  selectedUser: any; // Track the selected user

  constructor() {
    // Initialize filtered users
    this.filteredUsers = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterUsers(value as any))
    );
  }

  // Filter users based on the search input
  private _filterUsers(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue)
    );
  }

  // Select a user and track the selection
  selectUser(user: any) {
    this.selectedUser = user; // Mark the user as selected
  }

  // Reset the selection
  cancel() {
    this.selectedUser = null;
    this.searchControl.reset();
  }

  // Handle the "Assign" action
  assign() {
    if (this.selectedUser) {
      console.log('Assigned user:', this.selectedUser);
    }
  }
}
