
class MobileService {
  constructor () {
    this.receiveCallBacks = []
  }

  set setReceive (receiveCallBack) {
    this.receiveCallBacks.push(receiveCallBack)
  }

  publish (data) {
    for (const receivesCallBack of this.receiveCallBacks) {
      receivesCallBack(data)
    }
  }
}

const mobileService = new MobileService()

export default mobileService
