import { Q, type Database, type Model } from "@nozbe/watermelondb";
import { useState, useEffect, useCallback } from "react";

interface UseWatermelonModelsPageOptions<T extends Model> {
  collection: string;
  database: Database;
  query: Q.Clause[];
  onChange: (data: T[]) => void;
  limit?: number;
}

export function useWatermelonModelsPage<T extends Model>({
  collection,
  database,
  onChange,
  query,
  limit = 20,
}: UseWatermelonModelsPageOptions<T>) {
  const [cPage, setCPage] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  const next = useCallback(() => {
    // If the current data length is at least what we requested, there might be more data
    if (dataLength >= limit * (cPage + 1)) {
      setCPage((prev) => prev + 1);
    }
  }, [dataLength, limit, cPage]);

  const computeItems = useCallback(() => {
    const observable = database.collections
      .get<T>(collection)
      .query(...query, Q.take(limit * (cPage + 1)))
      .observe();

    const subscription = observable.subscribe({
      next: (data) => {
        setDataLength(data.length); // Track how many items we actually got
        onChange(data);
      },
      error(err) {
        console.error(err);
      },
    });

    return () => subscription.unsubscribe();
  }, [collection, database.collections, onChange, query, cPage, limit]);

  useEffect(() => {
    return computeItems();
  }, [computeItems]);

  return { next, cPage };
}
