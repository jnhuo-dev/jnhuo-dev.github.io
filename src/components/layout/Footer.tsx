import { profile } from "../../data/profile";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.headline}</span>
      </div>
    </footer>
  );
}
