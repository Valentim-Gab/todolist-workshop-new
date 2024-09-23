import { PaginationTableRequest } from './Pagination'

export interface TableRequestProps {
  filter?: unknown
  pagination: PaginationTableRequest
  getCellValue: (col: unknown, row: unknown) => unknown
}
