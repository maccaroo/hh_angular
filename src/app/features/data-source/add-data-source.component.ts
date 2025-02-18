import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataSourceService } from '../../core/services/data-source.service';
import { Router } from '@angular/router';
import { DataSource } from '../../core/models/data-source';
import { BackButtonComponent } from "../../components/back-button/back-button.component";


@Component({
    selector: 'app-add-data-source',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, BackButtonComponent],
    template: `
        <h2>Add New Data Source</h2>
        <form [formGroup]="addDataSourceForm" (ngSubmit)="onSubmit()">
            <label for="name">Name</label>
            <input id="name" formControlName="name" required />

            <label for="description">Description</label>
            <textarea id="description" formControlName="description" required></textarea>

            <label for="dataType">Data Type</label>
            <select id="dataType" formControlName="dataType" required>
                <option value="string">String</option>
                <option value="numeric">Numeric</option>
            </select>

            <button type="submit" [disabled]="!addDataSourceForm.valid">Add</button>
        </form>
        <app-back-button></app-back-button>
    `,
  styleUrls: ['./add-data-source.component.scss']
})
export class AddDataSourceComponent {
    addDataSourceForm: FormGroup;

    constructor(private fb: FormBuilder, private dataSourceService: DataSourceService, private router: Router) {
        this.addDataSourceForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            dataType: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.addDataSourceForm.valid) {
            const newDataSource: Omit<DataSource, 'id' | 'createdAt' | 'createdByUserId'> = this.addDataSourceForm.value;
            this.dataSourceService.addDataSource(newDataSource).subscribe(() => {
                this.router.navigate(['/data-sources']);
            });
        }
    }
}
