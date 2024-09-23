export interface Pagination<T> {
  totalPages: number
  totalElements: number
  pageable: {
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
    offset: number
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
  }
  numberOfElements: number
  size: number
  content: Array<T>
  number: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  first: boolean
  last: boolean
  empty: boolean
}

export interface PaginationTableRequest {
  descending?: boolean
  page: number
  rowsNumber?: number
  rowsPerPage: number
  sortBy?: string | null
}
