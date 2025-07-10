function autoCalculate() {
  const basePrice = parseFloat(document.getElementById("basePrice").value);
  const grams = parseFloat(document.getElementById("quantity").value);
  const manualPackGrams = parseFloat(document.getElementById("manualPackGrams").value);

  const taxedPrice = !isNaN(basePrice) ? basePrice * 1.10 : null;
  const costPerGram = (!isNaN(taxedPrice) && !isNaN(grams) && grams > 0)
    ? taxedPrice / grams : null;
  const retailPrice = costPerGram !== null
    ? costPerGram * 1.8 : null;

  const rm8Packs = (!isNaN(grams) && !isNaN(manualPackGrams) && manualPackGrams > 0)
    ? Math.floor(grams / manualPackGrams) : null;

  const totalRevenue = rm8Packs !== null
    ? rm8Packs * 8 : null;

  const profit = (!isNaN(basePrice) && totalRevenue !== null)
    ? totalRevenue - basePrice : null;

  document.getElementById("taxedPrice").value = taxedPrice !== null ? taxedPrice.toFixed(2) : "-";
  document.getElementById("costPerItem").value = costPerGram !== null ? costPerGram.toFixed(2) : "-";
  document.getElementById("retailPrice").value = retailPrice !== null ? retailPrice.toFixed(2) : "-";
  document.getElementById("rm8Packs").value = rm8Packs !== null ? rm8Packs : "-";
  document.getElementById("totalRevenue").value = totalRevenue !== null ? totalRevenue.toFixed(2) : "-";
  document.getElementById("profit").value = profit !== null ? profit.toFixed(2) : "-";

  document.getElementById("packText").innerText = rm8Packs !== null ? rm8Packs : "-";
}

function clearAll() {
  ["basePrice", "quantity", "manualPackGrams"].forEach(id => {
    document.getElementById(id).value = "";
  });

  ["taxedPrice", "costPerItem", "retailPrice", "rm8Packs", "totalRevenue", "profit"].forEach(id => {
    document.getElementById(id).value = "-";
  });

  document.getElementById("packText").innerText = "-";
}

window.addEventListener("DOMContentLoaded", () => {
  ["basePrice", "quantity", "manualPackGrams"].forEach(id => {
    document.getElementById(id).addEventListener("input", autoCalculate);
  });

  document.getElementById("clearButton").addEventListener("click", clearAll);
  autoCalculate();
});
