

export const formatPrice = (price: number) => {
    return price.toLocaleString("en-IN", {
       currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };