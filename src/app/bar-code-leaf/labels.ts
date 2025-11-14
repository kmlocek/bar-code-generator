export interface Label {
  text: string;
}

export const createArrayOf = (text: string, count: number): Label[] => {
  return Array.from(Array(count).keys()).map(() => ({ text }));
}

export const labels: Label[] = [
  //   ...createArrayOf("4608", 65, false),
  //   ...createArrayOf("9737", 65, false),
  //   ...createArrayOf("Dżem z borówki (2025)", 13, true),
  //   ...createArrayOf("9737", 52, false),
  //   ...createArrayOf("Dżem z borówki (2024)", 8),
  //   ...createArrayOf("Ogórki kiszone (2024)", 17),
  ...createArrayOf("7008440080", 1),
  ...createArrayOf("7008440081", 1),
  ...createArrayOf("7008440082", 1),
  ...createArrayOf("7008440083", 1),
  ...createArrayOf("7008440084", 1),

  ...createArrayOf("17008440080", 1),
  ...createArrayOf("17008440081", 1),
  ...createArrayOf("17008440082", 1),
  ...createArrayOf("17008440083", 1),
  ...createArrayOf("17008440084", 1),

  ...createArrayOf("127008440080", 1),
  ...createArrayOf("127008440081", 1),
  ...createArrayOf("127008440082", 1),
  ...createArrayOf("127008440083", 1),
  ...createArrayOf("127008440084", 1),

  ...createArrayOf("1237008440080", 1),
  ...createArrayOf("1237008440081", 1),
  ...createArrayOf("1237008440082", 1),
  ...createArrayOf("1237008440083", 1),
  ...createArrayOf("1237008440084", 1),

  ...createArrayOf("12347008440080", 1),
  ...createArrayOf("12347008440081", 1),
  ...createArrayOf("12347008440082", 1),
  ...createArrayOf("12347008440083", 1),
  ...createArrayOf("12347008440084", 1),


  ...createArrayOf("123457008440080", 1),
  ...createArrayOf("123457008440081", 1),
  ...createArrayOf("123457008440082", 1),
  ...createArrayOf("123457008440083", 1),
  ...createArrayOf("123457008440084", 1),

  ...createArrayOf("9999440080", 1),
  ...createArrayOf("9999440081", 1),
  ...createArrayOf("9999440082", 1),
  ...createArrayOf("9999440083", 1),
  ...createArrayOf("9999440084", 1),

  ...createArrayOf("9999440010", 1),
  ...createArrayOf("9999440011", 1),
  ...createArrayOf("9999440012", 1),
  ...createArrayOf("9999440013", 1),
  ...createArrayOf("9999440014", 100),
]
