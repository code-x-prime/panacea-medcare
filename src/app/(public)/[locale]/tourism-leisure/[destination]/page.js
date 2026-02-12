
import DestinationContent from "./DestinationContent";
import { getDestinationData } from "@/data/destinationsData";

export async function generateMetadata({ params: { locale, destination } }) {
    const dest = getDestinationData(destination, locale);

    return {
        title: dest.title,
        description: dest.description,
        openGraph: {
            title: dest.title,
            description: dest.description,
            url: `https://panaceamedcare.com/${locale}/tourism-leisure/${destination}`,
            type: "website",
            images: [
                {
                    url: dest.image,
                    width: 1200,
                    height: 630,
                    alt: dest.title,
                },
            ],
        },
    };
}

export default function DestinationPage({ params }) {
    return <DestinationContent locale={params.locale} destination={params.destination} />;
}
