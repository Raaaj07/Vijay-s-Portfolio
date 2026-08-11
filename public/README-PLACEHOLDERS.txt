Where to drop your real assets:

/public/profile.jpg              -> your square profile photo (Hero section)
/public/projects/pg-management.jpg
/public/projects/waste-management.jpg
/public/projects/secure-search.jpg
/public/projects/turf-registration.jpg
/public/projects/brew-right.jpg  -> project screenshots (Projects section)

Once added, swap the placeholder <div> blocks in:
  src/components/Hero.tsx     (profile photo)
  src/components/Projects.tsx (project images)
for a <Image src="..." fill /> from next/image.

All text content, links, and the live-demo URLs live in one file:
  src/lib/data.ts
Search it for "EDIT ME" to find every placeholder that needs a real value
(profile photo, project screenshots, live demo links, Behance/Instagram).
