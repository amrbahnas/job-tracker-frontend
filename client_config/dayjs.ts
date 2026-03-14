import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/ar"
import "dayjs/locale/en"

import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"
import customParseFormat from "dayjs/plugin/customParseFormat"
import weekOfYear from "dayjs/plugin/weekOfYear"

// Initialize dayjs plugins
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(customParseFormat)
dayjs.extend(weekOfYear)

// Initialize plugins
dayjs.extend(relativeTime)

// export const configureDayjs = (locale: string) => {
//   dayjs.locale(locale)
// }

export default dayjs
