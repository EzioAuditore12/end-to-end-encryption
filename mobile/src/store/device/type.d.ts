export type DeviceStore = {
  lastSyncedAt: number;
  getLastSyncedAt: () => number;
  updateLastSynedAt: (data: number) => void;
  resetTimeStamp: () => void;
};
