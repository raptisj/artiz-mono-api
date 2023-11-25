export const setPagination = (
  page: number,
  pageSize: number,
  totalItems: number
) => {
  return {
    page,
    pageSize,
    totalItems,
    totalPages: Math.ceil(totalItems / pageSize),
  };
};
