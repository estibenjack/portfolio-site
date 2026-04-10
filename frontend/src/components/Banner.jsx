const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-track">
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <span key={i}>
              actively building &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; work in
              progress &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
      </div>
    </div>
  );
};

export default Banner;
