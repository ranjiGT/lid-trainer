import { topics } from "../../../data/topics";
import TopicSlugClient from "./TopicSlugClient";

export function generateStaticParams() {
  return topics.map((topic) => ({
    slug: topic.id,
  }));
}

export default function TopicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <TopicSlugClient params={params} />;
}
