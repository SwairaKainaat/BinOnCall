import React from "react";

const CARDS = [
  {
    id: "fast",
    color: "#20c736",
    title: "On-Demand Pickups",
    description:
      "Request a pickup exactly when you need it — no subscriptions, no waiting.",
    hint: "Request → Dispatch → Collected",
  },
  {
    id: "price",
    color: "#20c736",
    title: "Transparent Pricing",
    description:
      "Clear per-pickup rates so you pay only for the services you use.",
    hint: "Select size → Confirm price → Pay",
  },
  {
    id: "local",
    color: "#20c736",
    title: "Local Teams",
    description:
      "We dispatch nearby pick-up teams who know your neighborhood.",
    hint: "You request → Local team assigned → Pickup",
  },
  {
    id: "eco",
    color: "#20c736",
    title: "Responsible Disposal",
    description:
      "We sort and route waste responsibly — reducing landfill where possible.",
    hint: "Collected → Sorted → Proper disposal",
  },
];

export default function Part4() {
  return (
    <section className="bg-[#f7fafc] py-12 px-4 font-[Inter,Roboto,system-ui]">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-[28px] font-extrabold text-[#0f172a]">
          Why Choose <span className="text-[#20c736]">BinOnCall</span>
        </h2>

        <p className="text-[#475569] mt-2 mb-7 max-w-[760px] mx-auto text-[15px]">
          Fast, simple rubbish pickups when you need them — we come on your
          request.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 px-2">
          {CARDS.map((c) => (
            <article
              key={c.id}
              className="relative flex flex-col bg-white rounded-[16px] overflow-hidden border-[6px] border-white shadow-[0_12px_40px_rgba(2,6,23,0.06)] min-h-[220px]"
            >
              {/* circular arc label */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[160px] h-[48px] flex items-center justify-center pointer-events-none">
                <svg
                  viewBox="0 0 200 60"
                  className="w-[160px] h-[48px]"
                  aria-hidden="true"
                >
                  <defs>
                    <path id={`arc-${c.id}`} d="M10,50 A90,90 0 0 1 190,50" />
                  </defs>
                  <text fontSize="13" fontWeight="800">
                    <textPath
                      href={`#arc-${c.id}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      <tspan fill="#000">Bin</tspan>
                      <tspan fill="#20c736">OnCall</tspan>
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* top color strip */}
              <div
                className="h-[46px] w-full"
                style={{ background: c.color }}
              />

              {/* main content */}
              <div className="flex flex-col justify-center flex-1 px-5 pt-5 pb-3">
                <h3 className="text-[18px] font-extrabold text-[#0b1220] mb-2 leading-tight">
                  {c.title}
                </h3>
                <p className="text-[#475569] text-[14px] leading-[1.5]">
                  {c.description}
                </p>
              </div>

              {/* footer */}
              <div className="flex items-center justify-center gap-2 border-t border-dashed border-[#0f172a0a] px-3 py-2.5 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.95))]">
                <span className="font-semibold text-[13px] text-[#111] opacity-90">
                  How:
                </span>
                <span className="text-[#475569] text-[13px]">{c.hint}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
