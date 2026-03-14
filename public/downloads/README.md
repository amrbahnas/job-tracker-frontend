# Desktop app download

Place the built Dorly Scraper Windows installer here and name it:

**dorly-scraper-setup.exe**

So users can download it from the "Scrape locally" page.

To build the installer, in `windows-scraping-server` run:

```bash
pnpm run dist
```

Then copy the `.exe` from `windows-scraping-server/dist/` into this folder and rename it to `dorly-scraper-setup.exe`.
