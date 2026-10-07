import { sessions } from "@/content/site";

export function Marquee() {
  const items = sessions.map((session) => session.name);

  return (
    <div
      className="marquee overflow-hidden border-y border-hairline bg-paper py-5"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((name) => (
              <li key={name} className="flex items-center">
                <span className="label whitespace-nowrap px-8 text-stone">{name}</span>
                <span className="h-1 w-1 rounded-full bg-clay" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
