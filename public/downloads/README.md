# Desktop app download

The "Scrape locally" page downloads the installer from GitHub Releases (see `NEXT_PUBLIC_SCRAPER_DOWNLOAD_URL` in `.env`).

**Current URL:**  
https://github.com/amrbahnas/windows-scraper-server/releases/download/windows/Dawarly.Setup.1.0.0.exe

When you publish a new version, bump the URL in `.env` / `.env.local.example` (e.g. `Dawarly.Setup.1.0.1.exe`).

Build & publish from `windows-scraping-server`:

```bash
pnpm run dist:publish
```
