import common from "./ar/common.json"
import auth from "./ar/auth.json"
import jobs from "./ar/jobs.json"
import landing from "./ar/landing.json"
import websites from "./ar/websites.json"
import scrapeLocally from "./ar/scrape-locally.json"
import profile from "./ar/profile.json"
const messages = {
  common,
  auth,
  jobs,
  landing,
  websites,
  scrapeLocally,
  profile,
} as const

export default messages
