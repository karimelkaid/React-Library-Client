
interface PaginationProps {
    page: number;   // Current page number
    pageSize: number;   // Number of items per page
    total: number;  // Total number of items
    onPageChange: (page: number) => void;   // Function to call when the page changes
}

const Pagination = ({ page, pageSize, total, onPageChange } : PaginationProps) => {
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
            >
                &lt;-
            </button>
            <span>Page {page}</span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
            >
                -&gt;
            </button>
        </div>
    );
};

export default Pagination;
