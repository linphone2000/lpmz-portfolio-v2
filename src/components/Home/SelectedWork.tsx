import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

const projects = [
  {
    slug: 'schoolflow',
    name: 'SchoolFlow',
    category: 'Education · Mobile app',
    description:
      'Attendance, assignments, fee payments, and messaging in one app for students and families.',
    screenshots: [
      '/schoolflow-project/parent home.png',
      '/schoolflow-project/student home.png',
    ],
    dimensions: { width: 1206, height: 2622 },
    presentation: 'mobile',
  },
  {
    slug: 'perfume-tower-web',
    name: 'Perfume Tower',
    category: 'Commerce · Web storefront',
    description:
      'A Next.js storefront and a shared commerce backend for the web and Expo customer app.',
    screenshots: ['/perfume-tower/perfume-web-1.png'],
    dimensions: { width: 2880, height: 1658 },
    presentation: 'web',
  },
  {
    slug: 'yoyic',
    name: 'Yoyic',
    category: 'Commerce · Mobile app',
    description:
      'A multi-vendor marketplace with a shopper app, seller dashboard, and shared API.',
    screenshots: ['/yoyic-mobile/shop details.png', '/yoyic-mobile/home.png'],
    dimensions: { width: 1206, height: 2622 },
    presentation: 'mobile',
  },
  {
    slug: 'technortal',
    name: 'Technortal',
    category: 'Education · Backend',
    description:
      'The services behind enrollment, payments, and community features in a learning platform.',
    screenshots: ['/technortal-project/tec1.png'],
    dimensions: { width: 1910, height: 958 },
    presentation: 'web',
  },
] as const;

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="home-work"
      data-showcase
      aria-labelledby="work-title"
    >
      <div className="home-section-head" data-home-reveal>
        <h2 id="work-title">Selected work</h2>
        <Link className="site-text-link" href="/portfolio">
          All projects <ArrowUpRightIcon aria-hidden="true" />
        </Link>
      </div>
      <div className="home-project-reel" data-project-reel>
        <div className="home-project-window" data-project-window>
          <div className="home-projects" data-project-track>
            {projects.map(
              ({
                slug,
                name,
                category,
                description,
                screenshots,
                dimensions,
                presentation,
              }) => {
                return (
                  <article key={slug} data-project-frame>
                    <Link
                      className="home-project"
                      href={`/portfolio/${slug}`}
                      aria-label={`${name} case study`}
                    >
                      <div
                        className="home-project-cover"
                        data-project-tone={slug}
                        aria-hidden="true"
                      >
                        <div
                          className={`home-project-plane home-project-plane-${presentation}`}
                          data-project-plane
                        >
                          {screenshots.map((src) => (
                            <Image
                              key={src}
                              src={src}
                              alt=""
                              width={dimensions.width}
                              height={dimensions.height}
                              sizes={
                                presentation === 'mobile'
                                  ? '(max-width: 680px) 39vw, 260px'
                                  : '(max-width: 680px) 90vw, 720px'
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <div className="home-project-caption">
                        <div>
                          <p>{category}</p>
                          <h3>{name}</h3>
                        </div>
                        <p className="home-project-description">
                          {description}
                        </p>
                        <ArrowUpRightIcon
                          className="home-project-arrow"
                          aria-hidden="true"
                        />
                      </div>
                    </Link>
                  </article>
                );
              }
            )}
          </div>
        </div>
        <div
          className="home-project-controls"
          role="group"
          aria-label="Jump to a featured project"
        >
          <div className="home-project-progress" aria-hidden="true">
            <span data-project-progress />
          </div>
          <div className="home-project-jumps">
            {projects.map(({ slug, name }, index) => (
              <button key={slug} data-project-jump={index} type="button">
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
