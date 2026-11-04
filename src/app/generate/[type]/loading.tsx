export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-12">
      <div className="h-9 w-64 animate-pulse rounded-md bg-muted" />
      <div className="h-5 w-96 max-w-full animate-pulse rounded-md bg-muted" />
      <div className="h-80 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}