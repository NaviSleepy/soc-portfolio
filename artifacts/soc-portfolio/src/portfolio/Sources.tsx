import { ChevronRight } from "lucide-react";
import { useGetPortfolioEvidence } from "@workspace/api-client-react";
import { citationHref } from "./Ambassador";

export function Sources() {
  const { data, isLoading, isError, refetch } = useGetPortfolioEvidence();
  return (
    <section className="soc-section" id="sources" aria-labelledby="src-title" style={{ paddingTop: 0 }}>
      <h2 className="sr-only" id="src-title">Verified source library</h2>
      <details className="soc-library" data-testid="details-sources">
        <summary><span className="soc-mono" style={{ color: "var(--pink)" }}>08</span> Verified source library<span style={{ color: "var(--muted)", fontWeight: 400, fontSize: 13 }}>{data ? `${data.length} excerpts` : ""}</span><ChevronRight className="soc-chev" size={18} aria-hidden="true" /></summary>
        <div className="soc-library-body">
          {isLoading && [0, 1, 2].map((i) => <div className="soc-excerpt" key={i}><div className="soc-skel" style={{ width: "40%" }} /><div className="soc-skel" /></div>)}
          {isError && <div className="soc-error" role="alert"><span>The source library could not load.</span><button type="button" className="soc-btn" onClick={() => refetch()} data-testid="button-retry-sources">Retry</button></div>}
          {data?.map((x) => {
            const href = citationHref(x.section);
            return (
              <article className="soc-excerpt" id={`source-${x.id}`} key={x.id} data-testid={`excerpt-${x.id}`}>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
                {href && <a href={href}>Section {href}</a>}
              </article>
            );
          })}
        </div>
      </details>
    </section>
  );
}
