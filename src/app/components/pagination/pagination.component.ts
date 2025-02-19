import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    template: `
        <div class="pagination-controls">
            <button (click)="changePage(currentPage - 1)">Previous</button>
            Page {{ currentPage }} of {{ totalPages }}
            <button (click)="changePage(currentPage + 1)">Next</button>
        </div>
    `,
})
export class PaginationComponent {
    @Input() currentPage!: number;
    @Input() totalPages!: number;
    @Output() pageChange = new EventEmitter<number>();

    changePage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.pageChange.emit(page);
        }
    }
}
