import { GeneratorView } from "./generator-view";

export const metadata = {
    title: "AI Generator | Content Spark",
};

export default function GeneratorPage() {
    return (
        <div className="flex flex-col gap-6">
             <div>
                <h1 className="text-2xl font-semibold md:text-3xl">AI Content Generator</h1>
                <p className="text-muted-foreground">Transform your raw ideas into polished social media posts.</p>
            </div>
            <GeneratorView />
        </div>
    );
}
