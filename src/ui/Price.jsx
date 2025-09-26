export default function Price({ price, discountPercentage = 0, currency = "₱" }) {
  const discounted = Math.round(price * (1 - discountPercentage / 100));
  return (
    <div className="price">
      <span className="price-main">{currency}{discounted}</span>
      {discountPercentage > 0 && (
        <>
          <span className="price-strike">{currency}{price}</span>
          <span className="price-disc">-{discountPercentage}%</span>
        </>
      )}
    </div>
  );
}
