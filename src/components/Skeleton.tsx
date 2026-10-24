function Skeleton() {
  return (
    <section className="grid" aria-busy="true" aria-label="Loading movies">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i}>
          <div className="skeleton" style={{ aspectRatio: "2 / 3" }} />
          <div
            className="skeleton"
            style={{ width: "70%", height: 16, marginTop: 8 }}
          />
          <div
            className="skeleton"
            style={{ width: "40%", height: 14, marginTop: 6 }}
          />
        </div>
      ))}
    </section>
  );
}

export default Skeleton;