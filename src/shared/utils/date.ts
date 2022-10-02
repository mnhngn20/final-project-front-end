import dayjs, { Dayjs } from 'dayjs';

export enum ReportType {
  Day = 'day',
  Month = 'month',
  Year = 'year',
  Week = 'week',
}

export const formatDate = (
  date?: dayjs.ConfigType,
  formatter = 'DD/MM/YYYY',
) => {
  return date ? dayjs(date).format(formatter) : 'N/A';
};

export const formatTimestampToUnix = (
  date: number,
  formatter = 'DD/MM/YYYY',
) => {
  return dayjs.unix(date).format(formatter);
};

export const formateDateByGroup = (
  date: dayjs.ConfigType,
  groupBy: ReportType,
) => {
  if (groupBy === ReportType.Year) {
    return formatDate(date, 'YYYY');
  }
  if (groupBy === ReportType.Month) {
    return formatDate(date, 'MM/YYYY');
  }
  return formatDate(date, 'DD/MM/YYYY');
};

export const formateDatesByGroup = (dates: Dayjs[], groupBy: ReportType) => {
  if (groupBy === ReportType.Year) {
    return [dates[0].startOf('year'), dates[1].endOf('year')];
  }
  if (groupBy === ReportType.Month) {
    return [dates[0].startOf('month'), dates[1].endOf('month')];
  }
  if (groupBy === ReportType.Week) {
    return [dates[0].startOf('week'), dates[1].endOf('week')];
  }
  return dates;
};

export const getDefaultRangeDate = (groupBy: ReportType) => {
  if (groupBy === ReportType.Year) {
    return [dayjs('2021'), dayjs().endOf('year')];
  }
  if (groupBy === ReportType.Month) {
    return [dayjs().startOf('year'), dayjs().endOf('month')];
  }
  if (groupBy === ReportType.Week) {
    return [dayjs().subtract(4, 'week').startOf('week'), dayjs().endOf('week')];
  }
  if (groupBy === ReportType.Day) {
    return [dayjs().subtract(7, 'day'), dayjs()];
  }
  return [dayjs(), dayjs()];
};

export const getDefaultRankingRangeDate = (groupBy: ReportType) => {
  if (groupBy === ReportType.Year) {
    return [dayjs().startOf('year'), dayjs().endOf('year')];
  }
  if (groupBy === ReportType.Month) {
    return [dayjs().startOf('month'), dayjs().endOf('month')];
  }
  if (groupBy === ReportType.Week) {
    return [dayjs().startOf('week'), dayjs().endOf('week')];
  }
  if (groupBy === ReportType.Day) {
    return [dayjs().startOf('day'), dayjs().endOf('day')];
  }
  return [dayjs(), dayjs()];
};
