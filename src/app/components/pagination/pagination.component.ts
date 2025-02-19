import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    template: `
        <div class="pagination-wrapper">
            <div class="pagination-container">
                <button
                    (click)="changePage(currentPage - 1)"
                    [disabled]="isFirstPage"
                >
                    Previous
                </button>
                Page {{ currentPage }} of {{ totalPages }}
                <button
                    (click)="changePage(currentPage + 1)"
                    [disabled]="isLastPage"
                >
                    Next
                </button>
            </div>
        </div>
    `,
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
    @Input() currentPage!: number;
    @Input() totalPages!: number;
    @Output() pageChange = new EventEmitter<number>();

    // track whether it is the first page
    get isFirstPage(): boolean {
        return this.currentPage === 1;
    }

    get isLastPage(): boolean {
        return this.currentPage === this.totalPages;
    }

    changePage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.pageChange.emit(page);
        }
    }
}
