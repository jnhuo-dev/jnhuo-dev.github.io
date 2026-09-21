import type { Entry } from "virtual:content";
import { profile, useDocumentTitle } from "../lib/content";

export default function ProfilePage() {
  useDocumentTitle("소개");

  const schedules: [string, Entry[]][] = [
    ["경력 흐름", profile.career],
    ["경력", profile.experience],
    ["학력", profile.education],
    ["자격", profile.certificates],
    ["수상", profile.awards],
  ];
  let no = 0;

  return (
    <article className="page">
      <header className="dwg__head">
        <p className="dwg__no">
          <span className="mono">G-01</span>
        </p>
        <h1>
          {profile.name}
          {profile.nameEn ? <span className="h1__en">{profile.nameEn}</span> : null}
        </h1>
        {profile.role ? <p className="dwg__lead">{profile.role}</p> : null}
      </header>

      <div className="profile">
        {profile.photo ? (
          <figure className="profile__photo">
            <img src={profile.photo} alt={`${profile.name} 사진`} />
          </figure>
        ) : null}
        {profile.html ? <div className="prose" dangerouslySetInnerHTML={{ __html: profile.html }} /> : null}
      </div>

      <div className="schedules">
        {schedules.map(([title, entries]) =>
          entries.length > 0 ? <Schedule key={title} no={++no} title={title} entries={entries} /> : null,
        )}
        {profile.skills.length > 0 ? (
          <section className="schedule">
            <h2>
              <span className="mono">{String(++no).padStart(2, "0")}</span>
              기술
            </h2>
            <table>
              <tbody>
                {profile.skills.map((skill) => (
                  <tr key={skill.group}>
                    <th scope="row">{skill.group}</th>
                    <td>{skill.items.join(" / ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}
      </div>
    </article>
  );
}

function Schedule({ no, title, entries }: { no: number; title: string; entries: Entry[] }) {
  const hasPeriod = entries.some((entry) => entry.period);

  return (
    <section className="schedule">
      <h2>
        <span className="mono">{String(no).padStart(2, "0")}</span>
        {title}
      </h2>
      <table>
        <tbody>
          {entries.map((entry) => (
            <tr key={`${entry.period}-${entry.title}`}>
              {hasPeriod ? (
                <th scope="row" className="mono">
                  {entry.period ?? "—"}
                </th>
              ) : null}
              <td>
                <strong>{entry.title}</strong>
                {entry.text ? <p>{entry.text}</p> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
