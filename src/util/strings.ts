export const formatNumber = (num: number): string => {
    const absNum = Math.abs(num);

    if (absNum >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    }

    if (absNum >= 1e3) {
      return (num / 1e3).toFixed(1) + "K";
    }

    return num.toString();
  };
