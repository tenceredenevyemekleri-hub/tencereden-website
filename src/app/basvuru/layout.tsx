import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Başvuru | Tencereden Ev Yemekleri',
    description: 'Kurumsal yemek hizmeti için başvuru formu. Ofisinize özel teklif alın.',
};

export default function BasvuruLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
