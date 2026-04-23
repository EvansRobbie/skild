import { getSkills } from "@dataconnect/generated";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Terminal } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import SkillCard from "#/components/skill-card";
import { dataConnect } from "#/lib/firebase";

const getSkillFn = createServerFn().handler(async () => {
  try {
    const { data } = await getSkills(dataConnect, {
      searchTerm: "",
      limit: 10,
    });

    console.log("Fetched skills data:", data);

    return data.skills.map((skill) => ({
      id: skill.id,
      title: skill.title,
      slug: skill.title.toLowerCase().replace(/\s+/g, "-"),
      category: "General",
      description: skill.description,
      tags: skill.tags,
      installCommand: skill.installCommand,
      authorClerkId: skill.author.clerkId,
      authorEmail: skill.author.email,
      createdAt: skill.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return [];
  }
});
export const Route = createFileRoute("/")({
  component: Home,
  loader: () => getSkillFn(),
});

function Home() {
  const posthog = usePostHog();
  const skills = Route.useLoaderData();
  console.log("Loaded skills:", skills);

  return (
    <div id="home" className="p-8">
      <section className="hero">
        <div className="copy">
          <h1>
            The Registry for <br />
            <span className="text-gradient">Agentic Inteligence</span>
          </h1>
          <p>
            A high-performance registry for procedural agent skills. Discover,
            publish, and operate reusable agent capabilities from a route-driven
            workspace.
          </p>
        </div>
        <div className="actions">
          <Link
            to="/skills"
            className="btn-primary"
            onClick={() => posthog.capture("browse_registry_clicked")}
          >
            <Terminal size={18} /> <span>Browse Registry</span>
          </Link>
          <Link
            to="/skills/new"
            className="btn-secondary"
            onClick={() => posthog.capture("publish_skill_clicked")}
          >
            <span>Publish Skill</span>
          </Link>
        </div>
      </section>
      <section className="latest">
        <div className="space-y-2">
          <h2>
            Recently Created <span className="text-gradient">Skills</span>
          </h2>
          <p>
            Latest skills loaded from database in descending creation order.
          </p>
        </div>
        <div>
          {skills.length > 0 ? (
            <div className="skills-grid">
              {skills.map((skill) => (
                <SkillCard key={skill.id} {...skill} />
              ))}
            </div>
          ) : (
            <p>No skills have been created</p>
          )}
        </div>
      </section>
    </div>
  );
}
