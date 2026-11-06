export interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
}

export function calculateAge(from: Date, to: Date = new Date()): AgeBreakdown | null {
  if (!(from instanceof Date) || Number.isNaN(from.getTime())) return null;
  if (!(to instanceof Date) || Number.isNaN(to.getTime())) return null;
  if (from > to) return null;

  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const ms = to.getTime() - from.getTime();
  const totalDays = Math.floor(ms / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(ms / (1000 * 60 * 60));
  const totalMinutes = Math.floor(ms / (1000 * 60));

  return { years, months, days, totalDays, totalHours, totalMinutes };
}
