const google = require("googleapis").google

const googleConfig = {
  clientId: process.env.GOOGLE_OAUTH_ID,
  clientSecret: process.env.GOOGLE_OAUTH_SECRET,
  redirect: process.env.GOOGLE_API_REDIRECT,
};

const createConnection = () => {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  )
}

const getConnectionUrl = (auth) => {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/classroom.courses.readonly",
      "https://www.googleapis.com/auth/classroom.rosters.readonly",
      "https://www.googleapis.com/auth/classroom.push-notifications"
    ],
  })
}

/**
 * Exported functions
 */

module.exports.authUrl = () => {
  const auth = createConnection()
  return getConnectionUrl(auth)
}

module.exports.getToken = async (code) => {
  const auth = createConnection()
  const data = await auth.getToken(code)
  return data.tokens
}

module.exports.getCourses = async (tokens) => {
  const auth = createConnection()
  auth.setCredentials(tokens)

  const res = await google
    .classroom({ version: "v1", auth })
    .courses.list({ teacherId: "me", courseStates: "ACTIVE" })

  return res.data.courses ? [...res.data.courses] : []
}

module.exports.getCourse = async (tokens, courseId) => {
  const auth = createConnection()
  auth.setCredentials(tokens)

  const res = await google
    .classroom({ version: "v1", auth })
    .courses.get({ id: courseId })

  return { ...res.data }
}

module.exports.getCourseRoster = async (tokens, courseId) => {
  const auth = createConnection()
  auth.setCredentials(tokens)

  const res = await google
    .classroom({ version: "v1", auth })
    .courses.students.list({ courseId: courseId })

  return res.data.students ? [...res.data.students] : []
}