import log from 'loglevel'

export default {
  install (Vue, options) {
    if (process.env.NODE_ENV === 'production') {
      log.disableAll()
    } else {
      log.enableAll()
    }
    Vue.prototype.$log = log
  }
}
