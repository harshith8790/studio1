import { AnalyticsDashboard } from "./analytics-dashboard";

export const metadata = {
    title: "Analytics | Content Spark",
};

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-semibold md:text-3xl">Performance Analytics</h1>
                <p className="text-muted-foreground">Get AI-powered feedback on your post performance.</p>
            </div>
            <AnalyticsDashboard />
        </div>
    );
}
