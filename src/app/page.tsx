import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QR_TYPES } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12">
      <PageHeader
        title="QR Studio"
        description="Choose what you want to turn into a QR code."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QR_TYPES.map(({ id, label, description, icon: Icon }) => (
          <Link key={id} href={`/generate/${id}`} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader>
                <Icon className="mb-2 size-6" />
                <CardTitle>{label}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}