export interface LoanRequest{
    borrowerName: string,
    borrowerPhone: string,
    plannedReturnDate: string,
    quantity?: number,
    loanDate?: string,
}