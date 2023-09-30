import {StateCreator} from "zustand";

type CounterState = {
    counter: number;
}

type CounterActions = {
    increaseCounter: () => void;
    decreaseCounter: () => void;
    clearCounter: () => void;
}

export const createCounterSlice: StateCreator<CounterState & CounterActions, [], []> = (set) => ({
    counter: 0,
    increaseCounter: () => set((state) => ({ counter: state.counter + 1 })),
    decreaseCounter: () => set((state) => ({ counter: state.counter - 1 })),
    clearCounter: () => set(() => ({ counter: 0 })),
})