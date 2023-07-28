const getCurrentDateTime = (num: number) => {
  return num.toString().padStart(2, '0');
}

export const useGetDateTime = (date: Date) => {
  return (
    [
      getCurrentDateTime(date.getFullYear()),
      getCurrentDateTime(date.getMonth() + 1),
      getCurrentDateTime(date.getDate()),
    ].join('-') +
    ' ' +
    [
      getCurrentDateTime(date.getHours()),
      getCurrentDateTime(date.getMinutes()),
      getCurrentDateTime(date.getSeconds()),
    ].join(':')
  );
}

// 👇️ YYYY-MM-DD hh:mm:ss
// 👇️ "2023-01-20 14:03:10" (Current date and time)
// console.log(useGetDateTime(new Date()));