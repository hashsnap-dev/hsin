export const computeBMI = (bmi: number) => {
  if (bmi <= 18.5) return {label: '저체중', className: 'bmi-1'};
  else if (bmi <= 23) return {label: '정상', className: 'bmi-2'};
  else if (bmi <= 25) return {label: '과체중', className: 'bmi-3'};
  else if (bmi <= 30) return {label: '비만', className: 'bmi-4'};
  else  return {label: '고도비만', className: 'bmi-5'};
};