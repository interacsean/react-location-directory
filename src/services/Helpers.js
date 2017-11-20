
class Helpers {

  static fromUrlFriendly(str) {
    return str.replace(/\+/g, ' ').replace(/\\ /g, '+');
  }

  static toUrlFriendly(str) {
    // <Link to=...> already uses encodeURI
    return str.replace(/\+/g, '\\+').replace(/ /g, '+');
  }
}

export default Helpers;
