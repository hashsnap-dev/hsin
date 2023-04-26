import { parseISO, format } from 'date-fns';

type DateProps = {
  dateString: string;
};

export default function DateTime({ dateString }: DateProps) {
  try {
    const date = parseISO(dateString);
    return (
      <time dateTime={dateString}>{format(date, 'yyyy-MM-dd HH:mm')}</time>
    );
  } catch (e) {
    console.error(e);
  }

  return <></>;
}
