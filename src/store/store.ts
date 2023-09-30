import {create, StoreApi, UseBoundStore} from 'zustand'

import {createCounterSlice} from "./slices/counter.ts";
import {createTodosSlice} from "./slices/todos.ts";

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S
) => {
    const store = _store as WithSelectors<typeof _store>
    store.use = {}
    for (const k of Object.keys(store.getState())) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (store.use as never)[k] = () => store((s) => s[k as keyof typeof s])
    }

    return store
}

const useStoreBase = create<
    ReturnType<typeof createCounterSlice> & ReturnType<typeof createTodosSlice
>>((...a) => ({
    ...createCounterSlice(...a),
    ...createTodosSlice(...a),
}))

export const useStore = createSelectors(useStoreBase);