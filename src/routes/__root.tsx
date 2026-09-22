import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { LangProvider } from "@/i18n/LangContext";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Madrasa E Gulaaman E Mustafa ﷺ" },
      {
        name: "description",
        content:
          "Madrasa E Gulaaman E Mustafa ﷺ offers authentic online Islamic education, Dars-e-Nizami, Tajweed, Muballiga, and Kids courses.",
      },
      { name: "author", content: "Madrasa E Gulaaman E Mustafa ﷺ" },
      { property: "og:title", content: "Madrasa E Gulaaman E Mustafa ﷺ" },
      {
        property: "og:description",
        content:
          "Authentic online Islamic education, Dars-e-Nizami, Tajweed, Muballiga, and Kids courses worldwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Madrasa E Gulaaman E Mustafa ﷺ" },
      {
        name: "twitter:description",
        content:
          "Authentic online Islamic education, Dars-e-Nizami, Tajweed, Muballiga, and Kids courses worldwide.",
      },
      {
        property: "og:image",
        content: "/logo.png",
      },
      {
        name: "twitter:image",
        content: "/logo.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <LangProvider>
      <Outlet />
    </LangProvider>
  );
}
