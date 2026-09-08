const credentials = [
  {
    title: "Licensed Business Consultancy in Wyoming, USA",
    detail: "Fully licensed and registered, operating from Sheridan, Wyoming — serving global clients with US-standard compliance.",
  },
  {
    title: "WIPO Madrid Protocol Certified Filing Agent",
    detail: "Authorized to file international trademark applications, covering 130+ member countries.",
  },
  {
    title: "256-bit SSL Encrypted Platform",
    detail: "Client data, documents, and communications protected with bank-grade encryption and secure document vaults.",
  },
  {
    title: "Compliant with International Regulatory Standards",
    detail: "Operations compliant with GDPR, FDA requirements, and cross-border trade standards.",
  },
];

export default function Trust() {
  return (
    <section className="section trust" id="about">
      <div className="container">
        <h2>Recognized and certified</h2>
        <div className="grid grid-4">
          {credentials.map((c) => (
            <div className="card" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
