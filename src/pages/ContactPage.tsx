import { profile, useDocumentTitle } from "../lib/content";

export default function ContactPage() {
  useDocumentTitle("연락");

  return (
    <article className="page">
      <header className="dwg__head">
        <p className="dwg__no">
          <span className="mono">G-02</span>
        </p>
        <h1>연락</h1>
        {profile.contactNote ? <p className="dwg__lead">{profile.contactNote}</p> : null}
      </header>

      <dl className="spec spec--contact">
        {profile.email ? (
          <div>
            <dt>이메일</dt>
            <dd>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </dd>
          </div>
        ) : null}
        {profile.github ? (
          <div>
            <dt>GitHub</dt>
            <dd>
              <a href={profile.github} target="_blank" rel="noreferrer">
                {profile.github.replace(/^https?:\/\//, "")}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}
