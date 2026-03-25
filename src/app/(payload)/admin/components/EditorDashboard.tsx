import { CollectionCards } from "@payloadcms/next/rsc";

const quickActions = [
  {
    description: "Update shared contact details, navigation, and footer content.",
    href: "/admin/globals/SiteSettings",
    title: "Edit Site Settings",
  },
  {
    description: "Refresh the homepage hero, stats, feature cards, and calls to action.",
    href: "/admin/globals/HomeSettings",
    title: "Edit Home Page",
  },
  {
    description: "Manage the core website pages like About, Services, Contact, and Study.",
    href: "/admin/collections/Pages",
    title: "Manage Website Pages",
  },
  {
    description: "Upload new hero images, page images, and media assets.",
    href: "/admin/collections/Media",
    title: "Open Media Library",
  },
];

const editingTips = [
  "Update Site Settings when contact details or navigation links change.",
  "Upload images in Media before assigning them to a page or section.",
  "Use Pages for standard page copy such as About, Services, Contact, and Study.",
  "Use Courses and Programmes for academic content shown on the public site.",
];

export async function EditorDashboard(props: any) {
  return (
    <div className="editor-dashboard">
      <section className="editor-dashboard__hero">
        <div>
          <p className="editor-dashboard__eyebrow">Editor Dashboard</p>
          <h1 className="editor-dashboard__title">Welcome to the EnidPath content hub</h1>
          <p className="editor-dashboard__copy">
            This dashboard is designed for content editors. Use the quick actions
            below to update the homepage, page copy, shared business details, and
            course information without touching code.
          </p>
        </div>
        <div className="editor-dashboard__panel">
          <h2>Recommended editing order</h2>
          <ol>
            <li>Upload images in Media</li>
            <li>Update Site Settings for shared details</li>
            <li>Edit the Home Page</li>
            <li>Update Pages, Courses, and Programmes</li>
          </ol>
        </div>
      </section>

      <section className="editor-dashboard__section">
        <div className="editor-dashboard__section-header">
          <h2>Quick actions</h2>
          <p>Jump straight to the areas editors use most often.</p>
        </div>
        <div className="editor-dashboard__grid">
          {quickActions.map((item) => (
            <a className="editor-dashboard__card" href={item.href} key={item.href}>
              <span className="editor-dashboard__card-title">{item.title}</span>
              <span className="editor-dashboard__card-copy">{item.description}</span>
              <span className="editor-dashboard__card-link">Open</span>
            </a>
          ))}
        </div>
      </section>

      <section className="editor-dashboard__section">
        <div className="editor-dashboard__section-header">
          <h2>Editing tips</h2>
          <p>Keep these points in mind when updating the site.</p>
        </div>
        <div className="editor-dashboard__tips">
          {editingTips.map((tip) => (
            <div className="editor-dashboard__tip" key={tip}>
              <span className="editor-dashboard__tip-dot" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="editor-dashboard__section">
        <div className="editor-dashboard__section-header">
          <h2>All content areas</h2>
          <p>
            Browse every available collection and global below. These are grouped
            to make the admin easier to understand for editors.
          </p>
        </div>
        <CollectionCards {...props} />
      </section>
    </div>
  );
}
