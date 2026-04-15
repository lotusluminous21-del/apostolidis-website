"use client";

import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h2 className="text-xl font-semibold text-foreground">
        Something went wrong
      </h2>
      <p className="max-w-md text-muted-foreground text-sm">
        Please try again. If the problem persists, refresh the page.
      </p>
      {error.digest ? (
        <p className="font-mono text-[10px] text-muted-foreground">
          {error.digest}
        </p>
      ) : null}
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-none border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
      >
        Try again
      </button>
    </div>
  );
}
