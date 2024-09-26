export const geoStormByKIndex = (index: number) => {
  const kpFloor = Math.floor(index);
  if (kpFloor === 5) {
    return 'G1';
  } else if (kpFloor === 6) {
    return 'G2';
  } else if (kpFloor === 7) {
    return 'G3';
  } else if (kpFloor === 8) {
    return 'G4';
  } else if (kpFloor === 9) {
    return 'G5';
  } else {
    return 'G0';
  }
};

export const colorByGeoStorm = (storm: string) => {
  const colorMap: { [key: string]: string } = {
    G0: '#92D050',
    G1: '#F6EB14',
    G2: '#FFC800',
    G3: '#FF9600',
    G4: '#FF0000',
    G5: '#C80000',
  };

  return colorMap[storm];
};
