import { Parse } from 'parse';
const _internalFields = Object.freeze([
  'objectId',
  'id',
  'className',
  'attributes',
  'createdAt',
  'updatedAt',
  'then',
]);
const proxyHandler = {
  get(target, key, receiver) {
    const value = target[key];
    if (
      typeof value === 'function' ||
      key.toString().charAt(0) === '_' ||
      _internalFields.includes(key.toString())
    ) {
      return Reflect.get(target, key, receiver);
    }
    return receiver.get(key) || Reflect.get(target, key, receiver);
  },

  set(target, key, value, receiver) {
    const current = target[key];
    if (
      typeof current !== 'function' &&
      !_internalFields.includes(key.toString()) &&
      key.toString().charAt(0) !== '_'
    ) {
      receiver.set(key, value);
    }
    return Reflect.set(target, key, value, receiver);
  },
};
class ParseVueObject extends Parse.Object {
  constructor(className, json) {
    super(className, json);
    return new Proxy(this, proxyHandler);
  }
}
export { ParseVueObject }
