import SafeImage from "../components/common/SafeImage";
import { profile } from "../data/profile";
import { skillGroups } from "../data/skills";

export default function Profile() {
  const infoGroups = [
    ["Education", profile.education],
    ["Experience", profile.experience],
    ["Certificate", profile.certifications],
    ["Awards", profile.awards],
  ] as const;

  return (
    <section className="section page-section">
      <div className="container">
        <div className="profile-grid">
          <div className="profile-copy">
            <span className="section-kicker">Profile</span>
            <h1>Architecture first, automation next.</h1>
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <figure className="profile-media">
            <SafeImage src={profile.image} alt={`${profile.name} profile`} loading="eager" />
          </figure>
        </div>

        <div className="profile-cards">
          {infoGroups.map(([label, items]) =>
            items.map((item) => (
              <article className="info-card" key={`${label}-${item.title}`}>
                <span className="info-label">{label}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </article>
            )),
          )}
        </div>

        <div className="timeline-panel">
          <h2>Career Flow</h2>
          <ol className="career-flow">
            {profile.careerFlow.map((item) => (
              <li key={item.period}>
                <span>{item.period}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <span className="info-label">{group.title}</span>
              <h2>{group.subtitle}</h2>
              <div className="tag-list">
                {group.skills.map((skill) => (
                  <span className="tag" key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
