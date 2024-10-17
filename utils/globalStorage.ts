import { create } from 'zustand';
export type State = {
};
export type Action = {
};
const useGlobalStore = create <State & Action>((set) => ({
}));

export default useGlobalStore;