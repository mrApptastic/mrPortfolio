export function formatYear(fromDate: string, toDate: string): any {
  if (!fromDate || !toDate) {
    return '';
  }
  return (
    new Date(fromDate).getFullYear() +
    (checkDate(fromDate, toDate)
      ? '-' + (!futureCheck(toDate) ? 'pt.' : new Date(toDate).getFullYear())
      : '')
  );
}

export function calculateAge(DateOfBirth: string): number {
  const birthday = new Date(DateOfBirth);
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return isNaN(age) ? 0 : age;
}

function checkDate(dateFrom: string, dateTo: string): boolean {
  if (new Date(dateFrom).getFullYear() === new Date(dateTo).getFullYear()) {
    return false;
  } else {
    return true;
  }
}

function futureCheck(dateTo: string): boolean {
  return new Date(dateTo) < new Date();
}
