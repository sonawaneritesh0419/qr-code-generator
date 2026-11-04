import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/common/page-header";
import { QrGenerator } from "@/components/qr/qr-generator";
import { QR_TYPES, getQrType } from "@/lib/constants";

type Props = { params: Promise<{ type: string }> };

// Build time la 5 pages pre-generate hotat
export function generateStaticParams() {
  return QR_TYPES.map((t) => ({ type: t.id }));
}

// Tab title dynamic: "WiFi QR Code | QR Studio"
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const config = getQrType(type);
  return { title: config ? `${config.label} QR Code` : "Not found" };
}

export default async function GeneratePage({ params }: Props) {
  const { type } = await params;
  const config = getQrType(type);

  if (!config) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12">
      <PageHeader
        title={`${config.label} QR Code`}
        description={config.description}
      />
      <QrGenerator key={config.id} type={config.id} />
    </div>
  );
}