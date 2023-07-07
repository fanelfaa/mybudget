import format from 'date-fns/format';
import localeId from 'date-fns/locale/id';

export const formatDate = (date: Date, formatString: string) =>
	format(date, formatString, { locale: localeId });
