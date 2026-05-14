import { profile } from "../data/profile";

export default function Contact() {
  return (
    <section className="section page-section contact-section">
      <div className="container contact-inner">
        <div>
          <span className="section-kicker">Contact</span>
          <h1>BIM automation, Revit add-in, and computational workflow collaboration.</h1>
          <p>{profile.intro}</p>
        </div>
        <div className="contact-actions">
          {profile.links.map((link) => (
            <a
              className={link.label === "Email" ? "btn btn-primary" : "btn btn-secondary"}
              href={link.url}
              key={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
