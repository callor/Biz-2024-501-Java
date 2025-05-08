import { atomWithReset } from "jotai/utils";
import { ModalOptions } from ".";

export const modalOptionsAtom = atomWithReset<ModalOptions[]>([]);
