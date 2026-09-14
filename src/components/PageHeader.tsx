import Link from "next/link";
import { routes } from "@/src/lib/navigation";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  /** Optional emphasised trailing fragment of the title (rendered gold). */
  titleAccent?: string;
  intro?: string;
  crumbs?: Crumb[];
}

export default function PageHeader({
  eyebrow,
  title,
  titleAccent,
  intro,
  crumbs = [],
}: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="container">
        <nav className="page-breadcrumbs" aria-label="Breadcrumb">
          <Link href={routes.home}>Home</Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="page-breadcrumbs-item">
              <i className="bi bi-chevron-right" aria-hidden="true" />
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="section-eyebrow page-header-eyebrow">
          <span className="section-eyebrow-line" />
          <span>{eyebrow}</span>
        </div>

        <h1 className="page-header-title">
          {title}
          {titleAccent ? <span> {titleAccent}</span> : null}
        </h1>

        {intro ? <p className="page-header-intro">{intro}</p> : null}
      </div>
    </section>
  );
}
