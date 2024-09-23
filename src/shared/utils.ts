export const geoStormByKIndex = (index: number) => {
  const kpNum = Math.floor(index);
  if (kpNum === 5) {
    return 'G1';
  } else if (kpNum === 6) {
    return 'G2';
  } else if (kpNum === 7) {
    return 'G3';
  } else if (kpNum === 8) {
    return 'G4';
  } else if (kpNum >= 9) {
    return 'G5';
  } else {
    return 'G0';
  }
}

export const colorByGeoStorm = (storm: string) => {
  const colorMap: { [key: string]: string } = {
    G1: '#F6EB14',
    G2: '#FFC800',
    G3: '#FF9600',
    G4: '#FF0000',
    G5: '#C80000',
  };

  return colorMap[storm];
}
