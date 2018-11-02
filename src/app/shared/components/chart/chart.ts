interface ChartValues {
  chartType: string;
  titleText: string;
  yAxisTitle: string;
  series: { name: string, data: Array<number> }[];
}
