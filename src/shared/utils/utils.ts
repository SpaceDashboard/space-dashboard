export const geoStormByKIndex = (kp: number) => {
  const kpFloor = Math.floor(kp);
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

/**
 * NOAA colors by K index - they don't match geo storm values exactly.
 * Noticed when rendering bars in "Estimated Planetary K index (3 hour)" chart
 */
export const colorByKIndex = (kp: number) => {
  const kpIndex = Number(kp);
  if (kpIndex <= 4.33) {
    return '#92D050'; // green
  } else if (kpIndex <= 5.33) {
    return '#F6EB14'; // yellow
  } else if (kpIndex <= 6.33) {
    return '#FFC800'; // light orange
  } else if (kpIndex <= 7.33) {
    return '#FF9600'; // international orange
  } else if (kpIndex <= 8.67) {
    return '#FF0000'; // red
  } else if (kpIndex <= 9.0) {
    return '#C80000'; // dark red
  } else {
    return '#92D050'; // default to green
  }
};

export const getCurrentTimestamp = () => new Date().getTime();

export const getRandomFloat = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xffffffff + 1);
};
