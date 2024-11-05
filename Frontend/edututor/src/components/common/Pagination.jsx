const Pagination = ({
                      currentPage,
                      totalPages,
                      handlePageChange
                    }) =>
  (
    <div className="pagination">
      <button onClick={() => handlePageChange(0)}
              disabled={currentPage === 0}>
        «
      </button>
      <button onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}>
        ‹
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index)}
          className={`pagination-button ${index === currentPage ? 'active' : ''}`}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}>
        ›
      </button>
      <button onClick={() => handlePageChange(totalPages - 1)}
              disabled={currentPage === totalPages - 1}>
        »
      </button>
    </div>
  );

export default Pagination;