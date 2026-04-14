export interface ProgressStatusResponse {
  success: boolean
  data: ProgressStatus[]
  message: string
}

export interface ProgressStatus {
  id: number
  name: string
  status: boolean
}
