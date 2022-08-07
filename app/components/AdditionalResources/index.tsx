import { Resource } from "~/routes/series/series.types";
import { layout } from "../components";

export function AdditionalResources({ resources }: { resources?: Array<Resource> }) {
  return resources ? (
    <layout.Main hash="additional-resources">
      <div className="prose">
        <h2 className="text-lg">Additional Resources</h2>
        <div className="pt-2">
          <ul>
            {resources?.map((resource) => (
              <li key={resource.title}>
                <a href={resource.url} target="_blank">
                  {resource.title} {resource.description && <span> - {resource.description}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </layout.Main>
  ) : (
    <></>
  );
}
