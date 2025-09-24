import ActivationComponent from './ActivationComponent';

export default async function Page({ params }: { params: Promise<{ uid: string, token: string }> }) {
    const resolvedParams = await params;
    return <ActivationComponent code={resolvedParams} />;
}
