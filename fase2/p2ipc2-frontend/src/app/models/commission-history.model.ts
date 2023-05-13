export interface CommissionHistoryModel {
  id: number;
  start_date: string;
  end_date?: string;
  old_commission: number;
  new_commission: number;
}
