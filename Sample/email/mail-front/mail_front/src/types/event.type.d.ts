/**
 * @apiNote : 이벤트 유틸 interface
 */

/**
 * 콜백타입 오버라이딩
 */
type Callback = (args?: unknown) => void;

/**
 * 이벤트 interface
 */
interface IEventUtil {
  readonly list: Map<EVENT, Callback[]>;
  readonly emitQueue: Map<EVENT, Callback[]>;
  on: (type: EVENT, cb: Callback) => EventUtil;
  off: (type: EVENT, cb?: Callback) => EventUtil;
  emit: (type: EVENT, args?: unknown) => unknown;
}
